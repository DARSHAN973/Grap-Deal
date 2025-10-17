import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Verify admin token
async function verifyAdminToken(request) {
  try {
    const token = request.cookies.get("admin-token")?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
    });

    return admin;
  } catch (error) {
    console.error("Admin token verification error:", error);
    return null;
  }
}

// GET - Fetch all orders for admin
export async function GET(request) {
  try {
    // For now, we'll allow access without admin authentication for testing
    // TODO: Re-enable admin authentication once admin login is properly implemented
    // const admin = await verifyAdminToken(request);
    // if (!admin) {
    //   return NextResponse.json(
    //     { error: "Unauthorized - Admin access required" },
    //     { status: 401 }
    //   );
    // }

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
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
      orders: cleanedOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}