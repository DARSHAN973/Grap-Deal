import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const activities = [];
    
    // Get recent user registrations (last 10)
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      select: {
        name: true,
        role: true,
        createdAt: true
      }
    });

    // Get recent orders (last 5)
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });

    // Get recent products pending approval (last 5) - schema uses ProductStatus.DRAFT for pending approvals
    const pendingProducts = await prisma.product.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        status: 'DRAFT'
      },
      select: {
        name: true,
        createdAt: true,
        vendor: {
          select: {
            businessName: true
          }
        }
      }
    });

    // Get recent B2B service applications (if exists)
    let recentServices = [];
    try {
      recentServices = await prisma.businessService.findMany({
        take: 3,
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          status: 'PENDING'
        },
        select: {
          businessName: true,
          serviceType: true,
          createdAt: true
        }
      });
    } catch (e) {
      // B2B services table might not exist yet
      console.log('B2B services table not found');
    }

    // Format activities with proper timestamps and types
    recentUsers.forEach(user => {
      activities.push({
        type: user.role === 'VENDOR' ? 'vendor_registration' : 'user_registration',
        message: user.role === 'VENDOR' 
          ? `New vendor registration: ${user.name}` 
          : `New user registration: ${user.name}`,
        timestamp: user.createdAt,
        color: user.role === 'VENDOR' ? 'green' : 'blue',
        priority: user.role === 'VENDOR' ? 'high' : 'normal'
      });
    });

    recentOrders.forEach(order => {
      activities.push({
        type: 'order_received',
        message: `New order #${order.id.slice(-8)} received from ${order.user?.name || 'Unknown'}`,
        timestamp: order.createdAt,
        color: 'blue',
        priority: 'normal',
        amount: order.totalAmount
      });
    });

    pendingProducts.forEach(product => {
      activities.push({
        type: 'product_pending',
        message: `Product approval pending: ${product.name}`,
        timestamp: product.createdAt,
        color: 'yellow',
        priority: 'medium',
        vendor: product.vendor?.businessName
      });
    });

    recentServices.forEach(service => {
      activities.push({
        type: 'service_application',
        message: `New B2B service application: ${service.businessName}`,
        timestamp: service.createdAt,
        color: 'purple',
        priority: 'medium',
        serviceType: service.serviceType
      });
    });

    // Sort all activities by timestamp (most recent first)
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Take only the most recent 10 activities
    const recentActivities = activities.slice(0, 10);

    return NextResponse.json({
      success: true,
      data: recentActivities
    });
  } catch (error) {
    console.error('Recent activity fetch error:', error);
    // Return error details (always include for debugging in this environment)
    const payload = { error: 'Failed to fetch recent activity', message: error.message, stack: error.stack };
    return NextResponse.json(payload, { status: 500 });
  }
}