'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Flame, Eye, ShoppingCart, Star } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { useCart } from '../providers/CartProvider';

const TrendingSlider = () => {
  const scrollContainerRef = useRef(null);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, loading: cartLoading, getItemCount } = useCart();

  // Handle add to cart
  const handleAddToCart = async (product, e) => {
    e?.stopPropagation(); // Prevent card click when clicking cart button
    if (cartLoading) return;
    
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

  // Handle navigation to product details
  const handleProductView = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  // Fetch trending products from database
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch('/api/products?productType=TRENDING&limit=10');
        const data = await response.json();
        
        if (data.success) {
          setTrendingProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  // Helper function to get accent gradient based on index
  const getAccentGradient = (index) => {
    const gradients = [
      'from-sky-500/25 via-blue-500/20 to-indigo-500/25',
      'from-amber-500/25 via-orange-500/20 to-rose-500/25', 
      'from-fuchsia-500/25 via-purple-500/20 to-violet-500/25',
      'from-emerald-500/25 via-teal-400/20 to-cyan-500/25',
      'from-rose-500/25 via-pink-500/20 to-purple-500/25'
    ];
    return gradients[index % gradients.length];
  };

  const highlightMetrics = [
    {
      id: 'metric-1',
      label: 'Top Discount',
      value: '50%',
    },
    {
      id: 'metric-2',
      label: 'Hot Sellers',
      value: '120+',
    },
    {
      id: 'metric-3',
      label: 'Top Rated',
      value: '4.8★',
    }
  ];

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    const scrollSpeed = 0.18;
    let animationFrameId;
    let lastTimestamp = 0;

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPausedRef.current && container.scrollWidth > container.clientWidth) {
        container.scrollLeft += delta * scrollSpeed;

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    const pause = () => {
      isPausedRef.current = true;
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };

    const resume = () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      resumeTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
        lastTimestamp = 0;
      }, 1800);
    };

    const handlePointerEnter = () => pause();
    const handlePointerLeave = () => resume();
    const handleFocusIn = () => pause();
    const handleFocusOut = () => resume();
    const handleWheel = () => pause();
    const handleTouchStart = () => pause();
    const handleTouchEnd = () => resume();

    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('focusout', handleFocusOut);
    container.addEventListener('wheel', handleWheel, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('focusout', handleFocusOut);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden bg-transparent pt-0 sm:pt-0 lg:pt-0">
        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 py-20 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading trending products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-0 sm:pt-0 lg:pt-0">
      <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 py-20 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles className="h-4 w-4 text-violet-500" />
              Trending Now
            </motion.span>
            <motion.h2
              className="mt-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-[2.85rem]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Fresh drops and hot deals — shop what's trending now
            </motion.h2>
            <motion.div
              className="mt-4 flex flex-wrap items-center gap-2 text-lg sm:text-xl lg:text-2xl font-semibold"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.45 }}
            >
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Fresh Drops.
              </motion.span>
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Daily Deals.
              </motion.span>
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Endless Finds
              </motion.span>
              <motion.span
                className="inline-block text-orange-500"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.4, type: "spring", stiffness: 300 }}
              >
                <motion.span
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                    scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  ✨
                </motion.span>
              </motion.span>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.5, ease: 'easeOut' }}
          >
            {highlightMetrics.map((metric) => (
              <div key={metric.id} className="flex flex-col gap-1.5 text-center text-gray-700 dark:text-gray-200">
                <span className="text-[0.7rem] uppercase tracking-[0.32em] text-gray-500 dark:text-gray-400">
                  {metric.label}
                </span>
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {metric.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 via-transparent to-transparent dark:from-gray-950" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 via-transparent to-transparent dark:from-gray-950" />

          <div
            ref={scrollContainerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
            tabIndex={0}
          >
            {trendingProducts.map((product, idx) => {
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
                testOriginalPrice = currentPrice * 1.25; // 25% markup
                testDiscount = 20;
                testSavingsAmount = testOriginalPrice - currentPrice;
              }
              
              // Debug log to see EXACT database values
              console.log('TrendingSlider - DB + TEST VALUES:', product.name, {
                dbPrice: product.price,
                dbOriginalPrice: product.originalPrice, 
                dbDiscount: product.discount,
                finalCurrentPrice: currentPrice,
                finalOriginalPrice: testOriginalPrice,
                finalDiscount: testDiscount,
                finalSavings: testSavingsAmount,
                usingTestData: !originalPrice || !discount
              });
              
              return (
                <motion.article
                  key={product.id}
                  className="group relative flex h-full min-h-[32rem] w-[calc(25%-18px)] shrink-0 snap-start flex-col overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/85 shadow-2xl backdrop-blur-[40px] transition-all hover:-translate-y-3 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.05] sm:w-[calc(25%-18px)] lg:w-[calc(25%-18px)] cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                  onClick={() => handleProductView(product.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getAccentGradient(idx)} opacity-0 transition-opacity duration-500 group-hover:opacity-90`} />

                  <div className="relative h-96 overflow-hidden">
                    <div
                      className="absolute inset-0 scale-105 transform bg-cover bg-center transition-transform duration-500 group-hover:scale-125"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                      initial={{ opacity: 0.65 }}
                      whileHover={{ opacity: 0.78 }}
                    />
                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-white/80">
                      <span className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 font-semibold backdrop-blur">
                        Trending
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductView(product.id);
                        }}
                        aria-label={`Quick view ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                      >
                        <Eye className="h-4.5 w-4.5" />
                      </button>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1.5 text-white">
                      <span className="text-[0.7rem] uppercase tracking-[0.32em] text-white/70">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-semibold leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-white/75">{product.brand}</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col px-4 pt-4 pb-1.5 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center justify-between mb-2">
                      <StarRating rating={product.rating} />
                      {discount && (
                        <span className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
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
                      <MagneticButton
                        variant="gradient"
                        size="md"
                        className="w-full justify-center rounded-2xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/checkout?productId=${product.id}&quantity=1&type=buynow`;
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span>Buy Now</span>
                        </div>
                      </MagneticButton>
                      <MagneticButton
                        variant="secondary"
                        size="md"
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-300/50 bg-gray-100/80 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-200/80 hover:text-gray-900 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/40 dark:hover:bg-white/20 dark:hover:text-white sm:w-12 relative"
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={cartLoading}
                        aria-label="Quick add to cart"
                      >
                        {cartLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        ) : (
                          <ShoppingCart className="h-5 w-5" />
                        )}
                        {getItemCount(product.id) > 0 && (
                          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            {getItemCount(product.id)}
                          </span>
                        )}
                      </MagneticButton>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSlider;
