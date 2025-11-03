import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '@/app/lib/auth';

// GET - Fetch all users with pagination and filtering
export async function GET(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized - Admin access required' 
      }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role');
    const status = searchParams.get('status'); // active, inactive
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(role && { role: role }),
      ...(status && { 
        isActive: status === 'active' ? true : false 
      })
    };

    // Build orderBy clause
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    // Fetch users with pagination
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          avatar: true,
          kycstatus: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              orders: true,
              c2cListings: true,
              following: true,
              followers: true
            }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          hasMore: page < totalPages,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch users'
    }, { status: 500 });
  }
}

// PUT - Update user status or role
export async function PUT(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized - Admin access required' 
      }, { status: 403 });
    }

    const body = await request.json();
    const { userId, action, value } = body;

    if (!userId || !action) {
      return NextResponse.json({
        success: false,
        error: 'User ID and action are required'
      }, { status: 400 });
    }

    let updateData = {};

    switch (action) {
      case 'toggle_status':
        updateData = { isActive: value };
        break;
      case 'update_role':
        if (!['USER', 'VENDOR', 'ADMIN'].includes(value)) {
          return NextResponse.json({
            success: false,
            error: 'Invalid role specified'
          }, { status: 400 });
        }
        updateData = { role: value };
        break;
      case 'update_kyc_status':
        if (!['NONE', 'PENDING', 'APPROVED', 'REJECTED'].includes(value)) {
          return NextResponse.json({
            success: false,
            error: 'Invalid KYC status specified'
          }, { status: 400 });
        }
        updateData = { kycstatus: value };
        break;
      case 'update_details':
        // Validate the user data
        const { name, email, phone, role, isActive, kycstatus } = value;
        
        if (!name || !email || !phone) {
          return NextResponse.json({
            success: false,
            error: 'Name, email, and phone are required'
          }, { status: 400 });
        }

        if (!['USER', 'VENDOR', 'ADMIN'].includes(role)) {
          return NextResponse.json({
            success: false,
            error: 'Invalid role specified'
          }, { status: 400 });
        }

        if (!['NONE', 'PENDING', 'APPROVED', 'REJECTED'].includes(kycstatus)) {
          return NextResponse.json({
            success: false,
            error: 'Invalid KYC status specified'
          }, { status: 400 });
        }

        // Check if email is already taken by another user
        const existingUser = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase(),
            NOT: { id: userId }
          }
        });

        if (existingUser) {
          return NextResponse.json({
            success: false,
            error: 'Email is already taken by another user'
          }, { status: 400 });
        }

        updateData = {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone.trim(),
          role,
          isActive,
          kycstatus
        };
        break;
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action specified'
        }, { status: 400 });
    }

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
      message: `User ${action.replace('_', ' ')} updated successfully`,
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

    return NextResponse.json({
      success: false,
      error: 'Failed to update user'
    }, { status: 500 });
  }
}

// DELETE - Delete user (soft delete by setting isActive to false)
export async function DELETE(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized - Admin access required' 
      }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User ID is required'
      }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    if (userId === user.id) {
      return NextResponse.json({
        success: false,
        error: 'Cannot delete your own account'
      }, { status: 400 });
    }

    // Soft delete by setting isActive to false
    const deletedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        isActive: false,
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'User deactivated successfully',
      data: deletedUser
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to delete user'
    }, { status: 500 });
  }
}