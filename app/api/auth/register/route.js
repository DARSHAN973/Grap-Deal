import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export async function POST(request) {
  try {
    const { name, email, phone, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }
    // Schema expects `name` and `phone` as required fields — ensure we have them (or set defaults)
    if (!name || !phone) {
      return NextResponse.json({ message: "Name and phone number are required" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase();

    // Check if user already exists (by email)
    const existingByEmail = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingByEmail) {
      return NextResponse.json({ message: 'Email already registered', field: 'email' }, { status: 409 });
    }

    // Check by phone number (phone in schema)
    const existingByPhone = await prisma.user.findUnique({ where: { phone: phone } });
    if (existingByPhone) {
      return NextResponse.json({ message: 'Phone number already registered', field: 'phone' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user - map `phone` from client to `phone` in the schema
    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        phone,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    // Prisma unique constraint error (duplicate email/phone)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      // error.meta?.target is usually the column(s) that caused the conflict
      const target = error.meta?.target || [];
      const field = Array.isArray(target) ? target[0] : target;
      let message = 'A user with that value already exists';
      if (field === 'email') message = 'Email already registered';
      if (field === 'phone') message = 'Phone number already registered';
      return NextResponse.json({ message, field }, { status: 409 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}