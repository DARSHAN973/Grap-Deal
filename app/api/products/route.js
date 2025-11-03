import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// GET - Fetch products with filtering, search, and pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : undefined;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const featured = searchParams.get('featured') === 'true';
    const status = searchParams.get('status') || 'ACTIVE';
    
    // Calculate offset for pagination
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where = {
      status: status,
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(category && { categoryId: category }),
      ...(minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice })
        }
      },
      ...(featured && { productType: { in: ['FEATURED', 'TRENDING', 'BESTSELLER'] } })
    };
    
    // Build orderBy clause
    const orderBy = {};
    switch (sortBy) {
      case 'price-low':
        orderBy.price = 'asc';
        break;
      case 'price-high':
        orderBy.price = 'desc';
        break;
      case 'popularity':
        orderBy.orderCount = 'desc';
        break;
      case 'rating':
        orderBy.rating = 'desc';
        break;
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      default:
        orderBy[sortBy] = sortOrder;
    }
    
    // Fetch products with relations
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: {
            select: { id: true, name: true, slug: true }
          },
          vendor: {
            select: { id: true, businessName: true, rating: true }
          },
          images: {
            take: 2, // Get primary and hover image
            orderBy: { id: 'asc' }
          },
          variants: {
            take: 1, // Get first variant for pricing
            orderBy: { id: 'asc' }
          },
          reviews: {
            select: { rating: true }
          },
          _count: {
            select: { 
              reviews: true,
              orderItems: true,
              wishlistItems: true
            }
          }
        }
      }),
      prisma.product.count({ where })
    ]);
    
    // Transform products data for frontend
    const transformedProducts = products.map(product => {
      // Calculate average rating
      const avgRating = product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;
      
      // Get pricing (use variant price if available, otherwise base price)
      const price = product.variants.length > 0 && product.variants[0].price 
        ? parseFloat(product.variants[0].price)
        : parseFloat(product.price);
      
      const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;
      
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: price,
        originalPrice: originalPrice,
        discount: product.discount || null,
        image: product.images[0]?.url || '/api/placeholder/300/300',
        hoverImage: product.images[1]?.url || product.images[0]?.url || '/api/placeholder/300/300',
        rating: product.rating || Number(avgRating.toFixed(1)),
        reviews: product._count.reviews,
        category: product.category.name,
        categoryId: product.category.id,
        brand: product.brand,
        vendor: product.vendor?.businessName || 'GrapDeals',
        vendorRating: product.vendor?.rating || 0,
        isNew: new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if created in last 7 days
        isFeatured: product.productType === 'FEATURED',
        isTrending: product.productType === 'TRENDING' || product._count.orderItems > 10,
        isHot: product.productType === 'HOTDROP' || product._count.wishlistItems > 5,
        viewCount: product.viewCount,
        orderCount: product._count.orderItems,
        tags: [product.category.name, product.brand].filter(Boolean)
      };
    });
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    return NextResponse.json({
      success: true,
      products: transformedProducts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      filters: {
        search,
        category,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
        featured
      }
    });
    
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}