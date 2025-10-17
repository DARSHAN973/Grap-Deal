/**
 * Utility functions for handling image URLs and paths
 */

/**
 * Get the correct API URL for serving images
 * @param {string} imagePath - The image path from database (e.g., "uploads/products/image.jpg" or "products/image.jpg")
 * @returns {string} - The correct API URL (e.g., "/api/uploads/products/image.jpg")
 */
export function getImageUrl(imagePath) {
  if (!imagePath) {
    return '/api/uploads/general/placeholder.jpg'; // Default placeholder
  }

  // Remove leading slashes and normalize the path
  const cleanPath = imagePath.replace(/^\/+/, '');
  
  // If path already starts with 'uploads/', remove it since our API adds it
  const normalizedPath = cleanPath.startsWith('uploads/') 
    ? cleanPath.replace('uploads/', '') 
    : cleanPath;
    
  return `/api/uploads/${normalizedPath}`;
}

/**
 * Get the file system path for storing images
 * @param {string} category - Image category (products, categories, general, etc.)
 * @param {string} filename - The filename
 * @returns {string} - The file system path
 */
export function getStoragePath(category, filename) {
  return `uploads/${category}/${filename}`;
}

/**
 * Validate image file type
 * @param {string} filename - The filename to validate
 * @returns {boolean} - Whether the file type is valid
 */
export function isValidImageType(filename) {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return validExtensions.includes(ext);
}

/**
 * Generate a unique filename
 * @param {string} originalName - Original filename
 * @param {string} prefix - Prefix for the filename (optional)
 * @returns {string} - Unique filename
 */
export function generateUniqueFilename(originalName, prefix = '') {
  const timestamp = Date.now();
  const ext = originalName.substring(originalName.lastIndexOf('.'));
  const baseName = prefix || originalName.substring(0, originalName.lastIndexOf('.'));
  return `${baseName}-${timestamp}${ext}`;
}