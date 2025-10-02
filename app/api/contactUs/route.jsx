import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, subject, category, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ message: "Name, email, and message are required" }, { status: 400 });
    }

    if (!subject || !category) {
      return NextResponse.json({ message: "Subject and category are required" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase();

    // Create new contact message
    const newMessage = await prisma.contactMessage.create({
      data: {
        fullName: name,
        email: normalizedEmail,
        subject,
        category,
        message,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        subject: true,
        category: true,
        message: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ ok: true, message: 'Message saved', data: newMessage }, { status: 200 });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json({ ok: false, message: "failed to save message" }, { status: 500 });
  }
}