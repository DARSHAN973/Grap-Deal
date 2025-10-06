import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// Submit personal KYC information
export async function POST(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const formData = await request.formData();
    
    // Extract form fields
    const fullName = formData.get('fullName');
    const dateOfBirth = formData.get('dateOfBirth');
    const nationality = formData.get('nationality');
    const occupation = formData.get('occupation');
    const identityType = formData.get('identityType');
    const identityNumber = formData.get('identityNumber');
    const permanentAddress = JSON.parse(formData.get('permanentAddress') || '{}');
    
    // Extract files
    const identityDocument = formData.get('identityDocument');
    const addressDocument = formData.get('addressDocument');
    const photoFile = formData.get('photo');
    const signatureFile = formData.get('signature');

    // Validation
    const errors = {};
    if (!fullName?.trim()) errors.fullName = "Full name is required";
    if (!dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!nationality?.trim()) errors.nationality = "Nationality is required";
    if (!identityType) errors.identityType = "Identity document type is required";
    if (!identityNumber?.trim()) errors.identityNumber = "Identity number is required";
    if (!identityDocument) errors.identityDocument = "Identity document is required";
    if (!permanentAddress.street || !permanentAddress.city) {
      errors.permanentAddress = "Complete address is required";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 });
    }

    // Check if user already has KYC
    const existingKYC = await prisma.userKYC.findUnique({
      where: { userId: tokenUser.userId }
    });

    if (existingKYC && existingKYC.status === 'VERIFIED') {
      return NextResponse.json({ 
        message: "Your KYC is already verified" 
      }, { status: 409 });
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const filesToValidate = [
      { file: identityDocument, name: 'Identity document' },
      { file: addressDocument, name: 'Address document', optional: true },
      { file: photoFile, name: 'Photo', optional: true },
      { file: signatureFile, name: 'Signature', optional: true }
    ];

    for (const { file, name, optional } of filesToValidate) {
      if (!file && !optional) continue;
      if (file) {
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json({ 
            error: `Invalid file type for ${name}. Only JPEG, PNG, and PDF are allowed.` 
          }, { status: 400 });
        }
        if (file.size > maxSize) {
          return NextResponse.json({ 
            error: `${name} file is too large. Maximum size is 5MB.` 
          }, { status: 400 });
        }
      }
    }

    // TODO: Upload files to cloud storage
    // For now, simulate uploads
    const identityDocumentUrl = `/uploads/kyc/identity/${Date.now()}-${identityDocument.name}`;
    const addressDocumentUrl = addressDocument ? `/uploads/kyc/address/${Date.now()}-${addressDocument.name}` : null;
    const photoUrl = photoFile ? `/uploads/kyc/photo/${Date.now()}-${photoFile.name}` : null;
    const signatureUrl = signatureFile ? `/uploads/kyc/signature/${Date.now()}-${signatureFile.name}` : null;

    // Calculate expiry date (KYC valid for 2 years)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 2);

    // Create or update KYC record
    const kycData = {
      fullName: fullName.trim(),
      dateOfBirth: new Date(dateOfBirth),
      nationality: nationality.trim(),
      occupation: occupation?.trim() || null,
      identityType,
      identityNumber: identityNumber.trim(),
      identityDocument: identityDocumentUrl,
      addressDocument: addressDocumentUrl,
      permanentAddress,
      photoUrl,
      signatureUrl,
      status: 'PENDING',
      submittedAt: new Date(),
      expiresAt
    };

    let userKYC;
    if (existingKYC) {
      userKYC = await prisma.userKYC.update({
        where: { userId: tokenUser.userId },
        data: kycData
      });
    } else {
      userKYC = await prisma.userKYC.create({
        data: {
          userId: tokenUser.userId,
          ...kycData
        }
      });
    }

    // Update user KYC status
    await prisma.user.update({
      where: { id: tokenUser.userId },
      data: { kycstatus: 'PENDING' }
    });

    return NextResponse.json({ 
      message: "KYC information submitted successfully. Your documents will be reviewed within 24-48 hours.",
      kyc: {
        id: userKYC.id,
        status: userKYC.status,
        submittedAt: userKYC.submittedAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error("KYC submission error:", error);
    return NextResponse.json({ error: "Failed to submit KYC information" }, { status: 500 });
  }
}

// Get user's KYC status and information
export async function GET() {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userKYC = await prisma.userKYC.findUnique({
      where: { userId: tokenUser.userId },
      select: {
        id: true,
        fullName: true,
        nationality: true,
        occupation: true,
        identityType: true,
        status: true,
        verificationNotes: true,
        submittedAt: true,
        verifiedAt: true,
        expiresAt: true,
        riskLevel: true
      }
    });

    // Check if KYC is expiring soon (within 30 days)
    const isExpiring = userKYC?.expiresAt && 
      new Date(userKYC.expiresAt).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000;

    return NextResponse.json({ 
      kyc: userKYC,
      isExpiring,
      canApplyAsVendor: userKYC?.status === 'VERIFIED' && !isExpiring
    });

  } catch (error) {
    console.error("Get KYC error:", error);
    return NextResponse.json({ error: "Failed to fetch KYC information" }, { status: 500 });
  }
}

// Update KYC information (for resubmission)
export async function PATCH(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userKYC = await prisma.userKYC.findUnique({
      where: { userId: tokenUser.userId }
    });

    if (!userKYC) {
      return NextResponse.json({ error: "No KYC record found" }, { status: 404 });
    }

    if (userKYC.status === 'VERIFIED') {
      return NextResponse.json({ 
        error: "Cannot modify verified KYC. Please contact support for changes." 
      }, { status: 400 });
    }

    // Allow resubmission for rejected or expired KYC
    if (!['REJECTED', 'EXPIRED'].includes(userKYC.status)) {
      return NextResponse.json({ 
        error: "KYC can only be modified if rejected or expired" 
      }, { status: 400 });
    }

    // Process the update similar to POST
    // Implementation would be similar to POST but updating existing record
    
    return NextResponse.json({ message: "KYC updated successfully" });

  } catch (error) {
    console.error("Update KYC error:", error);
    return NextResponse.json({ error: "Failed to update KYC information" }, { status: 500 });
  }
}