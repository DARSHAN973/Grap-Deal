import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type'); // 'products', 'categories', 'services', or 'all'
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 });
    }

    const searchTerm = query.trim();
    const results = {
      products: [],
      categories: [],
      services: [],
      totalCount: 0
    };

    // Search Products
    if (!type || type === 'products' || type === 'all') {
      try {
        const products = await prisma.product.findMany({
          where: {
            AND: [
              { status: 'ACTIVE' },
              { isActive: true },
              {
                OR: [
                  { name: { contains: searchTerm, mode: 'insensitive' } },
                  { description: { contains: searchTerm, mode: 'insensitive' } },
                  { brand: { contains: searchTerm, mode: 'insensitive' } },
                  { sku: { contains: searchTerm, mode: 'insensitive' } }
                ]
              }
            ]
          },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            price: true,
            originalPrice: true,
            discount: true,
            brand: true,
            rating: true,
            images: {
              take: 1,
              select: {
                url: true,
                altText: true
              }
            },
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          },
          take: type === 'products' ? limit : 5,
          orderBy: [
            { rating: 'desc' },
            { orderCount: 'desc' },
            { createdAt: 'desc' }
          ]
        });
        
        results.products = products.map(product => ({
          ...product,
          type: 'product',
          url: `/products/${product.id}`,
          image: product.images[0]?.url || null,
          price: parseFloat(product.price)
        }));
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }

    // Search Categories
    if (!type || type === 'categories' || type === 'all') {
      try {
        const categories = await prisma.category.findMany({
          where: {
            AND: [
              { isActive: true },
              {
                OR: [
                  { name: { contains: searchTerm, mode: 'insensitive' } },
                  { slug: { contains: searchTerm, mode: 'insensitive' } }
                ]
              }
            ]
          },
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
            _count: {
              select: {
                products: {
                  where: {
                    status: 'ACTIVE',
                    isActive: true
                  }
                }
              }
            }
          },
          take: type === 'categories' ? limit : 3,
          orderBy: {
            name: 'asc'
          }
        });

        results.categories = categories.map(category => ({
          ...category,
          type: 'category',
          url: `/products?category=${category.slug}`,
          productCount: category._count.products
        }));
      } catch (error) {
        console.error('Error searching categories:', error);
      }
    }

    // Search B2B Services
    if (!type || type === 'services' || type === 'all') {
      try {
        const services = await prisma.b2BService.findMany({
          where: {
            AND: [
              { isActive: true },
              { adminApprovalStatus: 'APPROVED' },
              {
                OR: [
                  { name: { contains: searchTerm, mode: 'insensitive' } },
                  { description: { contains: searchTerm, mode: 'insensitive' } },
                  { serviceType: { contains: searchTerm, mode: 'insensitive' } },
                  { city: { contains: searchTerm, mode: 'insensitive' } },
                  { state: { contains: searchTerm, mode: 'insensitive' } }
                ]
              }
            ]
          },
          select: {
            id: true,
            name: true,
            description: true,
            serviceType: true,
            city: true,
            state: true,
            contactNumber: true,
            images: true,
            basePrice: true,
            priceType: true
          },
          take: type === 'services' ? limit : 3,
          orderBy: [
            { leadCount: 'desc' },
            { createdAt: 'desc' }
          ]
        });

        results.services = services.map(service => ({
          ...service,
          type: 'service',
          url: `/services/${service.id}`,
          image: service.images ? (typeof service.images === 'string' ? JSON.parse(service.images)[0] : service.images[0]) : null,
          location: `${service.city}, ${service.state}`,
          price: service.basePrice ? parseFloat(service.basePrice) : null
        }));
      } catch (error) {
        console.error('Error searching services:', error);
        // B2B services might not exist in all databases
        results.services = [];
      }
    }

    // Calculate total count
    results.totalCount = results.products.length + results.categories.length + results.services.length;

    // If type is 'all', combine and sort all results by relevance
    if (!type || type === 'all') {
      const allResults = [
        ...results.products,
        ...results.categories,
        ...results.services
      ];

      // Sort by relevance (exact matches first, then partial matches)
      allResults.sort((a, b) => {
        const aExactMatch = a.name?.toLowerCase() === searchTerm.toLowerCase();
        const bExactMatch = b.name?.toLowerCase() === searchTerm.toLowerCase();
        
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        // Then by type priority (products > categories > services)
        const typePriority = { product: 3, category: 2, service: 1 };
        return typePriority[b.type] - typePriority[a.type];
      });

      results.all = allResults.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      data: results,
      query: searchTerm,
      searchType: type || 'all'
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Search failed',
      message: process.env.NODE_ENV !== 'production' ? error.message : undefined
    }, { status: 500 });
  }
}