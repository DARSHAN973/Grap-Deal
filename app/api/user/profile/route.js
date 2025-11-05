import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const { name, email, phone } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: user.id }
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already taken by another user" },
        { status: 400 }
      );
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Profile update error:", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Email is already taken" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}