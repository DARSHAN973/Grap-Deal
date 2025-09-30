'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Shirt,
  Home,
  Heart,
  Gamepad2,
  Car,
  Laptop,
  Watch,
  Camera,
  Headphones,
  Gift,
  Sparkles,
  TrendingUp,
  Flame,
  Package,
  ArrowRight,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Simplified categories data focused on core categories
const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    productCount: 156,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    icon: Smartphone,
    isHot: true,
    badge: 'Hot',
    badgeColor: 'bg-red-500',
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    productCount: 203,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
    icon: Shirt,
    isTrending: true,
    badge: 'Trending',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    productCount: 184,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    icon: Home,
    badge: 'New',
    badgeColor: 'bg-green-500',
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    productCount: 127,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    icon: Heart,
  },
  {
    id: 5,
    name: 'Gaming',
    slug: 'gaming',
    productCount: 94,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    icon: Gamepad2,
    isNew: true,
    badge: 'New',
    badgeColor: 'bg-green-500',
  },
  {
    id: 6,
    name: 'Automotive',
    slug: 'automotive',
    productCount: 78,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80',
    icon: Car,
  },
  {
    id: 7,
    name: 'Computers',
    slug: 'computers',
    productCount: 142,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80',
    icon: Laptop,
    isTrending: true,
    badge: 'Trending',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 8,
    name: 'Watches',
    slug: 'watches',
    productCount: 89,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    icon: Watch,
  },
  {
    id: 9,
    name: 'Cameras',
    slug: 'cameras',
    productCount: 67,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=600&q=80',
    icon: Camera,
  },
  {
    id: 10,
    name: 'Audio',
    slug: 'audio',
    productCount: 134,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    icon: Headphones,
    isHot: true,
    badge: 'Hot',
    badgeColor: 'bg-red-500',
  },
];

// Featured categories for promotional banners
const featuredCategories = [
  {
    id: 1,
    title: 'Electronics Sale',
    subtitle: 'Up to 50% OFF',
    description: 'Latest smartphones, laptops, and gadgets at unbeatable prices',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Shop Electronics',
    gradient: 'from-blue-600/90 to-purple-600/90',
  },
  {
    id: 2,
    title: 'Fashion Collection',
    subtitle: 'Trending Now',
    description: 'Discover the latest fashion trends and timeless classics',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore Fashion',
    gradient: 'from-pink-600/90 to-rose-600/90',
  },
];

// Filter options
const filterPills = [
  { id: 'all', label: 'All Categories' },
  { id: 'trending', label: 'Trending' },
  { id: 'new', label: 'New' },
  { id: 'hot', label: 'Hot' },
  { id: 'popular', label: 'Popular' },
];

const CategoryCard = ({ category, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100 + index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  useGSAP(() => {
    if (!isLoading && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power2.out',
        }
      );
    }
  }, [isLoading, index]);

  if (isLoading) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse">
        <div className="aspect-square bg-gradient-to-br from-gray-300/50 to-gray-400/50 dark:from-gray-700/50 dark:to-gray-600/50" />
        <div className="absolute inset-0 flex items-end p-4">
          <div className="w-full space-y-2">
            <div className="h-4 bg-white/70 dark:bg-gray-600/70 rounded w-3/4" />
            <div className="h-3 bg-white/50 dark:bg-gray-600/50 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Badge */}
      {category.badge && (
        <div className="absolute left-3 top-3 z-20">
          <motion.span
            className={`flex items-center gap-1 rounded-full ${category.badgeColor} px-2 py-1 text-xs font-bold text-white shadow-lg`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            {category.badge === 'Hot' && <Flame className="h-3 w-3" />}
            {category.badge === 'Trending' && <TrendingUp className="h-3 w-3" />}
            {category.badge === 'New' && <Sparkles className="h-3 w-3" />}
            {category.badge}
          </motion.span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-4">
        <div className="w-full text-white">
          <div className="flex items-center gap-2 mb-2">
            <category.icon className="h-5 w-5" />
            <span className="text-sm opacity-90">{category.productCount}+ products</span>
          </div>
          <h3 className="text-xl font-bold leading-tight mb-1">
            {category.name}
          </h3>
          
          {/* Hover CTA */}
          <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedBanner = ({ category, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Content */}
        <div className="relative z-20 flex flex-1 items-center p-8 lg:p-12">
          <div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Gift className="h-4 w-4" />
              {category.subtitle}
            </motion.span>
            
            <motion.h2
              className="mt-4 text-3xl font-bold text-white lg:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {category.title}
            </motion.h2>
            
            <motion.p
              className="mt-3 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {category.description}
            </motion.p>
            
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton
                variant="secondary"
                size="lg"
                className="bg-white/95 text-gray-900 shadow-xl hover:bg-white"
              >
                <ArrowRight className="h-5 w-5" />
                {category.ctaText}
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Image */}
        <div className="relative lg:flex-1">
          <div className="aspect-[16/10] lg:aspect-[4/3]">
            <img
              src={category.image}
              alt={category.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategoriesPage = () => {
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const heroRef = useRef(null);

  // GSAP animations for hero section
  useGSAP(() => {
    if (heroRef.current) {
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
    }
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = categories;

    if (selectedFilter !== 'all') {
      filtered = categories.filter(category => {
        switch (selectedFilter) {
          case 'trending':
            return category.isTrending;
          case 'new':
            return category.isNew;
          case 'hot':
            return category.isHot;
          case 'popular':
            return category.productCount > 150;
          default:
            return true;
        }
      });
    }

    setFilteredCategories(filtered);
  }, [selectedFilter]);

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* 1️⃣ Hero / Header */}
      <section ref={heroRef} className="relative overflow-hidden pb-16 pt-28">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/15 to-sky-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1400px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">
          <div className="space-y-6">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
              <Package className="h-4 w-4 text-violet-500" />
              Shop by Category
            </span>
            
            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Shop by Category
            </h1>
            
            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 lg:text-xl">
              Explore trending collections across Fashion, Electronics, Beauty & more
            </p>

            {/* Quick Stats */}
            <div className="hero-stats flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Filter Pills */}
      <section className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-gray-800/50 dark:bg-gray-950/80">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 py-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-wrap justify-center gap-3">
            {filterPills.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/90 text-gray-700 hover:bg-gray-100 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2️⃣ Categories Grid */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Browse Categories
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Find exactly what you're looking for
            </p>
          </motion.div>

          {/* Responsive Grid: 2 → 3-4 → 5-6 columns */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No categories found</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try selecting a different filter
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3️⃣ Featured Categories / Banners */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Featured Collections
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Don't miss out on these amazing deals
            </p>
          </motion.div>

          <div className="space-y-8">
            {featuredCategories.map((category, index) => (
              <FeaturedBanner key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;