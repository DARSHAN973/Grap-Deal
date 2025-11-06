import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

// Timeout wrapper for database operations - increased timeout for slow connections
async function withTimeout(promise, timeoutMs = 60000) { // 60 seconds instead of 15
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Database operation timed out')), timeoutMs)
  );
  
  return Promise.race([promise, timeout]);
}

// PATCH - Update cart item quantity
export async function PATCH(request, { params }) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: 'Please login to update cart items' 
      }, { status: 401 });
    }

    const resolvedParams = await params;
    const { itemId } = resolvedParams;
    const body = await request.json();
    const { quantity } = body;

    if (!itemId) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid quantity is required' },
        { status: 400 }
      );
    }

    try {
      // Test database connection first
      await withTimeout(prisma.$queryRaw`SELECT 1`, 10000);

      // Find the cart item and verify ownership
      const cartItem = await withTimeout(prisma.cartItem.findFirst({
        where: {
          id: itemId,
          cart: {
            userId: user.id,
        },
      },
      include: {
        product: {
          select: { stock: true }
        }
      }
    }), 30000);

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Check stock
    if (cartItem.product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Update quantity
    const updatedItem = await withTimeout(prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
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
    }), 30000);

      return NextResponse.json({
        success: true,
        message: 'Cart item updated successfully',
        item: updatedItem,
      });

    } catch (dbError) {
      console.error('Cart database operation failed:', dbError);
      
      // Provide more specific error messages
      if (dbError.message.includes('timeout')) {
        return NextResponse.json({
          success: false,
          error: 'Database connection timed out. Please try again.'
        }, { status: 504 });
      } else if (dbError.code === 'P2025') {
        return NextResponse.json({
          success: false,
          error: 'Cart item not found.'
        }, { status: 404 });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Unable to update cart item. Please try again.'
        }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('Error updating cart item:', error);
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

// DELETE - Remove item from cart
export async function DELETE(request, { params }) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: 'Please login to remove cart items' 
      }, { status: 401 });
    }

    const resolvedParams = await params;
    const { itemId } = resolvedParams;

    try {
      // Test database connection first
      await withTimeout(prisma.$queryRaw`SELECT 1`, 10000);

      // Find the cart item and verify ownership
      const cartItem = await withTimeout(prisma.cartItem.findFirst({
        where: {
          id: itemId,
          cart: {
            userId: user.id,
          },
        },
      }), 30000);

      if (!cartItem) {
        return NextResponse.json(
          { success: false, error: 'Cart item not found' },
          { status: 404 }
        );
      }

      // Delete the item
      await withTimeout(prisma.cartItem.delete({
        where: { id: itemId },
      }), 30000);

      return NextResponse.json({
        success: true,
        message: 'Item removed from cart successfully',
      });

    } catch (dbError) {
      console.log('Cart database operation failed:', dbError.message);
      return NextResponse.json({
        success: false,
        error: 'Unable to remove cart item. Please try again.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error removing cart item:', error);
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