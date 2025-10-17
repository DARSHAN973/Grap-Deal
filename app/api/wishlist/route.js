import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

export async function GET(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const wishlistItems = await prisma.wishlistItem.findMany({
        where: { userId: user.id },
        include: {
          product: {
            include: {
              images: {
                take: 1,
                orderBy: { sortOrder: 'asc' }
              }
            }
          }
        },
        orderBy: { addedAt: 'desc' }
      });

      return NextResponse.json({
        success: true,
        wishlist: wishlistItems
      });
    } catch (dbError) {
      console.log('Wishlist database query failed:', dbError.message);
      // Return empty wishlist as fallback
      return NextResponse.json({
        success: true,
        wishlist: []
      });
    }

  } catch (error) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.log('Prisma disconnect error:', disconnectError.message);
    }
  }
}

export async function POST(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if already in wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId
        }
      }
    });

    if (existingItem) {
      return NextResponse.json(
        { success: false, error: 'Product already in wishlist' },
        { status: 409 }
      );
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: user.id,
        productId: productId
      },
      include: {
        product: {
          include: {
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      item: wishlistItem
    });

  } catch (error) {
    console.error('Wishlist add error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.log('Prisma disconnect error:', disconnectError.message);
    }
  }
}

export async function DELETE(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Remove from wishlist
    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Item removed from wishlist'
    });

  } catch (error) {
    console.error('Wishlist remove error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.log('Prisma disconnect error:', disconnectError.message);
    }
  }
}