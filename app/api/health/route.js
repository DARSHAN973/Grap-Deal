import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// Timeout wrapper for database operations
async function withTimeout(promise, timeoutMs = 10000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Database health check timed out')), timeoutMs)
  );
  
  return Promise.race([promise, timeout]);
}

export async function GET() {
  const healthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'E-commerce API is running',
    features: {
      offlineCart: true,
      offlineWishlist: true,
      databaseFallback: true
    },
    database: {
      status: 'unknown',
      responseTime: null,
      error: null
    }
  };

  // Test database connectivity
  try {
    const startTime = Date.now();
    await withTimeout(prisma.$queryRaw`SELECT 1 as test`, 10000);
    const endTime = Date.now();
    
    healthStatus.database = {
      status: 'connected',
      responseTime: `${endTime - startTime}ms`,
      error: null
    };
  } catch (dbError) {
    console.log('Database health check failed:', dbError.message);
    healthStatus.database = {
      status: 'disconnected',
      responseTime: null,
      error: dbError.message
    };
    
    // Don't fail the health check entirely, just report database status
    healthStatus.status = 'degraded';
    healthStatus.message = 'API running but database unavailable - using offline mode';
  }

  return NextResponse.json(healthStatus);
}