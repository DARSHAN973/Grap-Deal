import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body.email?.toString().trim();
    const phone = body.phone?.toString().trim();
    const password = body.password?.toString();

    const errors = {};
    if (!password) errors.password = "Password is required";
    if (!email && !phone) errors.identifier = "Email or phone is required";

    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 });
    }

    // Find user by email or phone
    let user = null;
    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    }
    if (!user && phone) {
      user = await prisma.user.findUnique({ where: { phone: phone } });
    }

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

  // Return a safe user object (omit password)
  const { id, name, role, phone: userPhone } = user;
  const safeUser = { id, name, email: user.email, phone: userPhone, role };

    // Create JWT token
    // Ensure userId is stored as a string in the token (Prisma expects string ids)
    const token = jwt.sign(
      { userId: String(id), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Create response with user data
    const response = NextResponse.json({ user: safeUser });

    // Set httpOnly cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/"
    });

    return response;
  } catch (err) {
    console.error("Auth login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
