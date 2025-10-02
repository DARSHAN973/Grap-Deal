import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

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
      user = await prisma.user.findUnique({ where: { phoneNo: phone } });
    }

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Return a safe user object (omit password)
    const { id, name, role, phoneNo } = user;
    return NextResponse.json({ user: { id, name, email: user.email, phoneNo, role } });
  } catch (err) {
    console.error("Auth login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
