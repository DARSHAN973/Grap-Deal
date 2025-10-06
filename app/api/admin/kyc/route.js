import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// Get all pending KYC applications for admin review
export async function GET(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser || !['ADMIN', 'SUPER_ADMIN'].includes(tokenUser.role)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'PENDING';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Get user KYC applications
    const userKYCs = await prisma.userKYC.findMany({
      where: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
          }
        }
      },
      orderBy: { submittedAt: 'asc' },
      skip,
      take: limit
    });

    // Get vendor applications with KYC documents
    const vendorApplications = await prisma.vendorApplication.findMany({
      where: { kycStatus: status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        kycDocuments: {
          select: {
            id: true,
            documentType: true,
            documentName: true,
            verificationStatus: true,
            uploadedAt: true
          }
        }
      },
      orderBy: { appliedAt: 'asc' },
      skip,
      take: limit
    });

    const total = await Promise.all([
      prisma.userKYC.count({ where: { status } }),
      prisma.vendorApplication.count({ where: { kycStatus: status } })
    ]);

    return NextResponse.json({
      userKYCs,
      vendorApplications,
      pagination: {
        page,
        limit,
        totalUserKYCs: total[0],
        totalVendorApplications: total[1],
        hasNext: (userKYCs.length + vendorApplications.length) === limit
      }
    });

  } catch (error) {
    console.error("Get KYC applications error:", error);
    return NextResponse.json({ error: "Failed to fetch KYC applications" }, { status: 500 });
  }
}

// Verify/Reject user KYC
export async function PATCH(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser || !['ADMIN', 'SUPER_ADMIN'].includes(tokenUser.role)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { kycId, action, notes, riskLevel } = body;

    if (!kycId || !action || !['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    const userKYC = await prisma.userKYC.findUnique({
      where: { id: kycId },
      include: { user: true }
    });

    if (!userKYC) {
      return NextResponse.json({ error: "KYC record not found" }, { status: 404 });
    }

    const updateData = {
      verificationNotes: notes || null,
      verifiedAt: new Date(),
      verifiedBy: tokenUser.userId
    };

    if (action === 'APPROVE') {
      updateData.status = 'VERIFIED';
      updateData.riskLevel = riskLevel || 'LOW';
    } else {
      updateData.status = 'REJECTED';
    }

    // Update KYC record
    const updatedKYC = await prisma.userKYC.update({
      where: { id: kycId },
      data: updateData
    });

    // Update user's KYC status
    await prisma.user.update({
      where: { id: userKYC.userId },
      data: { 
        kycstatus: action === 'APPROVE' ? 'VERIFIED' : 'REJECTED'
      }
    });

    // TODO: Send notification email to user about KYC status

    return NextResponse.json({
      message: `KYC ${action.toLowerCase()}d successfully`,
      kyc: updatedKYC
    });

  } catch (error) {
    console.error("Verify KYC error:", error);
    return NextResponse.json({ error: "Failed to process KYC verification" }, { status: 500 });
  }
}