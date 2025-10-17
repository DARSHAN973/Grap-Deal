const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateOrderStatuses() {
  try {
    console.log('🔄 Starting order status migration...');
    
    // Check current status distribution
    const currentStatuses = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count FROM orders GROUP BY status;
    `;
    
    console.log('📊 Current status distribution:', currentStatuses);
    
    // Map old statuses to new ones
    const statusMappings = {
      'CONFIRMED': 'IN_PROCESS',
      'PROCESSING': 'IN_PROCESS', 
      'SHIPPED': 'IN_PROCESS',
      'PENDING': 'PENDING',
      'DELIVERED': 'DELIVERED',
      'CANCELLED': 'CANCELLED',
      '': 'PENDING',
      null: 'PENDING'
    };
    
    let totalUpdated = 0;
    
    for (const [oldStatus, newStatus] of Object.entries(statusMappings)) {
      if (oldStatus === 'PENDING' || oldStatus === 'DELIVERED' || oldStatus === 'CANCELLED') {
        continue; // Skip already correct statuses
      }
      
      let updateResult;
      
      if (oldStatus === '' || oldStatus === null) {
        updateResult = await prisma.$executeRaw`
          UPDATE orders 
          SET status = ${newStatus}
          WHERE status IS NULL OR status = '';
        `;
      } else {
        updateResult = await prisma.$executeRaw`
          UPDATE orders 
          SET status = ${newStatus}
          WHERE status = ${oldStatus};
        `;
      }
      
      if (updateResult > 0) {
        console.log(`✅ Updated ${updateResult} orders from '${oldStatus}' to '${newStatus}'`);
        totalUpdated += updateResult;
      }
    }
    
    // Verify the migration
    const newStatuses = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count FROM orders GROUP BY status;
    `;
    
    console.log('📊 New status distribution:', newStatuses);
    console.log(`🎉 Migration completed! Total orders updated: ${totalUpdated}`);
    
    // Check for any remaining invalid statuses
    const invalidStatuses = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count 
      FROM orders 
      WHERE status NOT IN ('PENDING', 'IN_PROCESS', 'DELIVERED', 'CANCELLED')
      GROUP BY status;
    `;
    
    if (invalidStatuses.length > 0) {
      console.log('⚠️  Warning: Found orders with invalid statuses:', invalidStatuses);
    } else {
      console.log('✅ All orders now have valid status values!');
    }
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateOrderStatuses();