import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Get user ID from token
    const userId = tokenUser.id;

    // Initialize default stats
    let cartItems = 0;
    let totalOrders = 0;
    let wishlistItems = 0;
    let orderStatusCounts = {
      PENDING: 0,
      IN_PROCESS: 0,
      DELIVERED: 0,
      CANCELLED: 0
    };
    let totalSpent = 0;

    try {
      // Get real-time stats from database with fallbacks
      const results = await Promise.allSettled([
        prisma.cartItem.count({ 
          where: { 
            cart: { 
              userId: userId 
            } 
          } 
        }),
        prisma.order.count({ where: { userId } }),
        prisma.wishlistItem.count({ where: { userId } }),
      ]);

      // Process results with fallbacks
      if (results[0].status === 'fulfilled') cartItems = results[0].value;
      if (results[1].status === 'fulfilled') totalOrders = results[1].value;
      if (results[2].status === 'fulfilled') wishlistItems = results[2].value;

      // Get order statistics with fallback
      try {
        const orderStats = await prisma.order.groupBy({
          by: ['status'],
          where: { userId },
          _count: { status: true }
        });

        orderStats.forEach(stat => {
          if (orderStatusCounts.hasOwnProperty(stat.status)) {
            orderStatusCounts[stat.status] = stat._count.status;
          }
        });
      } catch (orderStatsError) {
        console.log('Order stats query failed, using defaults:', orderStatsError.message);
      }

      // Calculate total amount spent with fallback
      try {
        const totalSpentResult = await prisma.order.aggregate({
          where: { 
            userId,
            status: { in: ['DELIVERED', 'IN_PROCESS'] }
          },
          _sum: { totalAmount: true }
        });
        totalSpent = totalSpentResult._sum.totalAmount || 0;
      } catch (totalSpentError) {
        console.log('Total spent query failed, using default:', totalSpentError.message);
      }

    } catch (dbError) {
      console.log('Database queries failed, using default values:', dbError.message);
    }    const stats = {
      cartItems,
      totalOrders,
      wishlistItems,
      c2cListings: 0, // TODO: Implement when C2C feature is added
      orderStatusCounts,
      totalSpent: Number(totalSpent) || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("User stats error:", error);
    // Return fallback data if everything fails
    return NextResponse.json({
      cartItems: 0,
      totalOrders: 0,
      wishlistItems: 0,
      c2cListings: 0,
      orderStatusCounts: {
        PENDING: 0,
        IN_PROCESS: 0,
        DELIVERED: 0,
        CANCELLED: 0
      },
      totalSpent: 0,
    });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.log('Prisma disconnect error:', disconnectError.message);
    }
  }
}

// TODO: Implement actual database queries when tables are created
// Example queries for when tables exist:
/*
const [cartItems, totalOrders, wishlistItems, c2cListings] = await Promise.all([
  prisma.cartItem.count({ where: { userId } }),
  prisma.order.count({ where: { userId } }),
  prisma.wishlistItem.count({ where: { userId } }),
  prisma.c2cListing.count({ where: { userId, status: 'ACTIVE' } }),
]);

return NextResponse.json({
  cartItems,
  totalOrders,
  wishlistItems,
  c2cListings,
});
*/