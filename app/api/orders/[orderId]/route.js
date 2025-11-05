import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

export async function PUT(request, { params }) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { orderId } = params;
    const { status, paymentStatus } = await request.json();

    // Verify order belongs to user
    const existingOrder = await prisma.order.findFirst({
      where: { 
        id: orderId,
        userId: user.id 
      }
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder
    });

  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request, { params }) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { orderId } = params;
    const { status } = await request.json();

    // Handle order cancellation with inventory restoration
    if (status === 'CANCELLED') {
      const result = await prisma.$transaction(async (tx) => {
        // Get order with items
        const order = await tx.order.findFirst({
          where: { 
            id: orderId,
            userId: user.id 
          },
          include: {
            orderItems: true
          }
        });

        if (!order) {
          throw new Error('Order not found');
        }

        // Only allow cancellation of pending/in-process orders
        if (!['PENDING', 'IN_PROCESS'].includes(order.status)) {
          throw new Error('Order cannot be cancelled at this stage');
        }

        // Restore inventory for all order items
        for (const item of order.orderItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              },
              orderCount: {
                decrement: 1
              }
            }
          });
        }

        // Update order status to cancelled
        const cancelledOrder = await tx.order.update({
          where: { id: orderId },
          data: {
            status: 'CANCELLED',
            updatedAt: new Date()
          }
        });

        return cancelledOrder;
      });

      return NextResponse.json({
        success: true,
        message: 'Order cancelled and inventory restored',
        order: result
      });
    }

    // Regular status update without inventory changes
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      select: { userId: true, status: true }
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    if (existingOrder.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder
    });

  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request, { params }) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { orderId } = params;

    const order = await prisma.order.findFirst({
      where: { 
        id: orderId,
        userId: user.id 
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                  orderBy: { sortOrder: 'asc' }
                }
              }
            }
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}