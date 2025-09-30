'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Generate 24+ products
const generateProducts = () => {
  const baseProducts = [
    {
      name: 'Velocity Hero Stack',
      price: 249,
      originalPrice: 349,
      rating: 4.9,
      reviews: 182,
      tag: 'Launch Ready',
      category: 'Templates',
      brand: 'GrapDeal',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
      isNew: true,
      isTrending: true,
      description: 'Complete hero section with modern animations.',
    },
    {
      name: 'Trending Rail OS',
      price: 199,
      originalPrice: 259,
      rating: 4.8,
      reviews: 136,
      tag: 'New',
      category: 'Components',
      brand: 'GrapDeal',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80',
      isNew: true,
      description: 'Advanced trending slider with auto-scroll.',
    },
    {
      name: 'Creator Partner Kit',
      price: 289,
      originalPrice: 329,
      rating: 4.7,
      reviews: 98,
      tag: 'Collab',
      category: 'Kits',
      brand: 'GrapDeal',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
      isTrending: true,
      description: 'Collaborative toolkit for creator partnerships.',
    },
    {
      name: 'Localization Toolkit',
      price: 159,
      originalPrice: 219,
      rating: 4.8,
      reviews: 154,
      tag: 'Global',
      category: 'Tools',
      brand: 'GrapDeal',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      description: 'Multi-language support and currency tools.',
    },
    {
      name: 'Merch Automation Web',
      price: 329,
      originalPrice: 399,
      rating: 5.0,
      reviews: 211,
      tag: 'Bestseller',
      category: 'Automation',
      brand: 'GrapDeal',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
      isTrending: true,
      description: 'Automated merchandise management system.',
    },
    {
      name: 'Analytics Dashboard',
      price: 189,
      originalPrice: 0,
      rating: 4.6,
      reviews: 76,
      tag: 'Limited',
      category: 'Analytics',
      brand: 'GrapDeal',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&q=80',
      description: 'Advanced analytics for customer retention.',
    },
  ];

  const allProducts = [];
  for (let i = 0; i < 4; i++) {
    baseProducts.forEach((product, index) => {
      allProducts.push({
        ...product,
        id: i * baseProducts.length + index + 1,
        name: `${product.name} ${i > 0 ? `Pro ${i + 1}` : ''}`,
        price: product.price + (i * 20),
        originalPrice: product.originalPrice > 0 ? product.originalPrice + (i * 25) : 0,
      });
    });
  }
  
  return allProducts;
};

const allProducts = generateProducts();
const categories = ['All', 'Templates', 'Components', 'Kits', 'Tools', 'Automation', 'Analytics'];
const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'New Arrivals' },
];

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
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort logic
  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-28">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/15 to-sky-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Products Collection
            </span>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Shop Everything You Love
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              From trending drops to daily essentials — grab them while they last.
            </p>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 pt-6">
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
          </motion.div>
        </div>
      </section>

      {/* Filters & Search Section */}
      <section className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-gray-950/80">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 py-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300/50 bg-white/90 py-2 pl-10 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/20 dark:bg-gray-900/90 dark:text-white"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Toggle */}
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                  isFiltersOpen
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                    : 'border-gray-300/50 bg-white/90 text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:bg-gray-900/90 dark:text-gray-300 dark:hover:bg-gray-800/90'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-300/50 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/20 dark:bg-gray-900/90 dark:text-gray-300"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex rounded-xl border border-gray-300/50 bg-white/90 dark:border-white/20 dark:bg-gray-900/90">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-l-xl p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-r-xl p-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Filters */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-200/50 pt-6 dark:border-white/10"
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {/* Categories */}
                  <div className="space-y-4 rounded-xl border border-gray-200/50 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Categories</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4 rounded-xl border border-gray-200/50 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Price Range</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full accent-blue-500"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>₹0</span>
                        <span className="font-medium">₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="space-y-4 rounded-xl border border-gray-200/50 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Quick Filters</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">New Arrivals</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">On Sale</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Top Rated</span>
                      </label>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-4 rounded-xl border border-gray-200/50 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-700 dark:text-gray-300">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Products Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "space-y-4"
          }>
            {currentProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
            ))}
          </div>

          {/* Marketing Banner */}
          {currentPage === 1 && filteredProducts.length >= 8 && (
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </section>

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