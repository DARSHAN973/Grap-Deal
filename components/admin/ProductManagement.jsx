"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PhotoIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Loading states for different operations
  const [operationLoading, setOperationLoading] = useState({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    upload: false
  });
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(null);

  // Form state - E-Commerce products only (simplified)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    brand: '',
    originalPrice: '', // MRP/Original Price (before discount)
    price: '', // Selling Price (after discount) - calculated automatically
    rating: '', // Product rating (0-5)
    discount: '', // Discount percentage
    productType: 'REGULAR', // REGULAR, TRENDING, BESTSELLER, HOT_DROP, NEW_ARRIVAL, FEATURED
    // Logistics optional fields
    weight: '', // in kg
    length: '', // in cm
    width: '', // in cm
    height: '', // in cm
    stock: '', // Available quantity
    images: [] // Array of image URLs
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Calculate selling price based on original price and discount
  const calculateSellingPrice = (originalPrice, discount) => {
    if (!originalPrice || !discount) return originalPrice || '';
    const discountAmount = (parseFloat(originalPrice) * parseFloat(discount)) / 100;
    const sellingPrice = parseFloat(originalPrice) - discountAmount;
    return sellingPrice.toFixed(2);
  };

  // Auto-calculate selling price when original price or discount changes
  useEffect(() => {
    if (formData.originalPrice && formData.discount) {
      const originalPrice = parseFloat(formData.originalPrice);
      const discount = parseFloat(formData.discount);
      const calculatedPrice = originalPrice - (originalPrice * discount / 100);
      setFormData(prev => ({ ...prev, price: calculatedPrice.toFixed(2) }));
    } else if (formData.originalPrice && !formData.discount) {
      // If no discount, selling price = original price
      setFormData(prev => ({ ...prev, price: formData.originalPrice }));
    } else if (!formData.originalPrice) {
      // If no original price, clear selling price
      setFormData(prev => ({ ...prev, price: '' }));
    }
  }, [formData.originalPrice, formData.discount]);

  // Fetch products
  const fetchProducts = async (page = 1) => {
    try {
      setOperationLoading(prev => ({ ...prev, fetch: true }));
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      if (categoryFilter) params.append('category', categoryFilter);

      const response = await fetch(`/api/admin/products?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setOperationLoading(prev => ({ ...prev, fetch: false }));
    }
  };

  // Fetch categories and vendors for form
  const fetchFormData = async () => {
    try {
      const [categoriesRes, vendorsRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/vendors') // You'll need to create this endpoint
      ]);

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.categories || []);
      }

      // For now, we'll use a placeholder for vendors
      setVendors([{ id: 'vendor1', businessName: 'Sample Vendor' }]);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, searchTerm, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchFormData();
  }, []);

  // Handle form submission - Simplified with Image Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isUpdate = !!editingProduct;
    const loadingKey = isUpdate ? 'update' : 'create';
    
    try {
      setOperationLoading(prev => ({ ...prev, [loadingKey]: true }));
      
      // Upload new images if any
      let uploadedImageUrls = [...formData.images]; // Keep existing images for edit
      
      if (imageFiles.length > 0) {
        setOperationLoading(prev => ({ ...prev, upload: true }));
        setUploadingImages(true);
        const newUploadedUrls = await uploadImages(imageFiles);
        uploadedImageUrls = [...uploadedImageUrls, ...newUploadedUrls];
        setUploadingImages(false);
        setOperationLoading(prev => ({ ...prev, upload: false }));
      }
      
      // Auto-generate slug from name
      const slug = formData.name.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      // Auto-generate or keep existing SKU
      const sku = editingProduct?.sku || `EC-${Date.now()}`;
      
      // Auto-calculate selling price and ensure discount is stored
      const originalPriceFloat = parseFloat(formData.originalPrice);
      const sellingPriceFloat = parseFloat(formData.price);
      const discountFloat = parseFloat(formData.discount);
      
      // Calculate actual discount percentage for storage
      let actualDiscount = null;
      if (formData.discount && originalPriceFloat > 0) {
        actualDiscount = discountFloat;
      } else if (originalPriceFloat > 0 && sellingPriceFloat > 0 && originalPriceFloat > sellingPriceFloat) {
        // Calculate discount from price difference
        actualDiscount = ((originalPriceFloat - sellingPriceFloat) / originalPriceFloat) * 100;
      }
      
      // Prepare payload
      const payload = {
        name: formData.name,
        slug: slug,
        description: formData.description,
        categoryId: formData.categoryId,
        brand: formData.brand || 'Generic',
        originalPrice: originalPriceFloat || null,
        price: sellingPriceFloat, // This will be the calculated selling price
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        discount: actualDiscount ? parseFloat(actualDiscount.toFixed(2)) : null, // Store calculated discount
        productType: formData.productType || 'REGULAR',
        weight: formData.weight ? parseFloat(formData.weight) : 1.0,
        dimensions: (formData.length && formData.width && formData.height) ? {
          length: parseFloat(formData.length),
          width: parseFloat(formData.width),
          height: parseFloat(formData.height),
          unit: 'cm'
        } : { length: 10, width: 10, height: 5, unit: 'cm' },
        sku: sku,
        stock: parseInt(formData.stock) || 0,
        businessModel: 'E_COMMERCE',
        status: 'ACTIVE',
        isActive: true,
        images: uploadedImageUrls
      };
      
      if (editingProduct) {
        payload.id = editingProduct.id;
      }

      const url = '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowForm(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts(currentPage);
      } else {
        const error = await response.json();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cart-error', { detail: { message: error.error || 'Failed to save product' } }));
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cart-error', { detail: { message: 'Failed to save product' } }));
      }
    } finally {
      setOperationLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      setOperationLoading(prev => ({ ...prev, delete: true }));
      
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setDeleteConfirm(null);
        fetchProducts(currentPage);
      } else {
        const error = await response.json();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cart-error', { detail: { message: error.error || 'Failed to delete product' } }));
        }
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cart-error', { detail: { message: 'Failed to delete product' } }));
      }
    } finally {
      setOperationLoading(prev => ({ ...prev, delete: false }));
    }
  };

  // Update product status (supports any status value)
  const updateProductStatus = async (productId, newStatus) => {
    setStatusUpdatingId(productId);
    setStatusDropdownOpen(null);
    try {
      const payload = { id: productId, status: newStatus };
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        // refresh
        fetchProducts(currentPage);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cart-success', { detail: { message: 'Product status updated' } }));
        }
      } else {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cart-error', { detail: { message: data.error || 'Failed to update product status' } }));
        }
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cart-error', { detail: { message: 'Error updating product status: ' + error.message } }));
      }
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Reset form - Simplified
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      categoryId: '',
      brand: '',
      originalPrice: '',
      price: '',
      rating: '',
      discount: '',
      productType: 'REGULAR',
      weight: '',
      length: '',
      width: '',
      height: '',
      stock: '',
      images: []
    });
    setImageFiles([]);
    setUploadingImages(false);
  };

  // Upload images to server
  const uploadImages = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('folder', 'products');
      
      try {
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: uploadFormData
        });
        
        if (response.ok) {
          const { url } = await response.json();
          console.log('Image uploaded successfully:', url);
          return url;
        } else {
          const errorData = await response.json();
          console.error('Failed to upload image:', file.name, errorData);
          return null;
        }
      } catch (error) {
        console.error('Error uploading image:', file.name, error);
        return null;
      }
    });
    
    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null);
  };

  // Edit product - Simplified
  const handleEdit = (product) => {
    setEditingProduct(product);
    
    // Parse dimensions from JSON if exists
    let dimensions = { length: '', width: '', height: '' };
    if (product.dimensions) {
      try {
        dimensions = typeof product.dimensions === 'string' 
          ? JSON.parse(product.dimensions) 
          : product.dimensions;
      } catch (e) {
        console.error('Error parsing dimensions:', e);
      }
    }
    
    // Get stock quantity
    const stock = product.stock || 0;
    
    setFormData({
      name: product.name || '',
      description: product.description || '',
      categoryId: product.category?.id || '',
      brand: product.brand || '',
      originalPrice: product.originalPrice?.toString() || '',
      price: product.price?.toString() || '',
      rating: product.rating?.toString() || '',
      discount: product.discount?.toString() || '',
      productType: product.productType || 'REGULAR',
      weight: product.weight?.toString() || '',
      length: dimensions.length?.toString() || '',
      width: dimensions.width?.toString() || '',
      height: dimensions.height?.toString() || '',
      stock: stock.toString(),
      images: product.images?.map(img => img.url) || []
    });
    setShowForm(true);
  };

  // Generate slug from name
  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your product catalog</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingProduct(null);
              setShowForm(true);
            }}
            disabled={operationLoading.create || operationLoading.update}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-5 w-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setCategoryFilter('');
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden relative">
        {/* Operation Loading Overlay */}
        {operationLoading.fetch && !loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Refreshing products...</p>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {product.images && product.images.length > 0 ? (
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={product.images[0].url}
                                alt={product.name}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <PhotoIcon className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              SKU: {product.sku || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {product.category?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">₹{product.price}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                            )}
                          </div>
                          {product.discount && (
                            <span className="text-green-600 text-xs">
                              -{product.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {product.rating && product.rating > 0 && (
                            <div className="flex items-center text-xs text-yellow-600">
                              <span>⭐</span>
                              <span className="ml-1">{product.rating}</span>
                            </div>
                          )}
                          {product.productType && product.productType !== 'REGULAR' && (
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              {product.productType === 'TRENDING' && '🔥 Trending'}
                              {product.productType === 'BESTSELLER' && '⭐ Bestseller'}
                              {product.productType === 'HOT_DROP' && '🚀 Hot Drop'}
                              {product.productType === 'NEW_ARRIVAL' && '✨ New Arrival'}
                              {product.productType === 'FEATURED' && '👑 Featured'}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap relative">
                        <div className="flex items-center gap-2">
                          {/* Quick toggle: clicking badge toggles ACTIVE <-> INACTIVE */}
                          <button
                            onClick={() => {
                              if (statusUpdatingId) return;
                              const newStatus = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                              updateProductStatus(product.id, newStatus);
                            }}
                            disabled={statusUpdatingId === product.id}
                            title="Toggle Active / Inactive"
                            className="inline-flex items-center"
                          >
                            {statusUpdatingId === product.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            ) : (
                              // Show only ACTIVE or INACTIVE to admins. Map any non-ACTIVE status to INACTIVE for display.
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                product.status === 'ACTIVE'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {product.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'}
                              </span>
                            )}
                          </button>

                          {/* Dropdown button for choosing any status */}
                          <div className="relative">
                            <button
                              onClick={() => setStatusDropdownOpen(prev => (prev === product.id ? null : product.id))}
                              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                              title="Change status"
                              disabled={statusUpdatingId === product.id}
                            >
                              <FunnelIcon className="h-4 w-4 text-gray-500" />
                            </button>

                            {statusDropdownOpen === product.id && (
                              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-20">
                                {['ACTIVE','INACTIVE'].map(s => (
                                  <button
                                    key={s}
                                    onClick={() => updateProductStatus(product.id, s)}
                                    disabled={statusUpdatingId === product.id}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${product.status === s ? 'font-semibold' : ''}`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {product.stock || product.totalInventory || 0}
                        </div>
                        {(product.stock || product.totalInventory) <= 10 && (
                          <div className="text-xs text-red-600">
                            Low Stock
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            disabled={operationLoading.update || operationLoading.delete}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit Product"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(product)}
                            disabled={operationLoading.update || operationLoading.delete}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Product"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {((currentPage - 1) * pagination.limit) + 1} to {Math.min(currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount} results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1 || operationLoading.fetch}
                      className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded">
                      {currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                      disabled={currentPage === pagination.totalPages || operationLoading.fetch}
                      className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Info Banner */}
                  <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Add Product</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Company products for direct sale to customers
                    </p>
                  </div>

                  {/* Basic Product Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., Premium Wireless Headphones"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.categoryId}
                        onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Brand (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., Sony, Apple, Generic"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Original Price (MRP) * (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.originalPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="3999"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum Retail Price (before discount)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Discount (%) - Optional
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.discount}
                        onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="10.5"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.originalPrice && formData.discount ? (
                          <>
                            Discount will be ₹{(parseFloat(formData.originalPrice) * parseFloat(formData.discount) / 100).toFixed(2)} 
                            <br />
                            Final price: ₹{calculateSellingPrice(formData.originalPrice, formData.discount)}
                          </>
                        ) : (
                          'Discount percentage for sale price calculation'
                        )}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Selling Price (₹) - Auto-calculated
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:text-white cursor-not-allowed"
                        placeholder="Auto-calculated from original price and discount"
                        readOnly
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.originalPrice && formData.discount 
                          ? `Automatically calculated: ₹${formData.originalPrice} - ${formData.discount}% = ₹${formData.price}`
                          : formData.originalPrice && !formData.discount
                          ? `Same as original price: ₹${formData.originalPrice}`
                          : 'Enter original price and discount to calculate'
                        }
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="50"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Available quantity in warehouse
                      </p>
                    </div>
                  </div>

                  {/* Product Rating & Type */}
                  <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      ⭐ Product Features
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Rating (0-5) - Optional
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="4.5"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Product quality rating (stars)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Product Type
                        </label>
                        <select
                          value={formData.productType}
                          onChange={(e) => setFormData(prev => ({ ...prev, productType: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option value="REGULAR">Regular Product</option>
                          <option value="TRENDING">🔥 Trending</option>
                          <option value="BESTSELLER">⭐ Bestseller</option>
                          <option value="HOT_DROP">🚀 Hot Drop</option>
                          <option value="NEW_ARRIVAL">✨ New Arrival</option>
                          <option value="FEATURED">👑 Featured</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          Special categorization for homepage
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Describe the product features, specifications..."
                    />
                  </div>

                  {/* Product Images */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      📸 Product Images
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Upload multiple images for your product
                    </p>
                    
                    {/* Image Upload Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Images
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          setImageFiles(files);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Select multiple images (JPG, PNG, WebP). First image will be the main image.
                      </p>
                    </div>

                    {/* Selected Images Preview */}
                    {imageFiles.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Selected Images ({imageFiles.length})
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {imageFiles.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newFiles = imageFiles.filter((_, i) => i !== index);
                                  setImageFiles(newFiles);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                              {index === 0 && (
                                <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                  Main
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Existing Images (for edit mode) */}
                    {formData.images.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Images ({formData.images.length})
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {formData.images.map((imageUrl, index) => (
                            <div key={index} className="relative">
                              <img
                                src={imageUrl}
                                alt={`Current ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = formData.images.filter((_, i) => i !== index);
                                  setFormData(prev => ({ ...prev, images: newImages }));
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                              {index === 0 && (
                                <span className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                  Main
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload Status */}
                    {uploadingImages && (
                      <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-blue-700 dark:text-blue-300">
                          Uploading images...
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Shipping Details - Optional for Logistics */}
                  <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      📦 Shipping Details (Optional)
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Optional - Fill if you want to calculate delivery costs automatically
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.weight}
                          onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="0.5"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Length (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={formData.length}
                          onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Width (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={formData.width}
                          onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="15"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={formData.height}
                          onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                        resetForm();
                      }}
                      className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={operationLoading.create || operationLoading.update || operationLoading.upload}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {(operationLoading.create || operationLoading.update || operationLoading.upload) ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          {operationLoading.upload ? 'Uploading Images...' : 
                           editingProduct ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <>
                          <CheckIcon className="h-5 w-5" />
                          {editingProduct ? 'Update Product' : 'Add Product'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Delete Product
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete "{deleteConfirm.name}"? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  disabled={operationLoading.delete}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  disabled={operationLoading.delete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {operationLoading.delete ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;