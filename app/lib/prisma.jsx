import { PrismaClient } from "@prisma/client";

let prisma;
let connectionFailureCount = 0;
let lastConnectionAttempt = 0;
const MAX_FAILURE_COUNT = 3;
const RETRY_COOLDOWN = 30000; // 30 seconds between retries

// Create a proxy that handles connection failures gracefully with smart retry logic
const createPrismaProxy = (client) => {
  return new Proxy(client, {
    get(target, prop) {
      // Prevent accidental disconnects from tearing down a shared client in the app
      if (prop === '$disconnect') {
        return async () => {
          // no-op in the app/runtime; scripts should use their own PrismaClient instance
          if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
            console.log('Skipped prisma.$disconnect() on shared client');
          }
        };
      }

      const value = target[prop];
      
      // If it's a function, wrap it with error handling
      if (typeof value === 'function') {
        return async (...args) => {
          const now = Date.now();
          
          // If we've had recent failures, check if cooldown period has passed
          if (connectionFailureCount >= MAX_FAILURE_COUNT) {
            if (now - lastConnectionAttempt < RETRY_COOLDOWN) {
              throw new Error("Database connection temporarily unavailable - in cooldown period");
            } else {
              // Reset failure count after cooldown
              console.log('Cooldown period passed, resetting connection failure count');
              connectionFailureCount = 0;
            }
          }

          try {
            lastConnectionAttempt = now;
            const result = await value.apply(target, args);
            
            // Reset failure count on successful operation
            if (connectionFailureCount > 0) {
              console.log('Database connection restored successfully');
              connectionFailureCount = 0;
            }
            
            return result;
          } catch (error) {
            // Only count specific connection errors as failures
            if (error.message.includes('Engine is not yet connected') || 
                error.message.includes('Response from the Engine was empty') ||
                error.message.includes('Connection failed') ||
                error.message.includes('connect ETIMEDOUT')) {
              connectionFailureCount++;
              console.log(`Database connection failure #${connectionFailureCount}: ${error.message}`);
              
              if (connectionFailureCount >= MAX_FAILURE_COUNT) {
                console.log(`Database marked as temporarily unavailable after ${MAX_FAILURE_COUNT} failures`);
              }
            }
            throw error;
          }
        };
      }
      
      return value;
    }
  });
};

const createPrismaClient = () => {
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    return createPrismaProxy(client);
  } catch (error) {
    console.error('Failed to create Prisma client:', error);
    connectionFailureCount = MAX_FAILURE_COUNT;
    
    // Return a mock client that throws errors
    return new Proxy({}, {
      get() {
        return async () => {
          throw new Error("Database connection unavailable - failed to create client");
        };
      }
    });
  }
};

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = createPrismaClient();
  }
  prisma = global.prisma;
}

// Reset connection status periodically (every 2 minutes) and provide status logging
setInterval(() => {
  if (connectionFailureCount > 0) {
    console.log(`Database connection status: ${connectionFailureCount}/${MAX_FAILURE_COUNT} failures. ${
      connectionFailureCount >= MAX_FAILURE_COUNT ? 'In cooldown mode.' : 'Still attempting connections.'
    }`);
  }
}, 2 * 60 * 1000);

export default prisma;