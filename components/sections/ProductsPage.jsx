'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { 
  Search, 
  Grid3X3, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp,
  Sparkles,
  Smartphone,
  Shirt,
  Home,
  Gamepad2,
  Dumbbell,
  Baby,
  Heart,
  Loader2
} from 'lucide-react';
import ProductCard from '../ui/ProductCard';

// Sort options
const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];
const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [pagination, setPagination] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const heroRef = useRef(null);

  // Fetch products from API
  const fetchProducts = async (page = 1, category = selectedCategory, search = searchQuery, sort = sortBy) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20', // Changed from 12 to 20
        sortBy: sort,
        status: 'ACTIVE'
      });
      
      if (category && category !== 'all') {
        params.append('category', category);
      }
      
      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setPagination(data.pagination);
        setTotalProducts(data.pagination.totalCount);
      } else {
        console.error('Failed to fetch products');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories');
        if (response.ok) {
          const data = await response.json();
          
          // Fetch total product count for "All Products"
          const totalProductsResponse = await fetch('/api/products?limit=1&status=ACTIVE');
          let totalCount = 0;
          if (totalProductsResponse.ok) {
            const totalData = await totalProductsResponse.json();
            totalCount = totalData.pagination?.totalCount || 0;
          }
          
          // Add "All Products" as first option with dynamic count
          const allOption = {
            id: 'all',
            name: 'All Products',
            slug: 'all',
            icon: 'Sparkles',
            productCount: totalCount,
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80',
            description: 'Browse all our products'
          };
          
          // Only show active categories with productCount
          const activeCategories = data.categories.filter(cat => cat.isActive);
          setCategories([allOption, ...activeCategories]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to static categories if API fails
        setCategories([
          { 
            id: 'all', 
            name: 'All Products', 
            slug: 'all', 
            icon: 'Sparkles', 
            productCount: 0,
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80',
            description: 'Browse all our products'
          }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when dependencies change
  useEffect(() => {
    fetchProducts(currentPage, selectedCategory, searchQuery, sortBy);
  }, [currentPage, selectedCategory, searchQuery, sortBy]);

  // Get icon component from string name
  const getIconComponent = (iconName) => {
    const iconMap = {
      Sparkles,
      Smartphone,
      Shirt,
      Home,
      Gamepad2,
      Dumbbell,
      Baby,
      Heart
    };
    return iconMap[iconName] || Sparkles;
  };

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    })
    .from('.hero-title', {
      duration: 0.8,
      y: 40,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.3');
  }, { scope: heroRef });

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Hero Section */}
  <section ref={heroRef} className="relative overflow-hidden pb-4 pt-6 sm:pb-8 sm:pt-28">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-linear-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-linear-to-br from-cyan-400/15 to-sky-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-linear-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
        </div>

  <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-3 text-center sm:px-6 lg:px-10 xl:px-16">
          <div className="space-y-6">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Browse Products
            </span>
            
            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Shop by Category
            </h1>
            
            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Discover amazing products across all categories with the best deals and quality
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
  <section className="relative py-4 sm:py-12">
  <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-3 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="text-center mb-4 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Browse Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from our wide range of product categories
            </p>
          </motion.div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 mb-6 sm:mb-10">
            {loadingCategories ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="rounded-2xl border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="h-24 w-full bg-gray-200 rounded-t-xl dark:bg-gray-700"></div>
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              categories.map((category, index) => {
                const IconComponent = getIconComponent(category.icon);
                const isActive = selectedCategory === category.id;
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentPage(1); // Reset to first page when changing category
                    }}
                    className={`group relative overflow-hidden rounded-2xl border-2 text-center transition-all duration-300 p-0 ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-105 dark:border-blue-400 dark:bg-blue-950/30'
                        : 'border-gray-200/50 bg-white/90 hover:border-blue-300 hover:shadow-md hover:scale-102 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-400'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Badge */}
                    {category.badge && (
                      <div className={`absolute top-2 right-2 z-10 rounded-full px-2 py-1 text-xs font-semibold text-white ${category.badgeColor}`}>
                        {category.badge}
                      </div>
                    )}

                    {/* Category Image */}
                    <div className="relative h-20 sm:h-24 w-full overflow-hidden rounded-t-xl">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                          <IconComponent className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      {/* Mobile overlay: show name & count on image to save space */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-2 sm:hidden">
                        <div className="w-full text-left">
                          <div className="text-sm font-semibold text-white leading-tight truncate">{category.name}</div>
                          <div className="text-[11px] text-white/80">{category.productCount} items</div>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent hidden sm:block" />

                      {/* Icon Overlay (desktop) */}
                      <div className={`absolute bottom-2 left-2 hidden sm:flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/90 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        <IconComponent className="h-3 w-3" />
                      </div>
                    </div>
                    {/* Category Info (desktop) */}
                    <div className="p-3 hidden sm:block">
                      {/* Category Name */}
                      <h3 className={`text-sm font-semibold transition-colors leading-tight mb-1 ${
                        isActive
                          ? 'text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400'
                      }`}>
                        {category.name}
                      </h3>

                      {/* Product Count */}
                      <p className={`text-xs transition-colors ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-blue-500'
                      }`}>
                        {category.productCount} items
                      </p>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Search and Filter Controls */}
  <section className="relative py-4 sm:py-8 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-3 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Search Bar */}
            <motion.div
              className="flex-1 max-w-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="w-full rounded-2xl border border-gray-300/50 bg-white/90 py-3 pl-12 pr-6 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-white/20 dark:bg-gray-900/90 dark:text-white"
                />
              </div>
            </motion.div>

            {/* Filter Controls */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* View Mode Toggle */}
              <div className="flex gap-1 rounded-xl border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                  List
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1); // Reset to first page when changing sort
                }}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Results Count */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {loading ? 'Loading...' : `${pagination.totalCount || 0} results`}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
  <section className="relative py-6 sm:py-12">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          
          {/* Section Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === 'all' 
                ? 'All Products' 
                : categories.find(cat => cat.id === selectedCategory)?.name || 'Products'
              }
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {loading ? 'Loading products...' : (
                <>
                  Showing {pagination.totalCount || 0} products
                  {searchQuery && ` for "${searchQuery}"`}
                </>
              )}
            </p>
          </motion.div>

          {/* Products Grid/List */}
          {loading ? (
            // Loading State
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Loading products...</span>
              </div>
            </div>
          ) : products.length === 0 ? (
            // No Results
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-gray-500 dark:text-gray-400">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p>Try adjusting your search or browse different categories</p>
              </div>
            </motion.div>
          ) : (
            // Products Grid
            <motion.div
              className={`${
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                    : 'space-y-4'
                }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Pagination Info */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, pagination.totalCount)} of {pagination.totalCount} products
                </p>
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      pageNum = i + 1;
                    } else if (currentPage >= pagination.totalPages - 3) {
                      pageNum = pagination.totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
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