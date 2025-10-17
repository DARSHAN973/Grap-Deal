const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixOrderStatuses() {
  try {
    console.log('🔍 Checking for orders with invalid status values...');
    
    // First, let's see what status values exist in the database
    const orders = await prisma.$queryRaw`
      SELECT DISTINCT status FROM orders WHERE status NOT IN ('PENDING', 'IN_PROCESS', 'DELIVERED', 'CANCELLED') OR status IS NULL OR status = '';
    `;
    
    console.log('📋 Found invalid statuses:', orders);
    
    // Update all orders with invalid or empty status to PENDING
    const updateResult = await prisma.$executeRaw`
      UPDATE orders 
      SET status = 'PENDING' 
      WHERE status NOT IN ('PENDING', 'IN_PROCESS', 'DELIVERED', 'CANCELLED') 
         OR status IS NULL 
         OR status = '';
    `;
    
    console.log(`✅ Updated ${updateResult} orders with invalid status to PENDING`);
    
    // Verify the fix
    const verifyResult = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count FROM orders GROUP BY status;
    `;
    
    console.log('📊 Current status distribution:', verifyResult);
    
  } catch (error) {
    console.error('❌ Error fixing order statuses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
fixOrderStatuses();