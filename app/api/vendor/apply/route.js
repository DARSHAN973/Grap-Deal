import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function POST(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { 
      businessName, 
      businessType, 
      description, 
      phoneNumber, 
      website,
      businessAddress,
      businessRegNumber,
      taxId,
      gstNumber,
      requiredDocuments = [] // Array of document types that need to be uploaded
    } = body;

    // Validation
    const errors = {};
    if (!businessName?.trim()) errors.businessName = "Business name is required";
    if (!businessType) errors.businessType = "Business type is required";
    if (!description?.trim()) errors.description = "Business description is required";
    if (!phoneNumber?.trim()) errors.phoneNumber = "Phone number is required";
    
    // Business address validation
    if (!businessAddress || !businessAddress.street || !businessAddress.city || !businessAddress.state || !businessAddress.country) {
      errors.businessAddress = "Complete business address is required";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 });
    }

    // Check if user already has a vendor application
    const existingApplication = await prisma.vendorApplication.findUnique({
      where: { userId: tokenUser.userId }
    });

    if (existingApplication) {
      return NextResponse.json({ 
        message: "You already have a pending vendor application" 
      }, { status: 409 });
    }

    // Check if user has completed personal KYC
    const userKYC = await prisma.userKYC.findUnique({
      where: { userId: tokenUser.userId }
    });

    if (!userKYC || userKYC.status !== 'VERIFIED') {
      return NextResponse.json({ 
        message: "Please complete your personal KYC verification before applying as a vendor",
        requiresKYC: true
      }, { status: 400 });
    }

    // Create vendor application with KYC pending status
    const vendorApplication = await prisma.vendorApplication.create({
      data: {
        userId: tokenUser.userId,
        businessName: businessName.trim(),
        businessType,
        description: description.trim(),
        phoneNumber: phoneNumber.trim(),
        website: website?.trim() || null,
        businessAddress,
        businessRegNumber: businessRegNumber?.trim() || null,
        taxId: taxId?.trim() || null,
        gstNumber: gstNumber?.trim() || null,
        status: 'PENDING',
        kycStatus: 'PENDING', // Requires KYC document verification
      }
    });

    return NextResponse.json({ 
      message: "Vendor application submitted successfully. Please upload required KYC documents to complete your application.",
      application: vendorApplication,
      nextStep: "UPLOAD_DOCUMENTS",
      requiredDocuments: getRequiredDocuments(businessType)
    }, { status: 201 });

  } catch (error) {
    console.error("Vendor application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Get user's vendor application status with KYC documents
    const application = await prisma.vendorApplication.findUnique({
      where: { userId: tokenUser.userId },
      include: {
        kycDocuments: {
          select: {
            id: true,
            documentType: true,
            documentName: true,
            verificationStatus: true,
            uploadedAt: true,
            verificationNotes: true
          }
        }
      }
    });

    // Get user's personal KYC status
    const userKYC = await prisma.userKYC.findUnique({
      where: { userId: tokenUser.userId },
      select: {
        status: true,
        verificationNotes: true,
        expiresAt: true
      }
    });

    return NextResponse.json({ 
      application,
      userKYC,
      requiredDocuments: application ? getRequiredDocuments(application.businessType) : []
    });

  } catch (error) {
    console.error("Get vendor application error:", error);
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 });
  }
}

// Helper function to determine required documents based on business type
function getRequiredDocuments(businessType) {
  const baseDocuments = [
    'BUSINESS_REGISTRATION',
    'TAX_CERTIFICATE', 
    'BANK_STATEMENT',
    'IDENTITY_PROOF',
    'ADDRESS_PROOF'
  ];

  const typeSpecificDocuments = {
    'CORPORATION': ['MOA_AOA', 'FINANCIAL_STATEMENT'],
    'PARTNERSHIP': ['PARTNERSHIP_DEED'],
    'LLC': ['FINANCIAL_STATEMENT'],
    'INDIVIDUAL': [], // Only base documents required
    'NONPROFIT': ['TAX_EXEMPTION_CERTIFICATE']
  };

  return [
    ...baseDocuments,
    ...(typeSpecificDocuments[businessType] || [])
  ];
}

// TODO: Add VendorApplication model to Prisma schema:
/*
model VendorApplication {
  id           Int      @id @default(autoincrement())
  user         User     @relation(fields: [userId], references: [id])
  userId       Int      @unique
  businessName String
  businessType String   // retail, wholesale, manufacturer, service
  description  String   @db.Text
  phoneNumber  String
  website      String?
  status       VendorApplicationStatus @default(PENDING) // PENDING, APPROVED, REJECTED
  adminNotes   String?  @db.Text
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum VendorApplicationStatus {
  PENDING
  APPROVED
  REJECTED
}
*/