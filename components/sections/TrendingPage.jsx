'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Star,
  Heart,
  ShoppingCart,
  TrendingUp,
  Flame,
  Sparkles,
  Eye,
  Users,
  Clock,
  AlertTriangle,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

// Trending products with comprehensive data
const trendingProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    currentPrice: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    badge: 'Hot',
    badgeColor: 'bg-red-500',
    category: 'Electronics',
    rating: 4.9,
    reviews: 2847,
    unitsSold: 1284,
    timeFrame: 'this week',
    trendingRank: 1,
    rankCategory: 'Electronics',
    discount: 8,
    stockCount: 7,
    isLowStock: true,
    dealEndsIn: { hours: 12, minutes: 34, seconds: 56 },
    growth: '+23%',
    isWishlisted: false,
    colors: ['Space Black', 'Natural Titanium', 'White Titanium'],
  },
  {
    id: 2,
    name: 'Samsung Galaxy Watch 6',
    currentPrice: 329,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?auto=format&fit=crop&w=600&q=80',
    badge: 'Trending',
    badgeColor: 'bg-orange-500',
    category: 'Wearables',
    rating: 4.7,
    reviews: 1532,
    unitsSold: 892,
    timeFrame: 'this week',
    trendingRank: 2,
    rankCategory: 'Wearables',
    discount: 18,
    stockCount: 15,
    isLowStock: false,
    dealEndsIn: { hours: 8, minutes: 15, seconds: 42 },
    growth: '+45%',
    isWishlisted: false,
    colors: ['Graphite', 'Pink Gold', 'Silver'],
  },
  {
    id: 3,
    name: 'Nike Air Jordan 1 Retro',
    currentPrice: 179,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    badge: 'Limited',
    badgeColor: 'bg-purple-500',
    category: 'Fashion',
    rating: 4.8,
    reviews: 967,
    unitsSold: 634,
    timeFrame: 'this week',
    trendingRank: 1,
    rankCategory: 'Fashion',
    discount: 19,
    stockCount: 3,
    isLowStock: true,
    dealEndsIn: { hours: 23, minutes: 7, seconds: 18 },
    growth: '+67%',
    isWishlisted: false,
    colors: ['Black/Red', 'White/Blue', 'Gray/Green'],
  },
  {
    id: 4,
    name: 'MacBook Pro 14" M3',
    currentPrice: 1799,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    badgeColor: 'bg-green-500',
    category: 'Computers',
    rating: 4.9,
    reviews: 1245,
    unitsSold: 456,
    timeFrame: 'this week',
    trendingRank: 1,
    rankCategory: 'Computers',
    discount: 10,
    stockCount: 12,
    isLowStock: false,
    dealEndsIn: { hours: 48, minutes: 30, seconds: 22 },
    growth: '+89%',
    isWishlisted: false,
    colors: ['Space Gray', 'Silver'],
  },
  {
    id: 5,
    name: 'AirPods Pro (3rd Gen)',
    currentPrice: 249,
    originalPrice: 279,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    badge: 'Hot',
    badgeColor: 'bg-red-500',
    category: 'Audio',
    rating: 4.8,
    reviews: 3421,
    unitsSold: 2156,
    timeFrame: 'this week',
    trendingRank: 1,
    rankCategory: 'Audio',
    discount: 11,
    stockCount: 8,
    isLowStock: true,
    dealEndsIn: { hours: 6, minutes: 45, seconds: 33 },
    growth: '+34%',
    isWishlisted: false,
    colors: ['White'],
  },
  {
    id: 6,
    name: 'Sony PlayStation 5',
    currentPrice: 499,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    badge: 'Trending',
    badgeColor: 'bg-orange-500',
    category: 'Gaming',
    rating: 4.9,
    reviews: 5678,
    unitsSold: 3421,
    timeFrame: 'this week',
    trendingRank: 1,
    rankCategory: 'Gaming',
    discount: 17,
    stockCount: 2,
    isLowStock: true,
    dealEndsIn: { hours: 18, minutes: 22, seconds: 11 },
    growth: '+156%',
    isWishlisted: false,
    colors: ['White', 'Black'],
  },
  {
    id: 7,
    name: 'Dyson V15 Detect',
    currentPrice: 649,
    originalPrice: 749,
    image: 'https://images.unsplash.com/photo-1558618047-e8e5ca8c3299?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    badgeColor: 'bg-green-500',
    category: 'Home',
    rating: 4.7,
    reviews: 892,
    unitsSold: 234,
    timeFrame: 'this week',
    trendingRank: 2,
    rankCategory: 'Home',
    discount: 13,
    stockCount: 18,
    isLowStock: false,
    dealEndsIn: { hours: 72, minutes: 15, seconds: 8 },
    growth: '+78%',
    isWishlisted: false,
    colors: ['Yellow/Nickel', 'Red/Nickel'],
  },
  {
    id: 8,
    name: 'Tesla Model Y Accessories',
    currentPrice: 89,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
    badge: 'Limited',
    badgeColor: 'bg-purple-500',
    category: 'Automotive',
    rating: 4.6,
    reviews: 445,
    unitsSold: 167,
    timeFrame: 'this week',
    trendingRank: 3,
    rankCategory: 'Automotive',
    discount: 31,
    stockCount: 5,
    isLowStock: true,
    dealEndsIn: { hours: 35, minutes: 42, seconds: 55 },
    growth: '+92%',
    isWishlisted: false,
    colors: ['Black', 'White', 'Carbon Fiber'],
  },
];

// Countdown Timer Component
const CountdownTimer = ({ dealEndsIn }) => {
  const [timeLeft, setTimeLeft] = useState(dealEndsIn);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
      <Clock className="h-3 w-3" />
      <span className="font-mono">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

// Enhanced Product Card Component
const TrendingProductCard = ({ product, index }) => {
  const [currentImage, setCurrentImage] = useState(product.image);
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/95 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Badge & Ranking */}
      <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
        <span className={`flex items-center gap-1 rounded-full ${product.badgeColor} px-2 py-1 text-xs font-bold text-white shadow-lg`}>
          {product.badge === 'Hot' && <Flame className="h-3 w-3" />}
          {product.badge === 'Trending' && <TrendingUp className="h-3 w-3" />}
          {product.badge === 'New' && <Sparkles className="h-3 w-3" />}
          {product.badge === 'Limited' && <Zap className="h-3 w-3" />}
          {product.badge}
        </span>
        
        <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white">
          #{product.trendingRank} in {product.rankCategory}
        </span>
      </div>

      {/* Wishlist & Growth */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 transition-all hover:bg-white hover:text-red-500 dark:bg-gray-900/90 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-red-500"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
        
        <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
          {product.growth}
        </span>
      </div>

      {/* Low Stock Alert */}
      {product.isLowStock && (
        <div className="absolute bottom-3 right-3 z-20">
          <span className="flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
            <AlertTriangle className="h-3 w-3" />
            Only {product.stockCount} left!
          </span>
        </div>
      )}

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
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
              -{product.discount}% OFF
            </span>
          </div>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex gap-3">
            <MagneticButton
              variant="secondary"
              size="sm"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </MagneticButton>
            <MagneticButton
              variant="primary"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Name & Category */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <Users className="h-4 w-4" />
            <span className="font-medium">{product.unitsSold} sold {product.timeFrame}</span>
          </div>
          <CountdownTimer dealEndsIn={product.dealEndsIn} />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.currentPrice}
            </span>
            {product.originalPrice > product.currentPrice && (
              <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Colors:</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, idx) => (
              <div
                key={idx}
                className="h-4 w-4 rounded-full border border-gray-300 bg-linear-to-br from-gray-300 to-gray-500"
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <MagneticButton
          variant="gradient"
          className="w-full justify-center"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart - ${product.currentPrice}
        </MagneticButton>
      </div>
    </motion.div>
  );
};

// Carousel Navigation
const CarouselNav = ({ onPrev, onNext, canGoPrev, canGoNext }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/50 bg-white/90 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/20 dark:bg-gray-900/90 dark:text-gray-400 dark:hover:bg-gray-800/90"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/50 bg-white/90 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/20 dark:bg-gray-900/90 dark:text-gray-400 dark:hover:bg-gray-800/90"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const TrendingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef();
  
  const itemsPerView = isMobile ? 1 : 4;
  const maxSlides = Math.max(0, trendingProducts.length - itemsPerView);

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
    .from('.hero-stats', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.4');
  }, { scope: heroRef });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pb-16 pt-28">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-linear-to-br from-orange-500/20 via-red-500/15 to-pink-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-linear-to-br from-yellow-400/15 to-orange-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-linear-to-br from-red-500/20 to-pink-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">
          <div className="space-y-6">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-orange-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-orange-700 shadow-sm backdrop-blur dark:border-orange-800/20 dark:bg-orange-950/20 dark:text-orange-200">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              Trending Products
            </span>
            
            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              What's Hot Right Now
            </h1>
            
            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Discover the most popular products flying off our shelves. Real-time data, customer favorites, and limited-time deals.
            </p>

            {/* Live Stats */}
            <div className="hero-stats flex items-center justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {trendingProducts.reduce((sum, p) => sum + p.unitsSold, 0).toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Units Sold This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">Live</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Real-time Data</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">Limited</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Offers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Section Header */}
          <motion.div
            className="mb-12 flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Trending Products
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Updated every hour • Based on sales, views, and customer behavior
              </p>
            </div>
            
            <CarouselNav
              onPrev={prevSlide}
              onNext={nextSlide}
              canGoPrev={currentSlide > 0}
              canGoNext={currentSlide < maxSlides}
            />
          </motion.div>

          {/* Products Carousel/Grid */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentSlide * (isMobile ? 100 : 25) + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {trendingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`shrink-0 ${isMobile ? 'w-full' : 'w-1/4'}`}
                >
                  <TrendingProductCard product={product} index={index} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* View All Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton
              variant="outline"
              size="lg"
              className="border-orange-300 text-orange-700 hover:border-orange-500 hover:text-orange-800 dark:border-orange-600 dark:text-orange-300 dark:hover:border-orange-400 dark:hover:text-orange-200"
            >
              <ArrowRight className="h-5 w-5" />
              View All Trending Products
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics Summary */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="rounded-3xl border border-orange-200/50 bg-linear-to-br from-orange-50 to-red-50 p-8 text-center dark:border-orange-800/50 dark:from-orange-950/20 dark:to-red-950/20 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              Real-Time Trending Insights
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Our trending algorithm analyzes purchase behavior, search patterns, and social signals to surface the hottest products.
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">15K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Daily Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2.3M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">Real-time</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Data Updates</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default TrendingPage;