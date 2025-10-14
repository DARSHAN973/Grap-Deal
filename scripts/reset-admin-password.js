const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    // Find admin user
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      console.log('No admin user found');
      return;
    }

    // Reset password to 'admin123'
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await prisma.user.update({
      where: { id: adminUser.id },
      data: { password: hashedPassword }
    });

    console.log('Admin password reset successfully!');
    console.log('Login credentials:');
    console.log('Email:', adminUser.email);
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();