import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

export async function POST(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const {
      productId,
      quantity,
      addressId,
      paymentMethod,
      totalAmount
    } = await request.json();

    // Validate required fields
    if (!productId || !quantity || !addressId || !paymentMethod || !totalAmount) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Verify address belongs to user
    const address = await prisma.userAddress.findFirst({
      where: { 
        id: addressId,
        userId: user.id 
      }
    });

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Invalid address' },
        { status: 400 }
      );
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        totalAmount: parseFloat(totalAmount),
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: 'PENDING',
        shippingAddress: {
          fullName: address.fullName,
          phone: address.phone,
          email: address.email,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          landmark: address.landmark
        },
        orderItems: {
          create: [{
            productId: product.id,
            quantity: parseInt(quantity),
            price: parseFloat(product.price),
            total: parseFloat(product.price) * parseInt(quantity)
          }]
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
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
      },
      orderBy: { createdAt: 'desc' }
    });

    // Clean up any orders with invalid status values
    const cleanedOrders = orders.map(order => ({
      ...order,
      status: order.status && ['PENDING', 'IN_PROCESS', 'DELIVERED', 'CANCELLED'].includes(order.status) 
        ? order.status 
        : 'PENDING' // Default to PENDING for invalid statuses
    }));

    return NextResponse.json({
      success: true,
      orders: cleanedOrders
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}