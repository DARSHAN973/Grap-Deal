'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const ProductCarousel = ({ products = [], autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  if (!products.length) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 },
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            <ProductSlide product={products[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
        </motion.button>

        {/* Progress Bar */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/20 rounded-full h-1 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: interval / 1000, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Thumbnail Preview */}
      <div className="mt-8 flex justify-center space-x-4 overflow-x-auto pb-4">
        {products.map((product, index) => (
          <motion.div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? 'ring-4 ring-blue-500 scale-110'
                : 'opacity-60 hover:opacity-100'
            }`}
            whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <ShoppingCart size={24} className="text-gray-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProductSlide = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl w-full">
        {/* Product Image */}
        <motion.div
          className="relative aspect-square bg-white dark:bg-gray-100 rounded-2xl shadow-2xl overflow-hidden"
          whileHover={{ rotateY: 10, rotateX: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ perspective: '1000px' }}
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
            <ShoppingCart size={80} className="text-white" />
          </div>
          
          {/* Wishlist Button */}
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              size={20} 
              className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </motion.button>

          {/* Sale Badge */}
          {product.originalPrice && (
            <motion.div
              className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              SALE
            </motion.div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Product Name */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            whileHover={{ scale: 1.02 }}
          >
            {product.name}
          </motion.h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {product.description || "Experience premium quality and exceptional design with this carefully crafted product."}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <motion.span
              className="text-4xl font-bold text-gray-900 dark:text-white"
              whileHover={{ scale: 1.1 }}
            >
              ${product.price}
            </motion.span>
            {product.originalPrice && (
              <span className="text-2xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex space-x-4">
            <MagneticButton variant="gradient" size="lg" className="flex-1">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </MagneticButton>
            <MagneticButton variant="secondary" size="lg">
              <span>Quick View</span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCarousel;