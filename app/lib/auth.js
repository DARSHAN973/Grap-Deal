import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function verifyAuth() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return { user: null, error: "No token found" };
    }

    const decoded = jwt.verify(token.value, JWT_SECRET);

    // Normalize userId to string to match Prisma schema (User.id is String)
    if (decoded && typeof decoded.userId !== 'undefined') {
      try {
        decoded.userId = String(decoded.userId);
      } catch (e) {
        // ignore coercion errors, keep original
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