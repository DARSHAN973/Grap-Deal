import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// Get vendor application details for admin review
export async function GET(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser || !['ADMIN', 'SUPER_ADMIN'].includes(tokenUser.role)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    const application = await prisma.vendorApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true
          }
        },
        kycDocuments: {
          orderBy: { uploadedAt: 'desc' }
        }
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Get user's personal KYC status
    const userKYC = await prisma.userKYC.findUnique({
      where: { userId: application.userId },
      select: {
        status: true,
        verificationNotes: true,
        verifiedAt: true,
        riskLevel: true
      }
    });

    return NextResponse.json({
      application,
      userKYC
    });

  } catch (error) {
    console.error("Get vendor application error:", error);
    return NextResponse.json({ error: "Failed to fetch vendor application" }, { status: 500 });
  }
}

// Verify individual KYC documents
export async function PATCH(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser || !['ADMIN', 'SUPER_ADMIN'].includes(tokenUser.role)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { documentId, action, notes } = body;

    if (!documentId || !action || !['APPROVE', 'REJECT', 'REQUEST_RESUBMISSION'].includes(action)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    const document = await prisma.kYCDocument.findUnique({
      where: { id: documentId },
      include: {
        application: true
      }
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const statusMap = {
      'APPROVE': 'APPROVED',
      'REJECT': 'REJECTED',
      'REQUEST_RESUBMISSION': 'REQUIRES_RESUBMISSION'
    };

    // Update document verification status
    const updatedDocument = await prisma.kYCDocument.update({
      where: { id: documentId },
      data: {
        verificationStatus: statusMap[action],
        verificationNotes: notes || null,
        verifiedAt: new Date(),
        verifiedBy: tokenUser.userId
      }
    });

    // Check if all documents for this application are verified
    const allDocuments = await prisma.kYCDocument.findMany({
      where: { applicationId: document.applicationId }
    });

    const pendingDocs = allDocuments.filter(doc => doc.verificationStatus === 'PENDING');
    const rejectedDocs = allDocuments.filter(doc => 
      ['REJECTED', 'REQUIRES_RESUBMISSION'].includes(doc.verificationStatus)
    );
    const approvedDocs = allDocuments.filter(doc => doc.verificationStatus === 'APPROVED');

    // Update application KYC status based on document verification status
    let applicationKycStatus = 'PENDING';
    let applicationStatus = 'PENDING';

    if (rejectedDocs.length > 0) {
      applicationKycStatus = 'REJECTED';
      applicationStatus = 'REJECTED';
    } else if (pendingDocs.length === 0 && approvedDocs.length === allDocuments.length) {
      applicationKycStatus = 'VERIFIED';
      applicationStatus = 'APPROVED'; // All KYC documents verified
    }

    await prisma.vendorApplication.update({
      where: { id: document.applicationId },
      data: {
        kycStatus: applicationKycStatus,
        ...(applicationStatus !== 'PENDING' && { 
          status: applicationStatus,
          reviewedAt: new Date(),
          reviewedBy: tokenUser.userId
        })
      }
    });

    // If application is approved, create vendor profile
    if (applicationStatus === 'APPROVED') {
      const application = await prisma.vendorApplication.findUnique({
        where: { id: document.applicationId }
      });

      await prisma.vendorProfile.create({
        data: {
          userId: application.userId,
          businessName: application.businessName,
          businessType: application.businessType,
          description: application.description,
          businessEmail: application.user?.email || '',
          businessPhone: application.phoneNumber,
          isVerified: true,
          isActive: true
        }
      });

      // Update user role to VENDOR
      await prisma.user.update({
        where: { id: application.userId },
        data: { role: 'VENDOR' }
      });
    }

    return NextResponse.json({
      message: `Document ${action.toLowerCase()}d successfully`,
      document: updatedDocument,
      applicationStatus
    });

  } catch (error) {
    console.error("Verify document error:", error);
    return NextResponse.json({ error: "Failed to process document verification" }, { status: 500 });
  }
}

// Bulk approve/reject vendor application
export async function POST(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser || !['ADMIN', 'SUPER_ADMIN'].includes(tokenUser.role)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { applicationId, action, notes } = body;

    if (!applicationId || !action || !['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    const application = await prisma.vendorApplication.findUnique({
      where: { id: applicationId },
      include: { user: true }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Update application status
    const updatedApplication = await prisma.vendorApplication.update({
      where: { id: applicationId },
      data: {
        status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
        kycStatus: action === 'APPROVE' ? 'VERIFIED' : 'REJECTED',
        reason: action === 'REJECT' ? notes : null,
        adminNotes: notes,
        reviewedAt: new Date(),
        reviewedBy: tokenUser.userId
      }
    });

    if (action === 'APPROVE') {
      // Create vendor profile
      await prisma.vendorProfile.create({
        data: {
          userId: application.userId,
          businessName: application.businessName,
          businessType: application.businessType,
          description: application.description,
          businessEmail: application.user.email,
          businessPhone: application.phoneNumber,
          isVerified: true,
          isActive: true
        }
      });

      // Update user role to VENDOR
      await prisma.user.update({
        where: { id: application.userId },
        data: { role: 'VENDOR' }
      });
    }

    // TODO: Send notification email to user

    return NextResponse.json({
      message: `Vendor application ${action.toLowerCase()}d successfully`,
      application: updatedApplication
    });

  } catch (error) {
    console.error("Process vendor application error:", error);
    return NextResponse.json({ error: "Failed to process vendor application" }, { status: 500 });
  }
}