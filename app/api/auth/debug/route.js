import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ 
        authenticated: false, 
        error: error || "No auth token found",
        user: null 
      });
    }

    // Get fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: tokenUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNo: true,
        role: true
      }
    });

    if (!user) {
      return NextResponse.json({ 
        authenticated: false, 
        error: "User not found in database",
        tokenUser: tokenUser,
        user: null 
      });
    }

    return NextResponse.json({ 
      authenticated: true,
      user: user,
      tokenUser: tokenUser,
      isAdmin: user.role === "ADMIN",
      roleCheck: {
        actualRole: user.role,
        expectedRole: "ADMIN",
        typeOfRole: typeof user.role
      }
    });
  } catch (error) {
    console.error("Debug auth error:", error);
    return NextResponse.json({ 
      authenticated: false, 
      error: error.message,
      user: null 
    });
  }
}