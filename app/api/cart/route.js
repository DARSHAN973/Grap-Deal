import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';
import { tempCartOperations } from '@/app/lib/temp-storage';

// Timeout wrapper for database operations - increased timeout for slow connections
async function withTimeout(promise, timeoutMs = 60000) { // 60 seconds instead of 15
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Database operation timed out')), timeoutMs)
  );
  
  return Promise.race([promise, timeout]);
}

// GET - Get user's cart
export async function GET(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json({ 
        success: true,
        items: [], 
        totalItems: 0, 
        totalPrice: 0 
      });
    }

    // Try temp storage first for faster response
    let tempCartItems = [];
    try {
      tempCartItems = tempCartOperations.getCart(user.id);
    } catch (tempError) {
      console.log('Temp cart access failed:', tempError);
    }

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                  price: true,
                  originalPrice: true,
                  discount: true,
                  brand: true,
                  stock: true,
                }
              },
              variant: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  sku: true,
                  attributes: true,
                  inventory: {
                    select: {
                      quantity: true,
                      reservedQty: true,
                    }
                  }
                }
              }
            }
          }
        }
        }); // 30 seconds for complex query with joins

      if (!cart) {
        return NextResponse.json({ 
          success: true,
          items: [], 
          totalItems: 0, 
          totalPrice: 0 
        });
      }

      // Validate and clean cart items before sending to frontend
      const validItems = cart.items.filter(item => {
        return item && 
               item.productId && 
               typeof item.quantity === 'number' && 
               item.quantity > 0 &&
               item.price !== null && 
               item.price !== undefined;
      });

      const totalItems = validItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = validItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

      return NextResponse.json({
        success: true,
        items: validItems,
        totalItems,
        totalPrice: totalPrice.toFixed(2),
      });
    } catch (dbError) {
      console.log('Cart database query failed, checking temp storage:', dbError.message);
      
      // Try to get data from temp storage
      try {
        const tempCartItems = tempCartOperations.getCart(user.id);
        
        // Validate temp storage items too
        const validTempItems = tempCartItems.filter(item => {
          return item && 
                 item.productId && 
                 typeof item.quantity === 'number' && 
                 item.quantity > 0 &&
                 item.price !== null && 
                 item.price !== undefined;
        });
        
        const totalItems = validTempItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = validTempItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
        
        return NextResponse.json({ 
          success: true,
          items: validTempItems,
          totalItems,
          totalPrice: totalPrice.toFixed(2),
          tempMode: true
        });
      } catch (tempError) {
        console.log('Temp storage also failed:', tempError);
        return NextResponse.json({ 
          success: true,
          items: [], 
          totalItems: 0, 
          totalPrice: 0 
        });
      }
    }

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.log('Prisma disconnect error:', disconnectError.message);
    }
  }
}

// POST - Add item to cart
export async function POST(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: 'Please login to add items to cart' 
      }, { status: 401 });
    }

    const body = await request.json();
    const { productId, variantId, quantity = 1, price } = body;

    if (!productId || !price || quantity <= 0) {
      return NextResponse.json(
        { success: false, error: 'Product ID, price, and positive quantity are required' },
        { status: 400 }
      );
    }

    // Check product stock availability
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { stock: true, name: true }
      });

      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }

      if (product.stock === 0) {
        return NextResponse.json(
          { success: false, error: `${product.name} is currently out of stock` },
          { status: 400 }
        );
      }

      if (quantity > product.stock) {
        return NextResponse.json(
          { success: false, error: `Only ${product.stock} items available for ${product.name}` },
          { status: 400 }
        );
      }
    } catch (stockCheckError) {
      console.error('Error checking product stock:', stockCheckError);
      // Continue with the add to cart process if stock check fails
    }

    try {
      // Use transaction for better performance - no artificial timeout
      await prisma.$transaction(async (tx) => {
          // Find or create cart
          let cart = await tx.cart.findUnique({
            where: { userId: user.id }
          });

          if (!cart) {
            cart = await tx.cart.create({
              data: { userId: user.id }
            });
          }

          // Handle cart item creation/update with proper null variant handling
          // Use findFirst instead of findUnique for null variant handling
          const existingItem = await tx.cartItem.findFirst({
            where: {
              cartId: cart.id,
              productId: productId,
              variantId: variantId || null
            }
          });

          if (existingItem) {
            // Update existing item
            await tx.cartItem.update({
              where: { id: existingItem.id },
              data: {
                quantity: existingItem.quantity + quantity,
                price: parseFloat(price)
              }
            });
          } else {
            // Create new item
            await tx.cartItem.create({
              data: {
                cartId: cart.id,
                productId,
                variantId: variantId || null,
                quantity,
                price: parseFloat(price)
              }
            });
          }
        });

      return NextResponse.json({
        success: true,
        message: 'Item added to cart successfully'
      });

    } catch (dbError) {
      console.log('Cart database operation failed, using temp storage:', dbError.message);
      
      // Log specific Prisma errors for debugging
      if (dbError.code) {
        console.log('Prisma error code:', dbError.code);
      }
      if (dbError.meta) {
        console.log('Prisma error meta:', dbError.meta);
      }
      
      // Use temporary storage as fallback for instant response
      try {
        const cartItems = tempCartOperations.addItem(user.id, {
          productId,
          variantId,
          quantity,
          price: parseFloat(price)
        });
        
        return NextResponse.json({
          success: true,
          message: 'Item added to cart successfully (offline mode)',
          tempMode: true
        });
      } catch (tempError) {
        console.error('Temp storage also failed:', tempError);
        return NextResponse.json({
          success: false,
          error: 'Failed to add item to cart. Please try again.'
        }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.log('Prisma disconnect error:', disconnectError.message);
    }
  }
}

// DELETE - Clear entire cart
export async function DELETE(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: 'Please login to clear cart' 
      }, { status: 401 });
    }

    try {
      // Find user's cart
      const cart = await prisma.cart.findUnique({
        where: { userId: user.id }
      });

      if (cart) {
        // Delete all cart items
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id }
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Cart cleared successfully'
      });

    } catch (dbError) {
      console.log('Cart database operation failed:', dbError.message);
      return NextResponse.json({
        success: false,
        error: 'Unable to clear cart. Please try again.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.log('Prisma disconnect error:', disconnectError.message);
    }
  }
}
