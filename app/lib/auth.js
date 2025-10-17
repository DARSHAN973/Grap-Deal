import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function verifyAuth() {
  try {
    // cookies() is async in Next 13+; await it before using
    const cookieStore = await cookies();
    const token = cookieStore?.get?.("auth-token");

    if (!token) {
      return { user: null, error: "No token found" };
    }

    const decoded = jwt.verify(token.value, JWT_SECRET);

    // Normalize userId to string to match Prisma schema (User.id is String)
    // Ensure both id and userId fields exist for compatibility
    if (decoded && typeof decoded.userId !== 'undefined') {
      decoded.userId = String(decoded.userId);
      decoded.id = decoded.userId; // Set id field for compatibility
    } else if (decoded && typeof decoded.id !== 'undefined') {
      decoded.id = String(decoded.id);
      decoded.userId = decoded.id; // Set userId field for consistency
    }

    // If role is missing from token (old token), fetch from database
    if (!decoded.role && (decoded.userId || decoded.id)) {
      try {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId || decoded.id },
          select: { role: true }
        });
        
        if (user) {
          decoded.role = user.role;
        }
        
        await prisma.$disconnect();
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }

    return { user: decoded, error: null };
  } catch (error) {
    return { user: null, error: "Invalid token" };
  }
}

export async function requireAuth() {
  const { user, error } = await verifyAuth();
  if (!user) {
    throw new Error(error || "Authentication required");
  }
  return user;
}