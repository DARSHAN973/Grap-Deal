'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { useCart } from '../providers/CartProvider';

const ProductCard = ({ 
  product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    images: ["/api/placeholder/400/400"],
    rating: 4.5,
    brand: "TechBrand",
    category: "Electronics",
    isNew: true,
    isFeatured: false,
    isTrending: false,
    isHot: false
  },
  viewMode = 'grid'
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, loading: cartLoading, getItemCount } = useCart();
  
  // Extract images from the images array
  const primaryImage = product.images?.[0]?.url || product.image || '/api/placeholder/300/300';

  // Handle add to cart
  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click when clicking cart button
    if (cartLoading) return;
    
    const productData = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      images: product.images,
      brand: product.brand,
      category: product.category,
    };
    
    await addToCart(productData, 1);
  };

  // Handle navigation to product details
  const handleProductView = () => {
    window.location.href = `/products/${product.id}`;
  };

  // Get current cart count for this product
  const cartCount = getItemCount(product.id);
  
  // Use EXACT values from database - NO extra calculations
  const currentPrice = parseFloat(product.price) || 0; // Selling price from admin
  const originalPrice = parseFloat(product.originalPrice) || 0; // Original price from admin
  const discount = parseFloat(product.discount) || 0; // Discount percentage from admin
  
  // FOR TESTING: If no originalPrice/discount, create sample data
  let testOriginalPrice = originalPrice;
  let testDiscount = discount;
  let testSavingsAmount = 0;
  
  if (originalPrice > 0 && discount > 0) {
    // Use real database values
    testSavingsAmount = originalPrice * discount / 100;
  } else if (currentPrice > 0) {
    // FOR TESTING: Create sample discount data
    testOriginalPrice = currentPrice * 1.2; // 20% markup
    testDiscount = 20;
    testSavingsAmount = testOriginalPrice - currentPrice;
  }
  
  // Debug log to see EXACT database values
  console.log('ProductCard - DB + TEST VALUES:', product.name, {
    dbPrice: product.price,
    dbOriginalPrice: product.originalPrice, 
    dbDiscount: product.discount,
    finalCurrentPrice: currentPrice,
    finalOriginalPrice: testOriginalPrice,
    finalDiscount: testDiscount,
    finalSavings: testSavingsAmount,
    usingTestData: !originalPrice || !discount
  });
  
  // Determine status and accent based on product flags
  const getStatusInfo = () => {
    if (product.isFeatured) return { status: 'Featured', accent: 'from-sky-500/25 via-blue-500/20 to-indigo-500/25' };
    if (product.isTrending) return { status: 'Trending', accent: 'from-amber-500/25 via-orange-500/20 to-rose-500/25' };
    if (product.isHot) return { status: 'Hot Drop', accent: 'from-fuchsia-500/25 via-purple-500/20 to-violet-500/25' };
    if (product.isNew) return { status: 'New', accent: 'from-emerald-500/25 via-teal-400/20 to-cyan-500/25' };
    return { status: null, accent: 'from-gray-500/25 via-gray-400/20 to-gray-500/25' };
  };

  const { status, accent } = getStatusInfo();

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : i < rating
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (viewMode === 'list') {
    // List view design (simplified version)
    return (
      <motion.article
        className="group relative flex h-32 w-full shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-lg backdrop-blur-2xl transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={`absolute inset-0 bg-linear-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-90`} />
        
        <div className="relative h-full w-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${primaryImage})` }}
          />
        </div>
        
        <div className="relative flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">₹{currentPrice.toFixed(0)}</span>
                {testOriginalPrice > currentPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{testOriginalPrice.toFixed(0)}</span>
                )}
              </div>
              {testDiscount > 0 && testSavingsAmount > 0 && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Save {testDiscount}% (₹{Math.round(testSavingsAmount)})
                </span>
              )}
            </div>
            <StarRating rating={product.rating} />
          </div>
        </div>
      </motion.article>
    );
  }

  // Grid view design (matching TrendingSlider)
  return (
    <motion.article
      className="group relative flex h-full min-h-136 w-full shrink-0 flex-col overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/85 shadow-2xl backdrop-blur-2xl transition-all hover:-translate-y-3 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={handleProductView}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-90`} />

  <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 scale-105 transform bg-cover bg-center transition-transform duration-500 group-hover:scale-125"
          style={{ backgroundImage: `url(${primaryImage})` }}
        />
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
          initial={{ opacity: 0.65 }}
          whileHover={{ opacity: 0.78 }}
        />
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-white/80">
          {status && (
            <span className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 font-semibold backdrop-blur">
              {status}
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleProductView();
              }}
              aria-label={`Quick view ${product.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <Eye className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsLiked(!isLiked)}
              aria-label={`${isLiked ? 'Remove from' : 'Add to'} wishlist`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <Heart className={`h-4.5 w-4.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1.5 text-white">
          <span className="text-[0.7rem] uppercase tracking-[0.32em] text-white/70">
            {product.category}
          </span>
          <h3 className="text-xl font-semibold leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-white/75">{product.brand}</p>
        </div>
      </div>

  <div className="relative flex flex-col px-4 pt-4 pb-3 text-gray-700 dark:text-gray-300">
        <div className="flex items-center justify-between mb-2">
          <StarRating rating={product.rating} />
          {discount && discount > 0 && (
            // hide discount pill on small screens to save space
            <span className="hidden sm:inline-flex rounded-full bg-linear-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{currentPrice.toFixed(0)}</span>
            {testOriginalPrice > currentPrice && (
              <span className="text-lg text-gray-500 line-through dark:text-gray-400">₹{testOriginalPrice.toFixed(0)}</span>
            )}
          </div>
          {testDiscount > 0 && testSavingsAmount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                You Save: ₹{Math.round(testSavingsAmount)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({testDiscount}% discount)
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* Hide Buy Now on small screens to make card tappable and save space */}
          <MagneticButton
            variant="gradient"
            size="md"
            className="hidden sm:flex w-full justify-center rounded-2xl relative"
            onClick={() => window.location.href = `/checkout?productId=${product.id}&quantity=1&type=buynow`}
          >
            <div className="flex items-center gap-2">
              <span>Buy Now</span>
            </div>
          </MagneticButton>

          {/* Make cart button full width on mobile, compact on sm+ */}
          <MagneticButton
            variant="secondary"
            size="md"
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-gray-300/50 bg-gray-100/80 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-200/80 hover:text-gray-900 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/40 dark:hover:bg-white/20 dark:hover:text-white sm:w-12 relative"
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToCart}
            disabled={cartLoading}
            aria-label="Quick add to cart"
          >
            {cartLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
