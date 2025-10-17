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
      const addresses = await prisma.address.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({
        success: true,
        addresses
      });
    } catch (dbError) {
      console.log('Address database query failed:', dbError.message);
      // Return empty addresses as fallback
      return NextResponse.json({
        success: true,
        addresses: []
      });
    }

  } catch (error) {
    console.error('Address fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch addresses' },
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
    
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const {
      fullName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      landmark,
      addressType
    } = await request.json();

    // Validate required fields
    if (!fullName || !email || !phone || !addressLine1 || !city || !state || !pincode) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Set all existing addresses for this user to not default
    await prisma.userAddress.updateMany({
      where: { userId: user.id },
      data: { isDefault: false }
    });

    // Create new address
    const address = await prisma.userAddress.create({
      data: {
        userId: user.id,
        fullName,
        email,
        phone,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        pincode,
        landmark: landmark || null,
        addressType: addressType || 'HOME',
        isDefault: true
      }
    });

    return NextResponse.json({
      success: true,
      addressId: address.id,
      message: 'Address saved successfully'
    });

  } catch (error) {
    console.error('Address creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save address' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request) {
  try {
    const { user, error } = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id, ...addressData } = await request.json();
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      isDefault
    } = addressData;

    // Verify address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: { 
        id,
        userId: user.id 
      }
    });

    if (!existingAddress) {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    const updatedAddress = await prisma.address.update({
      where: { id },
      data: {
        fullName,
        phone,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        pincode,
        isDefault: isDefault || false
      }
    });

    return NextResponse.json({
      success: true,
      address: updatedAddress
    });

  } catch (error) {
    console.error('Address update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update address' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
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

    const { searchParams } = new URL(request.url);
    const addressId = searchParams.get('id');

    if (!addressId) {
      return NextResponse.json(
        { success: false, error: 'Address ID is required' },
        { status: 400 }
      );
    }

    // Verify address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: { 
        id: addressId,
        userId: user.id 
      }
    });

    if (!existingAddress) {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    await prisma.address.delete({
      where: { id: addressId }
    });

    return NextResponse.json({
      success: true,
      message: 'Address deleted successfully'
    });

  } catch (error) {
    console.error('Address delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete address' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}