'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Search,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  Zap,
  Sparkles,
  SlidersHorizontal,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

// Generate 24+ products organized by categories
const generateProducts = () => {
  const categoryProducts = {
    'Fashion': [
      {
        name: 'Trendy Summer Dress',
        price: 299,
        originalPrice: 399,
        rating: 4.8,
        reviews: 145,
        tag: 'New Arrival',
        category: 'Fashion',
        brand: 'StyleHub',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        isNew: true,
        description: 'Comfortable summer dress with floral patterns.',
      },
      {
        name: 'Designer Handbag',
        price: 199,
        originalPrice: 259,
        rating: 4.9,
        reviews: 203,
        tag: 'Trending',
        category: 'Fashion',
        brand: 'LuxeBags',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
        isTrending: true,
        description: 'Elegant designer handbag for every occasion.',
      },
      {
        name: 'Casual Sneakers',
        price: 149,
        originalPrice: 199,
        rating: 4.7,
        reviews: 189,
        tag: 'Hot Deal',
        category: 'Fashion',
        brand: 'ComfortWalk',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
        description: 'Comfortable sneakers for daily wear.',
      },
      {
        name: 'Denim Jacket',
        price: 179,
        originalPrice: 229,
        rating: 4.6,
        reviews: 167,
        tag: 'Trending',
        category: 'Fashion',
        brand: 'DenimCo',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
        isTrending: true,
        description: 'Classic denim jacket with modern fit.',
      },
    ],
    'Electronics': [
      {
        name: 'Wireless Earbuds Pro',
        price: 249,
        originalPrice: 329,
        rating: 4.9,
        reviews: 312,
        tag: 'Bestseller',
        category: 'Electronics',
        brand: 'AudioTech',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
        isTrending: true,
        description: 'Premium wireless earbuds with noise cancellation.',
      },
      {
        name: 'Smart Watch Series 5',
        price: 399,
        originalPrice: 499,
        rating: 4.8,
        reviews: 234,
        tag: 'Hot Deal',
        category: 'Electronics',
        brand: 'TechTime',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?auto=format&fit=crop&w=600&q=80',
        description: 'Advanced smartwatch with health monitoring.',
      },
      {
        name: 'Portable Speaker',
        price: 89,
        originalPrice: 129,
        rating: 4.7,
        reviews: 156,
        tag: 'New',
        category: 'Electronics',
        brand: 'SoundWave',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
        isNew: true,
        description: 'Compact portable speaker with rich bass.',
      },
      {
        name: 'Gaming Mouse RGB',
        price: 69,
        originalPrice: 99,
        rating: 4.8,
        reviews: 145,
        tag: 'Gaming',
        category: 'Electronics',
        brand: 'GameGear',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
        description: 'High-precision gaming mouse with RGB lighting.',
      },
    ],
    'Beauty & Personal Care': [
      {
        name: 'Vitamin C Serum',
        price: 59,
        originalPrice: 79,
        rating: 4.9,
        reviews: 278,
        tag: 'Bestseller',
        category: 'Beauty & Personal Care',
        brand: 'GlowUp',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=80',
        isTrending: true,
        description: 'Anti-aging vitamin C serum for glowing skin.',
      },
      {
        name: 'Hair Styling Kit',
        price: 129,
        originalPrice: 169,
        rating: 4.7,
        reviews: 189,
        tag: 'New',
        category: 'Beauty & Personal Care',
        brand: 'HairCraft',
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
        isNew: true,
        description: 'Complete hair styling kit with premium tools.',
      },
      {
        name: 'Natural Face Mask',
        price: 39,
        originalPrice: 49,
        rating: 4.6,
        reviews: 167,
        tag: 'Organic',
        category: 'Beauty & Personal Care',
        brand: 'PureSkin',
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80',
        description: 'Hydrating face mask with natural ingredients.',
      },
      {
        name: 'Premium Makeup Brush Set',
        price: 89,
        originalPrice: 119,
        rating: 4.8,
        reviews: 234,
        tag: 'Professional',
        category: 'Beauty & Personal Care',
        brand: 'MakeupPro',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1583241800057-28a48c8da556?auto=format&fit=crop&w=600&q=80',
        description: 'Professional makeup brush set for flawless application.',
      },
    ],
    'Mobile & Gadgets': [
      {
        name: 'iPhone 15 Pro',
        price: 999,
        originalPrice: 1099,
        rating: 4.9,
        reviews: 567,
        tag: 'Latest',
        category: 'Mobile & Gadgets',
        brand: 'Apple',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
        isNew: true,
        description: 'Latest iPhone with advanced camera system.',
      },
      {
        name: 'Wireless Charger',
        price: 49,
        originalPrice: 69,
        rating: 4.7,
        reviews: 145,
        tag: 'Fast Charging',
        category: 'Mobile & Gadgets',
        brand: 'ChargeTech',
        image: 'https://images.unsplash.com/photo-1609712325389-79e4810e9706?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1558618047-e8e5ca8c3299?auto=format&fit=crop&w=600&q=80',
        description: 'Fast wireless charger for all devices.',
      },
      {
        name: 'Phone Case Premium',
        price: 29,
        originalPrice: 39,
        rating: 4.6,
        reviews: 189,
        tag: 'Protection',
        category: 'Mobile & Gadgets',
        brand: 'ShieldCase',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1560326183-52a1b56e6334?auto=format&fit=crop&w=600&q=80',
        description: 'Premium protection case with style.',
      },
      {
        name: 'Power Bank 20000mAh',
        price: 79,
        originalPrice: 99,
        rating: 4.8,
        reviews: 267,
        tag: 'High Capacity',
        category: 'Mobile & Gadgets',
        brand: 'PowerUp',
        image: 'https://images.unsplash.com/photo-1609592002720-de2da851b8f8?auto=format&fit=crop&w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
        isTrending: true,
        description: 'High-capacity power bank for extended use.',
      },
    ],
  };

  const allProducts = [];
  let id = 1;
  
  Object.entries(categoryProducts).forEach(([category, products]) => {
    products.forEach(product => {
      allProducts.push({ ...product, id: id++ });
    });
  });
  
  return { allProducts, categoryProducts };
};

const { allProducts, categoryProducts } = generateProducts();
const categories = ['All', 'Fashion', 'Electronics', 'Beauty & Personal Care', 'Mobile & Gadgets'];

// Create trending products from all categories
const getTrendingProducts = () => {
  return allProducts.filter(product => product.isTrending || product.isNew).slice(0, 6);
};

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'New Arrivals' },
];

// Category Section Component
const CategorySection = ({ title, products, badge, showAll = false }) => {
  const [visibleProducts, setVisibleProducts] = useState(showAll ? products : products.slice(0, 4));
  const [showMore, setShowMore] = useState(!showAll && products.length > 4);

  const loadMore = () => {
    setVisibleProducts(products);
    setShowMore(false);
  };

  return (
    <section className="relative py-12">
      <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {title}
            </h2>
            {badge && (
              <span className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-semibold text-white">
                {badge}
              </span>
            )}
          </div>
          
          {showMore && (
            <button
              onClick={loadMore}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All →
            </button>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} viewMode="grid" />
          ))}
        </div>

        {/* Load More Button */}
        {showMore && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MagneticButton
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
              Load More Products
            </MagneticButton>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Marketing Banner Component
const MarketingBanner = ({ title, subtitle, description, ctaText, gradient, delay = 0 }) => {
  return (
    <motion.section
      className="relative py-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${gradient} p-8 text-center text-white lg:p-12`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute right-1/4 bottom-1/4 h-24 w-24 rounded-full bg-white/20 blur-xl" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
              {subtitle}
            </span>
            <h3 className="text-2xl font-bold lg:text-3xl">{title}</h3>
            <p className="mx-auto max-w-2xl text-white/90">{description}</p>
            <div className="pt-2">
              <MagneticButton
                variant="secondary"
                size="lg"
                className="bg-white/95 text-gray-900 hover:bg-white"
              >
                {ctaText}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const PRODUCTS_PER_PAGE = 12;

const ProductCard = ({ product, index, viewMode }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);

  const discount = product.originalPrice > 0 ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  if (viewMode === 'list') {
    return (
      <motion.div
        className="flex flex-col gap-4 rounded-2xl border border-gray-200/50 bg-white/90 p-4 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        {/* Image */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
          <img
            src={currentImage}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          {(product.isNew || product.isTrending || discount > 0) && (
            <div className="absolute left-1 top-1 flex flex-wrap gap-1">
              {product.isNew && (
                <span className="rounded bg-green-500 px-1 py-0.5 text-xs font-semibold text-white">
                  NEW
                </span>
              )}
              {discount > 0 && (
                <span className="rounded bg-red-500 px-1 py-0.5 text-xs font-semibold text-white">
                  -{discount}%
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">{product.category}</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {product.tag}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                {product.originalPrice > 0 && (
                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-500"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <MagneticButton variant="gradient" size="sm">
                <ShoppingCart className="h-4 w-4" />
                Add
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Product Badge */}
      {(product.isNew || product.isTrending || discount > 0) && (
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1">
          {product.isNew && (
            <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
              NEW
            </span>
          )}
          {product.isTrending && (
            <span className="rounded-full bg-orange-500 px-2 py-1 text-xs font-semibold text-white">
              TRENDING
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 transition-all hover:bg-white hover:text-red-500 dark:bg-gray-900/90 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-red-500"
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div
        className="relative aspect-square overflow-hidden"
        onMouseEnter={() => product.hoverImage && setCurrentImage(product.hoverImage)}
        onMouseLeave={() => setCurrentImage(product.image)}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <MagneticButton
            variant="secondary"
            size="sm"
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <ShoppingCart className="h-4 w-4" />
            Quick Add
          </MagneticButton>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{product.category}</span>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {product.tag}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
          {product.originalPrice > 0 && (
            <span className="text-sm text-gray-500 line-through dark:text-gray-400">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <MagneticButton
          variant="gradient"
          className="w-full justify-center"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </MagneticButton>
      </div>
    </motion.div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300/50 bg-white/90 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/20 dark:bg-gray-900/90 dark:text-gray-400 dark:hover:bg-gray-800/90"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
          disabled={pageNumber === '...'}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
            pageNumber === currentPage
              ? 'border-blue-500 bg-blue-500 text-white'
              : pageNumber === '...'
              ? 'border-transparent text-gray-400 cursor-default'
              : 'border-gray-300/50 bg-white/90 text-gray-600 hover:bg-gray-50 dark:border-white/20 dark:bg-gray-900/90 dark:text-gray-400 dark:hover:bg-gray-800/90'
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300/50 bg-white/90 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/20 dark:bg-gray-900/90 dark:text-gray-400 dark:hover:bg-gray-800/90"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    })
    .from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.6')
    .from('.hero-filters', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-stats', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.3');
  }, { scope: heroRef });

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pb-16 pt-28">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/15 to-sky-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">
          <div className="space-y-6">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Products Collection
            </span>
            
            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Explore Our Collections
            </h1>
            
            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Find trending products, hot deals, and new arrivals in every category
            </p>
            
            {/* Quick Filter Buttons */}
            <div className="hero-filters flex flex-wrap items-center justify-center gap-3 pt-4">
              {['Trending', 'New Arrivals', 'Hot Deals', 'Top Rated'].map((filter) => (
                <button
                  key={filter}
                  className="rounded-full border border-gray-300/50 bg-white/80 px-6 py-2 text-sm font-medium text-gray-700 backdrop-blur transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="hero-stats flex items-center justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{allProducts.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Search Bar */}
      <section className="relative py-8">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="mx-auto max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search all products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-300/50 bg-white/90 py-4 pl-12 pr-6 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-white/20 dark:bg-gray-900/90 dark:text-white"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category-Based Product Sections */}
      
      {/* Trending Products Section */}
      <CategorySection 
        title="Trending Now" 
        products={getTrendingProducts()} 
        badge="Hot" 
        showAll={true}
      />

      {/* Marketing Banner 1 */}
      <MarketingBanner
        title="Up to 50% Off on Hot Deals"
        subtitle="Limited Time"
        description="Don't miss out on amazing discounts across all categories"
        ctaText="Shop Hot Deals"
        gradient="from-red-500 to-pink-600"
      />

      {/* Fashion Section */}
      <CategorySection 
        title="Fashion & Style" 
        products={categoryProducts['Fashion']} 
        badge="New Arrivals"
      />

      {/* Electronics Section */}
      <CategorySection 
        title="Electronics & Gadgets" 
        products={categoryProducts['Electronics']} 
        badge="Trending"
      />

      {/* Marketing Banner 2 */}
      <MarketingBanner
        title="New Fashion Arrivals"
        subtitle="Spring Collection"
        description="Grab them before they sell out — fresh styles just dropped"
        ctaText="Explore Fashion"
        gradient="from-purple-500 to-indigo-600"
        delay={0.2}
      />

      {/* Beauty Section */}
      <CategorySection 
        title="Beauty & Personal Care" 
        products={categoryProducts['Beauty & Personal Care']} 
        badge="Best Sellers"
      />

      {/* Mobile & Gadgets Section */}
      <CategorySection 
        title="Mobile & Gadgets" 
        products={categoryProducts['Mobile & Gadgets']} 
        badge="Latest Tech"
      />

      {/* Final Marketing Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-16 rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center dark:border-blue-800/50 dark:from-blue-950/20 dark:to-purple-950/20"
      >
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Truck className="h-5 w-5 text-blue-500" />
            <Shield className="h-5 w-5 text-green-500" />
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Free shipping on orders above ₹999
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Weekly drops: check out trending deals • Top-rated by thousands of happy customers
          </p>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </main>
  );
};

export default ProductsPage;