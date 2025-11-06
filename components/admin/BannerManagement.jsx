"use client";

import { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'file'
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    sortOrder: 0,
    isActive: true
  });

  // Fetch banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/banner');
      if (response.ok) {
        const data = await response.json();
        setBanners(data.banners || []);
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages
    
    try {
      setUploading(true);
      
      // Upload new images if any
      let finalImageUrl = formData.imageUrl;
      
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImages(imageFiles);
        if (uploadedUrls.length > 0) {
          finalImageUrl = uploadedUrls[0]; // Use the first uploaded image
        } else {
          setMessage('Failed to upload images. Please try again.');
          setUploading(false);
          return;
        }
      }
      
      // Validate that we have an image URL
      if (!finalImageUrl) {
        setMessage('Please provide an image URL or upload an image file');
        setUploading(false);
        return;
      }
      
      const url = editingBanner 
        ? `/api/admin/banner/${editingBanner.id}`
        : '/api/admin/banner';
      
      const method = editingBanner ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: finalImageUrl
        })
      });

      if (response.ok) {
        setMessage(editingBanner ? 'Banner updated successfully!' : 'Banner created successfully!');
        setTimeout(() => {
          setShowForm(false);
          resetForm();
          fetchBanners();
        }, 1500);
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to save banner');
      }
    } catch (error) {
      console.error('Save banner error:', error);
      setMessage('Failed to save banner');
    } finally {
      setUploading(false);
    }
  };

  // Handle delete
  const handleDelete = async (bannerId) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const response = await fetch(`/api/admin/banner/${bannerId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('Banner deleted successfully!');
        fetchBanners();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to delete banner');
      }
    } catch (error) {
      console.error('Delete banner error:', error);
      setMessage('Failed to delete banner');
    }
  };

  // Toggle banner active status
  const toggleStatus = async (bannerId, currentStatus) => {
    try {
      const response = await fetch(`/api/admin/banner/${bannerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        fetchBanners();
      } else {
        alert('Failed to update banner status');
      }
    } catch (error) {
      console.error('Toggle status error:', error);
      alert('Failed to update banner status');
    }
  };

  // Handle multiple image files selection (like product form)
  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(files);
      // Create preview URLs
      const previews = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      setImagePreviews(previews);
    }
  };

  // Upload images to server (same as product form)
  const uploadImages = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('folder', 'banners');
      
      try {
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: uploadFormData
        });
        
        if (response.ok) {
          const { url } = await response.json();
          console.log('Banner image uploaded successfully:', url);
          return url;
        } else {
          const errorData = await response.json();
          console.error('Failed to upload banner image:', file.name, errorData);
          return null;
        }
      } catch (error) {
        console.error('Error uploading banner image:', file.name, error);
        return null;
      }
    });
    
    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null);
  };

  // Remove image from selection
  const removeImageFile = (index) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index].preview);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      imageUrl: "",
      sortOrder: 0,
      isActive: true
    });
    setEditingBanner(null);
    setUploadMode('url');
    setImageFiles([]);
    // Clean up preview URLs to prevent memory leaks
    imagePreviews.forEach(preview => URL.revokeObjectURL(preview.preview));
    setImagePreviews([]);
    setMessage(''); // Clear any messages
  };

  // Open edit form
  const openEditForm = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      imageUrl: banner.imageUrl,
      sortOrder: banner.sortOrder,
      isActive: banner.isActive
    });
    // Set upload mode based on existing image URL
    setUploadMode(banner.imageUrl.startsWith('/uploads/') ? 'file' : 'url');
    setShowForm(true);
  };

  // Open add form
  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Banner Management</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Manage hero banners displayed on the homepage
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Banner
        </button>
      </div>

      {/* Add/Edit Banner Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {editingBanner ? 'Edit Banner' : 'Add New Banner'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          
          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-md ${message.includes('successfully') || message.includes('success') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter banner title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                min="0"
                value={formData.sortOrder}
                onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Banner Image
              </label>
              
              {/* Upload Mode Selector */}
              <div className="flex gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadMode"
                    value="url"
                    checked={uploadMode === 'url'}
                    onChange={(e) => setUploadMode(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Image URL</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadMode"
                    value="file"
                    checked={uploadMode === 'file'}
                    onChange={(e) => setUploadMode(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Upload File</span>
                </label>
              </div>

              {/* URL Input */}
              {uploadMode === 'url' && (
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://example.com/banner.jpg"
                />
              )}

              {/* File Upload */}
              {uploadMode === 'file' && (
                <div className="space-y-4">
                  {/* File Input */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageFiles}
                      className="hidden"
                      id="banner-image-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="banner-image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload banner image</span>
                        <p className="text-sm">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeImageFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                            {preview.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploading && (
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm">Uploading banner image...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Current Image URL Display */}
              {formData.imageUrl && (
                <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <span className="font-medium">Current Image: </span>
                  <span className="text-blue-600 break-all">{formData.imageUrl}</span>
                  {formData.imageUrl.startsWith('/uploads/') && (
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, imageUrl: ''})}
                      className="ml-2 text-red-600 hover:text-red-800 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 dark:text-white">
                Active
              </label>
            </div>
            
            {formData.imageUrl && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview
                </label>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full max-w-md h-32 object-cover rounded-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                {editingBanner ? 'Update Banner' : 'Create Banner'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            {banners.length === 0 ? (
              <div className="text-center py-8">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No banners</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by creating your first banner.
                </p>
                <div className="mt-6">
                  <button
                    onClick={openAddForm}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                    Add Banner
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Banner
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {banners.map((banner) => (
                      <tr key={banner.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-24 shrink-0">
                              <img
                                className="h-16 w-24 object-cover rounded-md"
                                src={banner.imageUrl}
                                alt={banner.title}
                                onError={(e) => {
                                  e.target.src = '/api/placeholder/96/64';
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {banner.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {banner.sortOrder}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            banner.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {banner.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(banner.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => toggleStatus(banner.id, banner.isActive)}
                              className={`p-2 rounded-md ${
                                banner.isActive
                                  ? 'text-red-600 hover:text-red-900'
                                  : 'text-green-600 hover:text-green-900'
                              }`}
                              title={banner.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {banner.isActive ? (
                                <EyeSlashIcon className="h-4 w-4" />
                              ) : (
                                <EyeIcon className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => openEditForm(banner)}
                              className="p-2 text-blue-600 hover:text-blue-900 rounded-md"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(banner.id)}
                              className="p-2 text-red-600 hover:text-red-900 rounded-md"
                              title="Delete"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}


    </div>
  );
};

export default BannerManagement;