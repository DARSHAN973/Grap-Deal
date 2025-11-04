import { NextResponse } from 'next/server';
import { uploadImageLocally, validateImage } from '@/app/lib/local-image-utils';
import { verifyAuth } from '../../../lib/auth';

export async function POST(request) {
  try {
    console.log('=== IMAGE UPLOAD DEBUG ===');
    
    // Check cookies first
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore?.get?.("auth-token");
    console.log('Token exists:', !!token);
    console.log('Token value:', token?.value ? 'present' : 'missing');
    
    const { user, error } = await verifyAuth();
    
    console.log('Auth result:', { 
      hasUser: !!user, 
      error, 
      userDetails: user ? { userId: user.userId, role: user.role } : null 
    });
    
    if (!user) {
      console.log('No user found - returning 401');
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    console.log('Auth passed - processing file upload');

    const formData = await request.formData();
    const file = formData.get('image');
    const folder = formData.get('folder') || 'general';
    
    // Allow ADMIN for all uploads, and USER for business listing images
    const isBusinessUpload = folder === 'business' || folder === 'services';
    
    if (user.role !== 'ADMIN' && !(user.role === 'USER' && isBusinessUpload)) {
      console.log(`User role is ${user.role}, folder is ${folder} - returning 403`);
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 403 }
      );
    }
    
    console.log('Upload details:', {
      fileName: file?.name,
      fileSize: file?.size,
      requestedFolder: formData.get('folder'),
      actualFolder: folder
    });

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate image
    validateImage(buffer, {
      maxSize: 5 * 1024 * 1024 // 5MB
    });

    // Upload to local storage (folder already defined above)
    const result = await uploadImageLocally(buffer, {
      folder: folder,
      filename: `${folder}-${Date.now()}`
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      imageUrl: result.url,
      filename: result.filename
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}