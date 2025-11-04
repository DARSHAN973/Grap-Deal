const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Check if admin user exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists:', {
        email: existingAdmin.email,
        name: existingAdmin.name,
        role: existingAdmin.role
      });
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@Grapdeals.com',
        password: hashedPassword,
        name: 'Admin User',
        phone: '+1234567890',
        role: 'ADMIN',
        isActive: true
      }
    });

    console.log('Admin user created successfully:', {
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role
    });

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();