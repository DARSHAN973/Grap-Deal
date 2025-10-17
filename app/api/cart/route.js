import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

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

    try {
      // Test database connection first
      await prisma.$queryRaw`SELECT 1`;
      
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
      });

      if (!cart) {
        return NextResponse.json({ 
          success: true,
          items: [], 
          totalItems: 0, 
          totalPrice: 0 
        });
      }

      const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

      return NextResponse.json({
        success: true,
        items: cart.items,
        totalItems,
        totalPrice: totalPrice.toFixed(2),
      });
    } catch (dbError) {
      console.log('Cart database query failed:', dbError.message);
      return NextResponse.json({ 
        success: true,
        items: [], 
        totalItems: 0, 
        totalPrice: 0 
      });
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

    try {
      // Test database connection first
      await prisma.$queryRaw`SELECT 1`;
      
      // Find or create cart
      let cart = await prisma.cart.findUnique({
        where: { userId: user.id }
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId: user.id }
        });
      }

      // Check if item already exists in cart
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: productId,
          variantId: variantId || null
        }
      });

      if (existingCartItem) {
        // Update quantity if item exists
        await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { 
            quantity: existingCartItem.quantity + quantity,
            price: parseFloat(price)
          }
        });
      } else {
        // Create new cart item
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            variantId: variantId || null,
            quantity,
            price: parseFloat(price)
          }
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Item added to cart successfully'
      });

    } catch (dbError) {
      console.log('Cart database operation failed:', dbError.message);
      return NextResponse.json({
        success: false,
        error: 'Failed to add item to cart. Please try again.'
      }, { status: 500 });
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
