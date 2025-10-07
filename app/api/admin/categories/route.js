import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET - Fetch all categories
export async function GET(request) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      categories: categories.map(category => ({
        ...category,
        productCount: category._count.products
      }))
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category (Admin only)
export async function POST(request) {
  try {
    const { userId, role } = await verifyAuth(request);
    
    if (role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { name, slug, description, image, icon, badge, badgeColor } = await request.json();

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if category with same name or slug exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: name },
          { slug: slug }
        ]
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || '',
        image: image || '',
        icon: icon || 'Package',
        badge: badge || null,
        badgeColor: badgeColor || null,
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Category creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PUT - Update category (Admin only)
export async function PUT(request) {
  try {
    const { userId, role } = await verifyAuth(request);
    
    if (role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { id, name, slug, description, image, icon, badge, badgeColor, isActive } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check for duplicate name/slug (excluding current category)
    if (name || slug) {
      const duplicateCategory = await prisma.category.findFirst({
        where: {
          AND: [
            { id: { not: parseInt(id) } },
            {
              OR: [
                { name: name || existingCategory.name },
                { slug: slug || existingCategory.slug }
              ]
            }
          ]
        }
      });

      if (duplicateCategory) {
        return NextResponse.json(
          { success: false, error: 'Category with this name or slug already exists' },
          { status: 400 }
        );
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(icon && { icon }),
        ...(badge !== undefined && { badge }),
        ...(badgeColor !== undefined && { badgeColor }),
        ...(isActive !== undefined && { isActive })
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    console.error('Category update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category (Admin only)
export async function DELETE(request) {
  try {
    const { userId, role } = await verifyAuth(request);
    
    if (role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete category with existing products' },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Category deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}