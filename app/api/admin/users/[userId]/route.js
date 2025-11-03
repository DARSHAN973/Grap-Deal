import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

// GET - Get detailed user information
export async function GET(request, { params }) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized - Admin access required' 
      }, { status: 403 });
    }

    const { userId } = await params;

    const userDetails = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: {
          select: {
            id: true,
            type: true,
            firstName: true,
            lastName: true,
            company: true,
            address1: true,
            address2: true,
            city: true,
            state: true,
            country: true,
            zipCode: true,
            phone: true,
            isDefault: true,
            createdAt: true
          }
        },
        orders: {
          select: {
            id: true,
            orderNumber: true,
            totalAmount: true,
            status: true,
            paymentStatus: true,
            createdAt: true
            ,
            orderItems: {
              select: {
                id: true,
                quantity: true,
                price: true,
                product: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        },
        c2cListings: {
          select: {
            id: true,
            title: true,
            price: true,
            status: true,
            isSold: true,
            condition: true,
            location: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        cart: {
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    price: true,
                    images: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            orders: true,
            c2cListings: true,
            following: true,
            followers: true
          }
        }
      }
    });

    if (!userDetails) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Calculate user statistics
    const stats = {
      totalOrders: userDetails._count.orders,
      totalC2CListings: userDetails._count.c2cListings,
      followingCount: userDetails._count.following,
      followersCount: userDetails._count.followers,
      cartItemsCount: userDetails.cart?.items?.length || 0,
      totalSpent: userDetails.orders.reduce((sum, order) => 
        sum + parseFloat(order.totalAmount), 0
      )
    };

    // Remove sensitive data
    delete userDetails._count;

    return NextResponse.json({
      success: true,
      data: {
        user: userDetails,
        stats
      }
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch user details'
    }, { status: 500 });
  }
}

// PUT - Update user details
export async function PUT(request, { params }) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized - Admin access required' 
      }, { status: 403 });
    }

    const { userId } = await params;
    const body = await request.json();
    const { name, email, phone, role, isActive, kycstatus } = body;

    // Validate email uniqueness if email is being updated
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email,
          id: { not: userId }
        }
      });

      if (existingUser) {
        return NextResponse.json({
          success: false,
          error: 'Email already exists'
        }, { status: 400 });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (kycstatus !== undefined) updateData.kycstatus = kycstatus;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        kycstatus: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: 'Email or phone already exists'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update user'
    }, { status: 500 });
  }
}