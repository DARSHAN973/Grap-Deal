import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

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

    // Verify the order belongs to the user
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

    // Only allow cancellation if order is pending
    if (existingOrder.status !== 'PENDING') {
      return NextResponse.json(
        { success: false, error: 'Order cannot be cancelled at this stage' },
        { status: 400 }
      );
    }

    // Update order status
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
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}