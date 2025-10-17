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

// PATCH - Update order status
export async function PATCH(request, { params }) {
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

    const { orderId } = params;
    const { status } = await request.json();

    // Validate status - Updated to match simplified workflow
    const validStatuses = ["PENDING", "IN_PROCESS", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Valid options: PENDING, IN_PROCESS, DELIVERED, CANCELLED" },
        { status: 400 }
      );
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
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
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: `Order status updated to ${status}`,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Get single order details
export async function GET(request, { params }) {
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

    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}