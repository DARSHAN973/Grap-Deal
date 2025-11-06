'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useCart } from '../providers/CartProvider';

const SuggestedProducts = ({ currentProductId, category, brand }) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        setLoading(true);
        // Fallback approach: Get all products and filter client-side
        const response = await fetch(`/api/products?limit=20`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.products && Array.isArray(data.products)) {
            // Filter by category and exclude current product
            const filtered = data.products
              .filter(product => {
                // Exclude current product
                if (product.id === currentProductId || product.id === parseInt(currentProductId)) {
                  return false;
                }
                
                // Filter by category (handle both string and object category)
                if (category) {
                  const productCategory = typeof product.category === 'string' 
                    ? product.category.trim().toLowerCase() 
                    : product.category?.name?.trim().toLowerCase();
                  const targetCategory = category.trim().toLowerCase();
                  return productCategory === targetCategory;
                }
                
                return true;
              })
              .slice(0, 4);
            
            setSuggestedProducts(filtered);
          } else {
            setSuggestedProducts([]);
          }
        } else {
          setSuggestedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching suggested products:', error);
        setSuggestedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist');
        if (response.ok) {
          const data = await response.json();
          const wishlistIds = new Set(
            data.wishlist?.map(item => item.product.id) || []
          );
          setWishlistItems(wishlistIds);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (category) {
      fetchSuggestedProducts();
      fetchWishlist();
    }
  }, [currentProductId, category]);

  const getImageUrl = (product) => {
    // Handle different image data structures
    if (product.image && product.image !== '/api/placeholder/300/300') {
      return product.image;
    }
    
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      }
      if (firstImage.url) {
        return firstImage.url;
      }
    }
    
    // Fallback to category-specific placeholder images
    const placeholderImages = {
      'fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center&q=60',
      'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&crop=center&q=60',
      'home': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center&q=60',
      'books': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center&q=60',
      'sports': 'https://images.unsplash.com/photo-1571019613914-85e2c6a7b9d5?w=400&h=400&fit=crop&crop=center&q=60',
      'default': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center&q=60'
    };
    
    const categoryKey = category ? category.toLowerCase().trim() : 'default';
    return placeholderImages[categoryKey] || placeholderImages.default;
  };

  const handleAddToCart = async (product) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      images: product.images,
      brand: product.brand,
      category: product.category,
    };
    
    await addToCart(productData, 1);
  };

  const toggleWishlist = async (product) => {
    const isInWishlist = wishlistItems.has(product.id);
    
    try {
      const method = isInWishlist ? 'DELETE' : 'POST';
      const response = await fetch('/api/wishlist', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        const newWishlistItems = new Set(wishlistItems);
        if (isInWishlist) {
          newWishlistItems.delete(product.id);
          window.dispatchEvent(new CustomEvent('cart-success', {
            detail: { message: 'Removed from wishlist' }
          }));
        } else {
          newWishlistItems.add(product.id);
          window.dispatchEvent(new CustomEvent('cart-success', {
            detail: { message: 'Added to wishlist' }
          }));
        }
        setWishlistItems(newWishlistItems);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Failed to update wishlist' }
      }));
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (suggestedProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-linear-to-br from-gray-50/50 via-blue-50/30 to-purple-50/20 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            You Might Also Like
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover more amazing products from the <span className="font-semibold text-blue-600 dark:text-blue-400">{category}</span> category
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to default placeholder on error
                    e.target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center&q=60`;
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Quick Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <motion.button
                    onClick={() => toggleWishlist(product)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlistItems.has(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    />
                  </motion.button>
                </div>

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3">
                    <div className="rounded-lg bg-linear-to-r from-red-500 to-orange-500 px-2 py-1 shadow-md">
                      <span className="text-xs font-bold text-white">
                        {product.discount}% OFF
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-3">
                {/* Brand */}
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
                  {product.brand}
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating || 4.5)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({product.reviewCount || 0})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹{parseFloat(product.price).toFixed(0)}
                  </span>
                  {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{parseFloat(product.originalPrice).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <MagneticButton
                    variant="secondary"
                    size="sm"
                    className="flex-1 justify-center text-xs border border-gray-300/50 bg-gray-100/80 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-200/80 hover:text-gray-900 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/40 dark:hover:bg-white/20 dark:hover:text-white"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add to Cart
                  </MagneticButton>
                  <MagneticButton
                    variant="gradient" 
                    size="sm"
                    className="px-3"
                    onClick={() => window.location.href = `/products/${product.id}`}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <MagneticButton
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = `/products?category=${encodeURIComponent(category)}`}
            className="border border-gray-300/50 bg-gray-100/80 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-200/80 hover:text-gray-900 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/40 dark:hover:bg-white/20 dark:hover:text-white backdrop-blur-xl"
          >
            <span>View All {category} Products</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
};

export default SuggestedProducts;