import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET - Fetch products for admin (with detailed info)
export async function GET(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const vendor = searchParams.get('vendor');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(status && { status: status }),
      ...(category && { categoryId: category }),
      ...(vendor && { vendorId: vendor })
    };
    
    // Fetch products with detailed information
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            select: { id: true, name: true, slug: true }
          },
          vendor: {
            select: { 
              id: true, 
              businessName: true, 
              user: { select: { name: true, email: true } }
            }
          },
          images: {
            orderBy: { id: 'asc' }
          },
          variants: {
            include: {
              inventory: true
            }
          },
          reviews: {
            select: { rating: true }
          },
          _count: {
            select: { 
              reviews: true,
              orderItems: true,
              wishlistItems: true,
              variants: true
            }
          }
        }
      }),
      prisma.product.count({ where })
    ]);
    
    // Transform products for admin view
    const transformedProducts = products.map(product => {
      const avgRating = product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;
      
      const totalInventory = product.variants.reduce((sum, variant) => {
        return sum + (variant.inventory?.quantity || 0);
      }, 0);
      
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        sku: product.sku,
        brand: product.brand,
        // Support both old and new field names
        basePrice: product.price || product.basePrice,
        price: product.price || product.basePrice,
        comparePrice: product.originalPrice || product.comparePrice,
        originalPrice: product.originalPrice || product.comparePrice,
        discount: product.discount,
        productType: product.productType,
        rating: product.rating || Number(avgRating.toFixed(1)),
        ratingCount: product.ratingCount,
        status: product.status,
        isActive: product.isActive,
        weight: product.weight,
        dimensions: product.dimensions,
        stock: product.stock || totalInventory,
        viewCount: product.viewCount,
        orderCount: product.orderCount,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        category: product.category,
        vendor: product.vendor, // Can be null for admin products
        images: product.images,
        variants: product.variants,
        reviewCount: product._count.reviews,
        orderItemCount: product._count.orderItems,
        wishlistCount: product._count.wishlistItems,
        variantCount: product._count.variants,
        totalInventory: totalInventory
      };
    });
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      success: true,
      products: transformedProducts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
    
  } catch (error) {
    console.error('Admin products fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Create new product (Admin only)
export async function POST(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const {
      name,
      slug,
      description,
      categoryId,
      sku,
      brand,
      price,
      originalPrice,
      rating,
      discount,
      productType = 'REGULAR',
      weight,
      dimensions,
      stock = 0,
      businessModel = 'E_COMMERCE',
      status = 'ACTIVE',
      isActive = true,
      images = []
    } = await request.json();

    // Validate required fields
    if (!name || !categoryId || !price) {
      return NextResponse.json(
        { success: false, error: 'Name, category, and price are required' },
        { status: 400 }
      );
    }

    // Check if SKU already exists (if provided)
    if (sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku }
      });
      
      if (existingSku) {
        return NextResponse.json(
          { success: false, error: 'SKU already exists' },
          { status: 400 }
        );
      }
    }

    // Check if slug already exists (if provided)
    if (slug) {
      const existingSlug = await prisma.product.findUnique({
        where: { slug }
      });
      
      if (existingSlug) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // For admin E-Commerce products, no vendor needed
    // Filter out any null/empty image URLs
    const validImages = Array.isArray(images) ? images.filter(url => typeof url === 'string' && url) : [];

    // Create product with relations
    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        // vendorId: null, // No vendor for direct admin products
        categoryId,
        sku: sku || `EC-${Date.now()}`,
        brand: brand || 'Generic',
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        rating: rating ? parseFloat(rating) : 0,
        discount: discount ? parseFloat(discount) : null,
        productType,
        weight: weight ? parseFloat(weight) : 1.0,
        dimensions: dimensions || { length: 10, width: 10, height: 5, unit: 'cm' },
        stock: parseInt(stock),
        businessModel,
        status,
        isActive,
        images: {
          create: validImages.map((url, index) => ({
            url,
            altText: name,
            sortOrder: index,
            isPrimary: index === 0
          }))
        }
      },
      include: {
        category: true,
        images: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update product (Admin only)
export async function PUT(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const {
      id,
      name,
      slug,
      description,
      categoryId,
      sku,
      brand,
      price,
      originalPrice,
      rating,
      discount,
      productType,
      weight,
      dimensions,
      stock,
      businessModel,
      status,
      isActive,
      images
    } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check for duplicate SKU (excluding current product)
    if (sku && sku !== existingProduct.sku) {
      const existingSku = await prisma.product.findFirst({
        where: { 
          sku,
          NOT: { id }
        }
      });
      
      if (existingSku) {
        return NextResponse.json(
          { success: false, error: 'SKU already exists' },
          { status: 400 }
        );
      }
    }

    // Check for duplicate slug (excluding current product)
    if (slug && slug !== existingProduct.slug) {
      const existingSlug = await prisma.product.findFirst({
        where: { 
          slug,
          NOT: { id }
        }
      });
      
      if (existingSlug) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update product
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (sku !== undefined) updateData.sku = sku;
    if (brand !== undefined) updateData.brand = brand;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (originalPrice !== undefined) updateData.originalPrice = originalPrice ? parseFloat(originalPrice) : null;
    if (rating !== undefined) updateData.rating = rating ? parseFloat(rating) : 0;
    if (discount !== undefined) updateData.discount = discount ? parseFloat(discount) : null;
    if (productType !== undefined) updateData.productType = productType;
    if (weight !== undefined) updateData.weight = weight ? parseFloat(weight) : null;
    if (dimensions !== undefined) updateData.dimensions = dimensions;
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (businessModel !== undefined) updateData.businessModel = businessModel;
    if (status !== undefined) updateData.status = status;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Handle images update if provided
    if (images) {
      // Delete existing images and create new ones
      await prisma.productImage.deleteMany({
        where: { productId: id }
      });
      
      updateData.images = {
        create: images.map((url, index) => ({
          url,
          altText: name || existingProduct.name,
          sortOrder: index,
          isPrimary: index === 0
        }))
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Delete product (Admin only)
export async function DELETE(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        orderItems: true,
        cartItems: true
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if product has orders (prevent deletion if it has order history)
    if (existingProduct.orderItems.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete product with existing orders. Consider deactivating instead.' },
        { status: 400 }
      );
    }

    // Delete product (cascade will handle related records)
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Product deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}