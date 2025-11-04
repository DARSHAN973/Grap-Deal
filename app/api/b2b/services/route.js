import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// GET - Fetch approved B2B services (public)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const search = searchParams.get('search') || '';
    const serviceType = searchParams.get('serviceType');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    
    const skip = (page - 1) * limit;
    
    // Build where clause - only show approved and active services
    const where = {
      adminApprovalStatus: 'APPROVED',
      status: 'ACTIVE',
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { serviceType: { contains: search } },
          { city: { contains: search } }
        ]
      }),
      ...(serviceType && { serviceType }),
      ...(city && { city }),
      ...(state && { state })
    };
    
    // Fetch services
    const [services, totalCount] = await Promise.all([
      prisma.b2BService.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          serviceType: true,
          contactNumber: true,
          email: true,
          website: true,
          city: true,
          state: true,
          priceType: true,
          basePrice: true,
          images: true,
          viewCount: true,
          createdAt: true
        }
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
    console.error('B2B services fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Submit new B2B service (public submission)
export async function POST(request) {
  try {

    const {
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
      priceType = 'CONTACT',
      basePrice,
      leadGenerationEnabled = true,
      images = [],

      // KYC / bank details
      kycAccountHolderName,
      kycBankAccountNumber,
      kycIfscCode,
      kycBankName,
      kycBranchName = null,
      kycAccountType = 'SAVINGS',
      kycPanNumber,
      kycAadharNumber
    } = await request.json();

    // Validate required fields (basic)
    if (!name || !description || !serviceType || !contactNumber || !city || !state) {
      return NextResponse.json(
        { success: false, error: 'Name, description, service type, contact number, city, and state are required' },
        { status: 400 }
      );
    }

    // Validate required KYC fields (PAN and Aadhar are required per product owner request)
    if (!kycPanNumber || !kycAadharNumber) {
      return NextResponse.json(
        { success: false, error: 'PAN number and Aadhar number are required for KYC/refund processing' },
        { status: 400 }
      );
    }

    // Create service (pending admin approval) including KYC fields
    const service = await prisma.b2BService.create({
      data: {
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
        basePrice: basePrice ? parseFloat(basePrice) : null,
        leadGenerationEnabled,
        images: images || [],
        status: 'DRAFT',
        adminApprovalStatus: 'PENDING',
        isActive: false,

        // KYC fields (persist)
        kycAccountHolderName: kycAccountHolderName || '',
        kycBankAccountNumber: kycBankAccountNumber || '',
        kycIfscCode: kycIfscCode || '',
        kycBankName: kycBankName || '',
        kycBranchName: kycBranchName || null,
        kycAccountType: kycAccountType || 'SAVINGS',
        kycPanNumber,
        kycAadharNumber
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Service submitted successfully. It will be reviewed by our team.',
      service: {
        id: service.id,
        name: service.name,
        status: service.adminApprovalStatus
      }
    });

  } catch (error) {
    console.error('B2B service submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit service' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}