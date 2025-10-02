// scripts/seed-banners.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const banners = [
    { title: 'image 1', imageUrl: 'https://res.cloudinary.com/dhzk2xuvt/image/upload/v1758177810/banners/banner-1758177810396.png', sortOrder: 0 },
    { title: 'image 2', imageUrl: 'https://res.cloudinary.com/dhzk2xuvt/image/upload/v1758177585/banners/banner-1758177584675.png', sortOrder: 1 },
  ];

  for (const b of banners) {
    const existing = await prisma.banner.findFirst({ where: { title: b.title } });
    if (existing) {
      await prisma.banner.update({ where: { id: existing.id }, data: b });
    } else {
      await prisma.banner.create({ data: b });
    }
  }
  console.log('Seeded banners');
}

main().catch(console.error).finally(() => prisma.$disconnect());