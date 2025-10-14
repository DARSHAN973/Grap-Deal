# Uploads Directory

This directory stores all locally uploaded images for the application.

## Directory Structure

- `categories/` - Category images
- `products/` - Product images
- `banners/` - Banner images  
- `general/` - General purpose images

## Important Notes

- Images are stored locally in the public folder
- Accessible via `/uploads/{folder}/{filename}` URL path
- Make sure this directory has proper write permissions
- Consider adding `.gitignore` rules to exclude uploaded files from version control (optional)

## Permissions

Ensure the server has write permissions to this directory:
```bash
chmod -R 755 public/uploads
```
