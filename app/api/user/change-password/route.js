import { NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function PUT(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const { currentPassword, newPassword, confirmPassword } = await request.json();

    // Validate required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required" },
        { status: 400 }
      );
    }

    // Validate new password confirmation
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match" },
        { status: 400 }
      );
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Get user with current password
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        password: true
      }
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isCurrentPasswordValid = await compare(currentPassword, userData.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await hash(newPassword, 12);

    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword
      }
    });

    return NextResponse.json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}