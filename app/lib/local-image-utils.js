import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

/**
 * Upload image to local public folder
 * @param {Buffer} imageBuffer - The image buffer to save
 * @param {Object} options - Upload options
 * @param {string} options.folder - Subfolder within /public/uploads/ (e.g., 'categories', 'products')
 * @param {string} options.filename - Custom filename (optional, will generate if not provided)
 * @returns {Promise<{url: string, filename: string}>}
 */
export async function uploadImageLocally(imageBuffer, options = {}) {
  try {
    const {
      folder = 'general',
      filename = `image-${Date.now()}-${Math.random().toString(36).substring(7)}`
    } = options;

    // Validate buffer
    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error('Invalid image buffer provided');
    }

    // Determine file extension from buffer (basic detection)
    let extension = '.jpg'; // default
    if (imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50) {
      extension = '.png';
    } else if (imageBuffer[0] === 0x47 && imageBuffer[1] === 0x49) {
      extension = '.gif';
    } else if (imageBuffer[0] === 0xFF && imageBuffer[1] === 0xD8) {
      extension = '.jpg';
    } else if (imageBuffer[0] === 0x3C && imageBuffer[1] === 0x73) {
      extension = '.svg';
    }

    // Ensure filename has extension
    const finalFilename = filename.includes('.') ? filename : `${filename}${extension}`;

    // Create upload directory path
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
      console.log(`Created directory: ${uploadDir}`);
    }

    // Full file path
    const filePath = path.join(uploadDir, finalFilename);
    
    // Write file
    await writeFile(filePath, imageBuffer);
    console.log(`Image saved successfully: ${filePath}`);

    // Return public URL path (relative to public folder)
    const publicUrl = `/uploads/${folder}/${finalFilename}`;

    return {
      url: publicUrl,
      filename: finalFilename,
      path: filePath
    };

  } catch (error) {
    console.error('Local image upload error:', error);
    throw new Error(`Failed to upload image locally: ${error.message}`);
  }
}

/**
 * Delete an image from local storage
 * @param {string} imageUrl - The public URL of the image (e.g., /uploads/categories/image-123.jpg)
 * @returns {Promise<boolean>}
 */
export async function deleteLocalImage(imageUrl) {
  try {
    if (!imageUrl || !imageUrl.startsWith('/uploads/')) {
      console.warn('Invalid image URL for deletion:', imageUrl);
      return false;
    }

    const { unlink } = await import('fs/promises');
    const filePath = path.join(process.cwd(), 'public', imageUrl);
    
    if (existsSync(filePath)) {
      await unlink(filePath);
      console.log(`Image deleted successfully: ${filePath}`);
      return true;
    } else {
      console.warn(`Image file not found: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error('Error deleting local image:', error);
    return false;
  }
}

/**
 * Validate image file
 * @param {Buffer} buffer - The image buffer
 * @param {Object} options - Validation options
 * @param {number} options.maxSize - Maximum file size in bytes (default: 5MB)
 * @param {string[]} options.allowedTypes - Allowed mime types
 * @returns {boolean}
 */
export function validateImage(buffer, options = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  // Check size
  if (buffer.length > maxSize) {
    throw new Error(`Image size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`);
  }

  // Basic type validation based on magic numbers
  const isPNG = buffer[0] === 0x89 && buffer[1] === 0x50;
  const isJPEG = buffer[0] === 0xFF && buffer[1] === 0xD8;
  const isGIF = buffer[0] === 0x47 && buffer[1] === 0x49;
  const isWEBP = buffer[8] === 0x57 && buffer[9] === 0x45;

  if (!isPNG && !isJPEG && !isGIF && !isWEBP) {
    throw new Error('Invalid image type. Only JPEG, PNG, GIF, and WebP are allowed.');
  }

  return true;
}
