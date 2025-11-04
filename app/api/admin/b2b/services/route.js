import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyAuth } from '../../../../lib/auth';

// GET - Fetch B2B services for admin (all statuses)
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
    const limit = parseInt(searchParams.get('limit')) || 20;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const approvalStatus = searchParams.get('approvalStatus');
    const serviceType = searchParams.get('serviceType');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { serviceType: { contains: search } },
          { city: { contains: search } },
          { contactNumber: { contains: search } }
        ]
      }),
      ...(status && { status }),
      ...(approvalStatus && { adminApprovalStatus: approvalStatus }),
      ...(serviceType && { serviceType })
    };
    
    // Fetch services with full details for admin
    const [services, totalCount] = await Promise.all([
      prisma.b2BService.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.b2BService.count({ where })
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      success: true,
      services,
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
    console.error('Admin B2B services fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update B2B service (admin actions)
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
      action,
      adminApprovalStatus,
      status,
      isActive,
      name,
      description,
      serviceType,
      contactNumber,
      email,
      website,
      address,
      city,
      state,
      pincode,
      priceType,
      basePrice,
      leadGenerationEnabled,
      refundData
    } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }

    // Check if service exists
    const existingService = await prisma.b2BService.findUnique({
      where: { id }
    });

    if (!existingService) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    let updateData = {};
    let message = 'Service updated successfully';

    // Handle specific actions
    if (action === 'approve') {
      updateData = {
        adminApprovalStatus: 'APPROVED',
        status: 'ACTIVE',
        isActive: true,
        approvedAt: new Date(),
        approvedBy: user.userId || user.id
      };
      message = 'Service approved successfully';
    } else if (action === 'reject') {
      updateData = {
        adminApprovalStatus: 'REJECTED',
        status: 'INACTIVE',
        isActive: false
      };
      message = 'Service rejected successfully';
    } else if (action === 'process_refund' && refundData) {
      updateData = {
        refundProcessed: true,
        refundAmount: refundData.amount,
        refundTransactionId: refundData.transactionId,
        refundNotes: refundData.notes || null,
        refundDate: new Date()
      };
      message = 'Refund processed successfully';
    } else {
      // General update
      if (adminApprovalStatus !== undefined) updateData.adminApprovalStatus = adminApprovalStatus;
      if (status !== undefined) updateData.status = status;
      if (isActive !== undefined) updateData.isActive = isActive;
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (serviceType !== undefined) updateData.serviceType = serviceType;
      if (contactNumber !== undefined) updateData.contactNumber = contactNumber;
      if (email !== undefined) updateData.email = email;
      if (website !== undefined) updateData.website = website;
      if (address !== undefined) updateData.address = address;
      if (city !== undefined) updateData.city = city;
      if (state !== undefined) updateData.state = state;
      if (pincode !== undefined) updateData.pincode = pincode;
      if (priceType !== undefined) updateData.priceType = priceType;
      if (basePrice !== undefined) updateData.basePrice = basePrice ? parseFloat(basePrice) : null;
      if (leadGenerationEnabled !== undefined) updateData.leadGenerationEnabled = leadGenerationEnabled;
    }

    const updatedService = await prisma.b2BService.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message,
      service: updatedService
    });

  } catch (error) {
    console.error('B2B service update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Delete B2B service (admin only)
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
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }

    // Check if service exists
    const existingService = await prisma.b2BService.findUnique({
      where: { id }
    });

    if (!existingService) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    // Delete service
    await prisma.b2BService.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('B2B service deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}