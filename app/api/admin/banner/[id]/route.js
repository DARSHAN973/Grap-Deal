import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// PUT (update) banner
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const banner = await prisma.banner.update({
      where: { id: parseInt(id) },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.imageUrl && { imageUrl: data.imageUrl }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      }
    });

    return NextResponse.json({ banner });
  } catch (error) {
    console.error('Update banner error:', error);
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

// DELETE banner
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.banner.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Delete banner error:', error);
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}