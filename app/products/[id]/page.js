'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Plus, Minus, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import MagneticButton from '../../../components/ui/MagneticButton';
import SuggestedProducts from '../../../components/ui/SuggestedProducts';
import { useCart } from '../../../components/providers/CartProvider';

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const { addToCart, loading: cartLoading, getItemCount } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    const checkWishlistStatus = async () => {
      if (!productId) return;
      
      try {
        const response = await fetch('/api/wishlist');
        if (response.ok) {
          const data = await response.json();
          const isInWishlist = data.wishlist?.some(item => {
            return item.product.id === productId || item.product.id === parseInt(productId) || item.productId === productId;
          });
          setIsLiked(isInWishlist || false);
        }
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    // Handle wishlist updates from other components
    const handleWishlistUpdate = (event) => {
      const { productId: updatedProductId, action } = event.detail;
      if (updatedProductId == productId || updatedProductId == parseInt(productId)) {
        setIsLiked(action === 'add');
      }
    };

    if (productId) {
      fetchProduct();
      checkWishlistStatus();
      window.addEventListener('wishlist-updated', handleWishlistUpdate);
    }

    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product || cartLoading) return;
    
    // Check stock availability
    if (product.stock === 0) {
      alert('This product is currently out of stock');
      return;
    }
    
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available in stock`);
      return;
    }
    
    const productData = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      images: product.images,
      brand: product.brand,
      category: product.category?.name || 'General',
      stock: product.stock,
    };
    
    await addToCart(productData, quantity);
  };

  const handleWishlistToggle = async () => {
    if (!product || wishlistLoading) return;
    
    setWishlistLoading(true);
    try {
      if (isLiked) {
        // Remove from wishlist
        const response = await fetch('/api/wishlist', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product.id }),
        });

        if (response.ok) {
          setIsLiked(false);
          // Show success message
          window.dispatchEvent(new CustomEvent('cart-success', {
            detail: { message: 'Removed from wishlist' }
          }));
          // Dispatch wishlist update event for sync
          window.dispatchEvent(new CustomEvent('wishlist-updated', {
            detail: { productId: product.id, action: 'remove' }
          }));
        } else {
          const data = await response.json();
          window.dispatchEvent(new CustomEvent('cart-error', {
            detail: { message: data.error || 'Failed to remove from wishlist' }
          }));
        }
      } else {
        // Add to wishlist
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product.id }),
        });

        if (response.ok) {
          setIsLiked(true);
          // Show success message
          window.dispatchEvent(new CustomEvent('cart-success', {
            detail: { message: 'Added to wishlist' }
          }));
          // Dispatch wishlist update event for sync
          window.dispatchEvent(new CustomEvent('wishlist-updated', {
            detail: { productId: product.id, action: 'add' }
          }));
        } else {
          const data = await response.json();
          window.dispatchEvent(new CustomEvent('cart-error', {
            detail: { message: data.error || 'Failed to add to wishlist' }
          }));
        }
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Failed to update wishlist. Please try again.' }
      }));
    } finally {
      setWishlistLoading(false);
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-product.jpg';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) return imageUrl;
    // Handle both string URLs and objects with url property
    const url = typeof imageUrl === 'object' ? imageUrl.url : imageUrl;
    // If it already starts with /uploads, use it as is, otherwise add the path
    if (url.startsWith('/uploads/')) return url;
    return `/uploads/products/${url}`;
  };

  // Manual image slider only (no auto-play)
  const intervalRef = useRef(null);

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setSelectedImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    
    if (product && product.stock === 0) {
      alert('This product is currently out of stock');
      return;
    }
    
    if (product && newQuantity > product.stock) {
      alert(`Only ${product.stock} items available in stock`);
      return;
    }
    
    setQuantity(newQuantity);
  };

  // Zoom functionality
  const handleMouseEnter = (e) => {
    setIsZoomed(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !e.currentTarget) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Product not found'}
          </h1>
          <MagneticButton
            variant="gradient"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </MagneticButton>
        </div>
      </div>
    );
  }

  const currentPrice = parseFloat(product.price) || 0;
  const originalPrice = parseFloat(product.originalPrice) || 0;
  const discount = parseFloat(product.discount) || 0;
  const primaryImage = getImageUrl(product.images?.[selectedImageIndex]?.url || product.images?.[selectedImageIndex]);
  const cartCount = getItemCount(product.id);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-16">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 bg-linear-to-r from-blue-400 to-purple-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => window.history.back()}
          className="mb-8 group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-white/10 dark:border-white/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Back to Products
          </span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Product Images Slider */}
          <motion.div
            className="space-y-4 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image Container */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-[2.5rem] bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-white/60 shadow-2xl backdrop-blur-xl">
                <div className="relative h-full w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`h-full w-full transition-all duration-200 ${isZoomed ? 'cursor-crosshair' : 'cursor-zoom-in'}`}
                        style={{ 
                          backgroundImage: `url(${primaryImage})`,
                          backgroundSize: isZoomed ? '300%' : 'cover',
                          backgroundPosition: isZoomed 
                            ? `${zoomPosition.x}% ${zoomPosition.y}%` 
                            : 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 hover:scale-110 transition-all z-30 shadow-lg"
                        disabled={selectedImageIndex === 0}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 hover:scale-110 transition-all z-30 shadow-lg"
                        disabled={selectedImageIndex === product.images.length - 1}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Status Badge */}
                  <div className="absolute left-6 top-6">
                    <motion.div
                      className="flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Premium Quality</span>
                    </motion.div>
                  </div>



                  {/* Image Counter */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute left-6 bottom-6 z-20">
                      <div className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-sm font-medium text-white">
                        {selectedImageIndex + 1} / {product.images.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Dots Indicator */}
              {product.images && product.images.length > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === selectedImageIndex 
                          ? 'w-8 bg-linear-to-r from-blue-500 to-purple-500' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>


          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Product Title and Brand */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="rounded-lg bg-linear-to-r from-blue-500 to-purple-500 px-3 py-1">
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    {product.brand}
                  </span>
                </div>
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 px-2 py-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {product.category?.name || 'General'}
                  </span>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-2xl md:text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {product.name}
              </motion.h1>
            </div>

            {/* Rating */}
            <motion.div 
              className="flex items-center gap-3 p-3 bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-xl border border-white/60 dark:border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 4.5)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-900 dark:text-white">
                  {product.rating || 4.5}
                </span>
                <div className="h-3 w-px bg-gray-300 dark:bg-gray-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.reviewCount || 0} reviews
                </span>
              </div>
            </motion.div>

            {/* Price */}
            <motion.div 
              className="space-y-3 p-4 bg-linear-to-br from-white/80 to-white/60 dark:from-white/10 dark:to-white/5 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <motion.span 
                  className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  ₹{currentPrice.toFixed(0)}
                </motion.span>
                {originalPrice > currentPrice && (
                  <motion.span 
                    className="text-lg text-gray-500 line-through"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    ₹{originalPrice.toFixed(0)}
                  </motion.span>
                )}
                {discount > 0 && (
                  <motion.div
                    className="rounded-lg bg-linear-to-r from-red-500 to-orange-500 px-3 py-1 shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs font-bold text-white">
                      {discount}% OFF
                    </span>
                  </motion.div>
                )}
              </div>
              {discount > 0 && (
                <motion.div
                  className="flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    You save: ₹{(originalPrice - currentPrice).toFixed(0)}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Stock Status */}
            <motion.div 
              className="flex items-center gap-2 p-3 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-white/60 dark:border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="relative">
                <div className={`h-3 w-3 rounded-full ${
                  product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                }`} />
                {product.stock > 0 && (
                  <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 animate-ping opacity-20" />
                )}
              </div>
              <span className={`text-sm font-medium ${
                product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
              </span>
              {product.stock > 0 && product.stock <= 5 && (
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium">
                  Limited
                </span>
              )}
            </motion.div>

            {/* Description */}
            {product.description && (
              <motion.div 
                className="space-y-2 p-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  Product Details
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            )}

            {/* Quantity Selector - Only show if in stock */}
            {product.stock > 0 && (
              <motion.div 
                className="space-y-3 p-4 bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Plus className="h-4 w-4 text-purple-500" />
                  Select Quantity ({product.stock} available)
                </h3>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 transition-all hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-105"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <div className="flex items-center justify-center min-w-12 h-10 px-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-md">
                    <span className="text-lg font-bold">
                      {quantity}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 transition-all hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-105"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="flex flex-col gap-3">
                {product.stock === 0 ? (
                  <div className="flex items-center justify-center py-4 px-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                    <span className="text-red-600 dark:text-red-400 font-bold text-lg">
                      Not in Stock
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <MagneticButton
                      variant="gradient"
                      size="md"
                      className="flex-1 justify-center py-3 text-sm font-semibold rounded-xl shadow-xl"
                      onClick={handleAddToCart}
                      disabled={cartLoading}
                    >
                      {cartLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span>Adding...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                          {cartCount > 0 && (
                            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                              {cartCount}
                            </span>
                          )}
                        </div>
                      )}
                    </MagneticButton>

                    <MagneticButton
                      variant="outline"
                      size="md"
                      className="flex-1 justify-center py-3 text-sm font-semibold rounded-xl shadow-xl bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                      onClick={() => window.location.href = `/checkout?productId=${product.id}&quantity=${quantity}&type=buy-now`}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Buy Now</span>
                      </div>
                    </MagneticButton>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 rounded-xl text-gray-700 dark:text-gray-200 transition-all hover:bg-white/80 dark:hover:bg-white/20 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: wishlistLoading ? 1 : 1.02 }}
                    whileTap={{ scale: wishlistLoading ? 1 : 0.98 }}
                  >
                    {wishlistLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    ) : (
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    )}
                    <span className="text-sm font-medium">
                      {wishlistLoading ? 'Updating...' : (isLiked ? 'In Wishlist' : 'Add to Wishlist')}
                    </span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex items-center justify-center h-12 w-12 bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 rounded-xl text-gray-700 dark:text-gray-200 transition-all hover:bg-white/80 dark:hover:bg-white/20 shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Suggested Products Section */}
      {product && product.category && (
        <SuggestedProducts 
          currentProductId={product.id} 
          category={product.category.name}
          brand={product.brand}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;