import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';

// Helper function to get user from token
async function getUserFromToken(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true }
    });

    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// GET - Get user's cart
export async function GET(request) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      // Return empty cart for non-authenticated users
      return NextResponse.json({ items: [], totalItems: 0, totalPrice: 0 });
    }

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
                category: true,
                stock: true,
                status: true,
              }
            },
            variant: {
              select: {
                id: true,
                name: true,
                price: true,
                stock: true,
              }
            }
          }
        }
      }
    });

    if (!cart) {
      return NextResponse.json({ items: [], totalItems: 0, totalPrice: 0 });
    }

    // Calculate totals
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    return NextResponse.json({
      items: cart.items,
      totalItems,
      totalPrice: totalPrice.toFixed(2),
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
export async function POST(request) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Please login to add items to cart' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, variantId, quantity = 1, price } = body;

    if (!productId || !price || quantity <= 0) {
      return NextResponse.json(
        { error: 'Product ID, price, and positive quantity are required' },
        { status: 400 }
      );
    }

    // Verify product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, status: true, stock: true, name: true }
    });

    if (!product || product.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Product not found or not available' },
        { status: 404 }
      );
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_variantId: {
          cartId: cart.id,
          productId,
          variantId: variantId || null,
        }
      }
    });

    let cartItem;
    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      
      // Check stock again for total quantity
      if (product.stock < newQuantity) {
        return NextResponse.json(
          { error: 'Insufficient stock for requested quantity' },
          { status: 400 }
        );
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
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
              category: true,
            }
          },
          variant: {
            select: {
              id: true,
              name: true,
              price: true,
            }
          }
        }
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId: variantId || null,
          quantity,
          price: parseFloat(price),
        },
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
              category: true,
            }
          },
          variant: {
            select: {
              id: true,
              name: true,
              price: true,
            }
          }
        }
      });
    }

    return NextResponse.json({
      message: 'Item added to cart successfully',
      item: cartItem,
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Clear entire cart
export async function DELETE(request) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return NextResponse.json({
      message: 'Cart cleared successfully',
    });

  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}