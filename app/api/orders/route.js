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
      cartItems, // For cart-based orders
      addressId,
      paymentMethod,
      totalAmount
    } = await request.json();

    // Validate required fields - either single product or cart items
    if ((!productId && !cartItems) || !addressId || !paymentMethod || !totalAmount) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    let orderItems = [];
    
    if (productId && quantity) {
      // Single product order
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

      orderItems = [{
        productId: product.id,
        quantity: parseInt(quantity),
        price: parseFloat(product.price),
        total: parseFloat(product.price) * parseInt(quantity)
      }];
    } else if (cartItems && cartItems.length > 0) {
      // Cart-based order - validate all items and check stock
      for (const item of cartItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          return NextResponse.json(
            { success: false, error: `Product ${item.productId} not found` },
            { status: 404 }
          );
        }

        if (product.stock < item.quantity) {
          return NextResponse.json(
            { success: false, error: `Insufficient stock for ${product.name}` },
            { status: 400 }
          );
        }

        orderItems.push({
          productId: product.id,
          quantity: parseInt(item.quantity),
          price: parseFloat(product.price),
          total: parseFloat(product.price) * parseInt(item.quantity)
        });
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'No products specified for order' },
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

    // Use transaction to ensure inventory is properly managed
    console.log('Starting order transaction...');
    const order = await prisma.$transaction(async (tx) => {
      // Double-check stock availability for all items within transaction
      console.log('Checking stock for', orderItems.length, 'items');
      for (const item of orderItems) {
        const currentProduct = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!currentProduct || currentProduct.stock < item.quantity) {
          throw new Error(`Insufficient stock available for product ${currentProduct?.name || item.productId}`);
        }
      }

      // Create order
      console.log('Creating order...');
      const newOrder = await tx.order.create({
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
            create: orderItems
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

      // Reserve inventory immediately for all payment methods
      // For online payments: reserved until payment completion
      // For COD: reduced immediately as order is confirmed
      console.log('Updating inventory for', orderItems.length, 'products...');
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            },
            // Track total orders for analytics
            orderCount: {
              increment: 1
            }
          }
        });
      }

      // If this was a cart order, clear the user's cart
      if (cartItems && cartItems.length > 0) {
        console.log('Clearing cart...');
        await tx.cartItem.deleteMany({
          where: {
            cart: {
              userId: user.id
            }
          }
        });
      }

      return newOrder;
    }, {
      timeout: 15000, // 15 seconds timeout
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