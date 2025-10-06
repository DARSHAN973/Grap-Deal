import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// Upload KYC documents for vendor application
export async function POST(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('documents');
    const documentTypes = formData.getAll('documentTypes');
    const applicationId = formData.get('applicationId');

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    // Verify the application belongs to the user
    const application = await prisma.vendorApplication.findFirst({
      where: {
        id: applicationId,
        userId: tokenUser.userId
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (files.length !== documentTypes.length) {
      return NextResponse.json({ error: "Document count mismatch" }, { status: 400 });
    }

    const uploadedDocuments = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const documentType = documentTypes[i];

      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ 
          error: `Invalid file type for ${file.name}. Only JPEG, PNG, and PDF are allowed.` 
        }, { status: 400 });
      }

      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: `File ${file.name} is too large. Maximum size is 5MB.` 
        }, { status: 400 });
      }

      // TODO: Upload file to cloud storage (AWS S3, Cloudinary, etc.)
      // For now, we'll simulate the upload
      const simulatedFileUrl = `/uploads/kyc/${Date.now()}-${file.name}`;

      // Save document record to database
      const kycDocument = await prisma.kYCDocument.create({
        data: {
          applicationId: applicationId,
          documentType: documentType,
          documentName: file.name,
          documentUrl: simulatedFileUrl,
          fileSize: file.size,
          mimeType: file.type,
          verificationStatus: 'PENDING'
        }
      });

      uploadedDocuments.push(kycDocument);
    }

    // Update application KYC status to indicate documents have been uploaded
    await prisma.vendorApplication.update({
      where: { id: applicationId },
      data: { 
        kycStatus: 'PENDING' // Documents uploaded, awaiting verification
      }
    });

    return NextResponse.json({ 
      message: "Documents uploaded successfully",
      documents: uploadedDocuments
    }, { status: 201 });

  } catch (error) {
    console.error("Document upload error:", error);
    return NextResponse.json({ error: "Failed to upload documents" }, { status: 500 });
  }
}

// Get uploaded documents for vendor application
export async function GET(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    // Verify the application belongs to the user
    const application = await prisma.vendorApplication.findFirst({
      where: {
        id: applicationId,
        userId: tokenUser.userId
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Get all documents for this application
    const documents = await prisma.kYCDocument.findMany({
      where: { applicationId },
      select: {
        id: true,
        documentType: true,
        documentName: true,
        verificationStatus: true,
        uploadedAt: true,
        verificationNotes: true,
        verifiedAt: true
      },
      orderBy: { uploadedAt: 'desc' }
    });

    return NextResponse.json({ documents });

  } catch (error) {
    console.error("Get documents error:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

// Delete a document (only if not yet verified)
export async function DELETE(request) {
  try {
    const { user: tokenUser, error } = await verifyAuth();
    
    if (!tokenUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('documentId');

    if (!documentId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
    }

    // Get document and verify ownership
    const document = await prisma.kYCDocument.findFirst({
      where: {
        id: documentId,
        application: {
          userId: tokenUser.userId
        }
      }
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (document.verificationStatus !== 'PENDING') {
      return NextResponse.json({ 
        error: "Cannot delete document that has been processed" 
      }, { status: 400 });
    }

    // Delete document
    await prisma.kYCDocument.delete({
      where: { id: documentId }
    });

    // TODO: Delete actual file from storage

    return NextResponse.json({ message: "Document deleted successfully" });

  } catch (error) {
    console.error("Delete document error:", error);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}