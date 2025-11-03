import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';
import { tempWishlistOperations } from '@/app/lib/temp-storage';

export async function GET(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      // Return empty wishlist for non-authenticated users
      return NextResponse.json({
        success: true,
        wishlist: [],
        message: 'Please login to view your wishlist'
      });
    }

    // Always try temp storage first for faster response
    let tempWishlist = [];
    try {
      tempWishlist = tempWishlistOperations.getWishlist(user.id);
    } catch (tempError) {
      console.log('Temp storage error:', tempError);
    }

    // Try database as secondary source
    try {
      const wishlistItems = await prisma.wishlistItem.findMany({
        where: { userId: user.id },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: {
                take: 1,
                orderBy: { sortOrder: 'asc' },
                select: {
                  url: true,
                  altText: true
                }
              }
            }
          }
        },
        orderBy: { addedAt: 'desc' }
      });

      // Merge temp and database results (prefer database)
      const mergedWishlist = wishlistItems.length > 0 ? wishlistItems : tempWishlist;

      return NextResponse.json({
        success: true,
        wishlist: mergedWishlist,
        source: wishlistItems.length > 0 ? 'database' : 'offline'
      });
    } catch (dbError) {
      console.log('Database unavailable, using offline wishlist:', dbError.message);
      
      return NextResponse.json({
        success: true,
        wishlist: tempWishlist,
        source: 'offline',
        message: 'Showing offline wishlist. Changes will sync when connection is restored.'
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

    // Add to temp storage first (instant response)
    try {
      const tempWishlist = tempWishlistOperations.addItem(user.id, productId);
      
      // Try database in background (don't await for faster response)
      prisma.wishlistItem.create({
        data: {
          userId: user.id,
          productId: productId
        }
      }).catch(dbError => {
        console.log('Background database save failed:', dbError.message);
      });

      return NextResponse.json({
        success: true,
        message: 'Added to wishlist',
        source: 'offline',
        item: {
          id: `temp_${productId}`,
          userId: user.id,
          productId: productId,
          addedAt: new Date().toISOString()
        }
      });

    } catch (tempError) {
      console.log('Temp storage failed, trying database only:', tempError);
      
      // Fallback to database only
      try {
        const wishlistItem = await prisma.wishlistItem.create({
          data: {
            userId: user.id,
            productId: productId
          },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
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
          item: wishlistItem,
          source: 'database'
        });

      } catch (dbError) {
        return NextResponse.json({
          success: false,
          error: 'Unable to add to wishlist. Please check your connection and try again.'
        }, { status: 500 });
      }
    }  } catch (error) {
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

    // Remove from temp storage first (instant response)
    try {
      tempWishlistOperations.removeItem(user.id, productId);
      
      // Try database in background
      prisma.wishlistItem.delete({
        where: {
          userId_productId: {
            userId: user.id,
            productId: productId
          }
        }
      }).catch(dbError => {
        console.log('Background database delete failed:', dbError.message);
      });

      return NextResponse.json({
        success: true,
        message: 'Removed from wishlist',
        source: 'offline'
      });

    } catch (error) {
      // Fallback to database only
      try {
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
          message: 'Removed from wishlist',
          source: 'database'
        });

      } catch (dbError) {
        return NextResponse.json({
          success: false,
          error: 'Unable to remove from wishlist. Please try again.'
        }, { status: 500 });
      }
    }  } catch (error) {
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