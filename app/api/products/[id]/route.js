import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { 
        id: id,
        status: 'ACTIVE'
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
          select: {
            id: true,
            url: true,
            altText: true,
            isPrimary: true
          }
        },
        variants: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            price: true,
            attributes: true,
            inventory: {
              select: {
                quantity: true
              }
            }
          }
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Calculate average rating
    const ratings = await prisma.review.findMany({
      where: { productId: id },
      select: { rating: true }
    });

    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length
      : 4.5; // Default rating if no reviews

    // Format variants with stock info
    const formattedVariants = product.variants?.map(variant => ({
      ...variant,
      stock: variant.inventory?.[0]?.quantity || 0
    })) || [];

    // Format the response
    const formattedProduct = {
      ...product,
      rating: parseFloat(averageRating.toFixed(1)),
      reviewCount: product._count?.reviews || 0,
      images: product.images || [],
      variants: formattedVariants
    };

    return NextResponse.json({
      success: true,
      product: formattedProduct
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}