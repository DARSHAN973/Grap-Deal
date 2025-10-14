'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const ProductCard = ({ 
  product = {
    id: 1,
    name: "Premium Headphones",
    price: 299,
    originalPrice: 399,
    image: "/api/placeholder/300/300",
    hoverImage: "/api/placeholder/300/300",
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    brand: "TechSound",
    vendor: "TechStore",
    isNew: false,
    isFeatured: false,
    isTrending: false,
    isHot: false,
    tags: ["Electronics"]
  }
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform-gpu"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        {/* Product Tag */}
        {(product.isNew || product.isFeatured || product.isTrending || product.isHot) && (
          <motion.div
            className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {product.isNew ? 'New' : product.isFeatured ? 'Featured' : product.isTrending ? 'Trending' : 'Hot'}
          </motion.div>
        )}

        {/* Wishlist Button */}
        <motion.button
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          onClick={() => setIsLiked(!isLiked)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
          />
        </motion.button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Product Image */}
          <div className="relative w-full h-full">
            <img
              src={isHovered && product.hoverImage ? product.hoverImage : product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => {
                e.target.src = '/api/placeholder/300/300';
              }}
            />
            
            {/* Brand overlay */}
            {product.brand && (
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {product.brand}
              </div>
            )}
          </div>

          {/* Hover Actions */}
          <motion.div
            className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye size={20} className="text-gray-700" />
            </motion.button>
            
            <motion.button
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, backgroundColor: '#3b82f6' }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} className="text-white" />
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Product Name */}
          <motion.h3
            className="text-lg font-bold text-gray-900 dark:text-white mb-1"
            whileHover={{ color: '#3b82f6' }}
          >
            {product.name}
          </motion.h3>

          {/* Vendor and Category */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>by {product.vendor}</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
              {product.category}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <motion.span
              className="text-2xl font-bold text-gray-900 dark:text-white"
              whileHover={{ scale: 1.05 }}
            >
              ${product.price}
            </motion.span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <motion.span
                className="text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </motion.span>
            )}
          </div>

          {/* Add to Cart Button */}
          <MagneticButton
            className="w-full group"
            variant="primary"
          >
            <ShoppingCart size={18} className="group-hover:animate-bounce" />
            <span>Add to Cart</span>
            <motion.div
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </MagneticButton>
        </div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{ x: isHovered ? ['0%', '100%'] : '0%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;