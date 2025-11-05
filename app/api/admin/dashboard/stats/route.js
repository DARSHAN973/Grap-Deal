import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    // Get total users count
    const totalUsers = await prisma.user.count();

    // Get active vendors count (users with vendor role)
    const activeVendors = await prisma.user.count({
      where: {
        role: 'VENDOR'
      }
    });

    // Get total orders count
    const totalOrders = await prisma.order.count();

    // Calculate total revenue from completed orders
    const revenueResult = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        status: 'DELIVERED'
      }
    });
    
    const totalRevenue = revenueResult._sum.totalAmount || 0;

    // Get additional stats
    const pendingOrders = await prisma.order.count({
      where: {
        status: 'PENDING'
      }
    });

    const totalProducts = await prisma.product.count({
      where: {
        status: 'ACTIVE'
      }
    });

    const totalCategories = await prisma.category.count({
      where: {
        isActive: true
      }
    });

    // Get recent orders for trend calculation
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const recentOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: last30Days
        }
      }
    });

    const recentRevenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: {
          gte: last30Days
        },
        status: 'DELIVERED'
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        activeVendors,
        totalOrders,
        totalRevenue: parseFloat(totalRevenue) || 0,
        pendingOrders,
        totalProducts,
        totalCategories,
        recentStats: {
          ordersLast30Days: recentOrders,
          revenueLast30Days: parseFloat(recentRevenue._sum.totalAmount) || 0
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}