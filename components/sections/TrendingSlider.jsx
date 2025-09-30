'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Flame, Eye, ShoppingCart } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import ParticlesBackground from '../ui/ParticlesBackground';

const trendingItems = [
  {
    id: 'trend-1',
    title: 'Aurora Mesh Runner',
    category: 'Footwear',
    status: 'Trending',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-sky-500/25 via-blue-500/20 to-indigo-500/25',
    tagline: 'Hyperknit upper · MotionSense midsole',
    price: '₹6,499',
    discount: 'Save 25%'
  },
  {
    id: 'trend-2',
    title: 'Luminous Quartz Watch',
    category: 'Accessories',
    status: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1518544388761-a1582f079321?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-amber-500/25 via-orange-500/20 to-rose-500/25',
    tagline: 'Solar index dial · Titanium finishing',
    price: '₹19,299',
    discount: 'Launch deal 15%'
  },
  {
    id: 'trend-3',
    title: 'HoloFlex Headphones',
    category: 'Gadgets',
    status: 'Hot drop',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-fuchsia-500/25 via-purple-500/20 to-violet-500/25',
    tagline: 'Spatial audio · Adaptive noise layers',
    price: '₹14,499',
    discount: 'Bundle & save'
  },
  {
    id: 'trend-4',
    title: 'EcoWave Bottle',
    category: 'Lifestyle',
    status: 'Restock',
    image:
      'https://images.unsplash.com/photo-1573878735868-80f4d88ff7c7?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-emerald-500/25 via-teal-400/20 to-cyan-500/25',
    tagline: 'Graphene self-clean · Thermal core',
    price: '₹2,899',
    discount: 'Save ₹400'
  },
  {
    id: 'trend-5',
    title: 'Nebula Smart Lamp',
    category: 'Home Decor',
    status: 'Limited',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-rose-500/25 via-pink-500/20 to-purple-500/25',
    tagline: 'Mood-reactive lighting · Sleep AI core',
    price: '₹7,199',
    discount: '10% launch credit'
  }
];

const trendFilters = ['All lanes', 'Footwear', 'Accessories', 'Gadgets', 'Lifestyle'];

const highlightMetrics = [
  {
    id: 'metric-1',
    label: 'Sell-through rate',
    value: '78%',
    delta: '+9.2%'
  },
  {
    id: 'metric-2',
    label: 'Average basket',
    value: '₹3.8K',
    delta: '+₹420'
  },
  {
    id: 'metric-3',
    label: 'Daily runway views',
    value: '1.3M',
    delta: '+18.4%'
  }
];

const TrendingSlider = () => {
  const scrollContainerRef = useRef(null);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    const scrollSpeed = 0.18; // pixels per millisecond
    let animationFrameId;
    let lastTimestamp = 0;

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPausedRef.current && container.scrollWidth > container.clientWidth) {
        container.scrollLeft += delta * scrollSpeed;

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 1) {
          container.scrollLeft = 0;
          lastTimestamp = 0;
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

  return (
  <section className="relative w-full overflow-hidden bg-gray-50 pt-10 dark:bg-gray-950 sm:pt-12 lg:pt-14">
      <ParticlesBackground
        colors={['#60a5fa', '#a855f7', '#f97316']}
        size={2}
        countDesktop={70}
        countTablet={50}
        countMobile={40}
        height="100%"
        zIndex={0}
      />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-gray-950 dark:via-gray-950/40 dark:to-gray-950"
          animate={{ opacity: [0.75, 0.95, 0.75] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-20 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/15 to-blue-500/15 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

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
              Live runway modules orchestrated for your next drop
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

            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24, duration: 0.5, ease: 'easeOut' }}
            >
              {trendFilters.map((filter, idx) => (
                <button
                  key={filter}
                  type="button"
                  className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition-all backdrop-blur ${
                    idx === 0
                      ? 'border-gray-900/70 bg-gray-900 text-white shadow-md dark:border-white/30 dark:bg-white/10 dark:text-white'
                      : 'border-gray-200/60 bg-white/60 text-gray-600 hover:border-gray-400/80 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
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
                <span className="flex items-center justify-center gap-1 text-xs text-emerald-500 dark:text-emerald-300">
                  <Flame className="h-3.5 w-3.5" />
                  {metric.delta}
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
            className="no-scrollbar flex snap-x snap-mandatory gap-10 overflow-x-auto pb-8"
            tabIndex={0}
          >
            {trendingItems.map((item, idx) => (
              <motion.article
                key={item.id}
                className="group relative flex h-full min-h-[32rem] w-[19rem] shrink-0 snap-start flex-col overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/85 shadow-2xl backdrop-blur-[40px] transition-all hover:-translate-y-3 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.05] sm:w-[22rem] lg:w-[24rem]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-90`} />

                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 scale-105 transform bg-cover bg-center transition-transform duration-500 group-hover:scale-125"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    initial={{ opacity: 0.65 }}
                    whileHover={{ opacity: 0.78 }}
                  />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-white/80">
                    <span className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 font-semibold backdrop-blur">
                      {item.status}
                    </span>
                    <button
                      type="button"
                      aria-label={`Quick view ${item.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                    >
                      <Eye className="h-4.5 w-4.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1.5 text-white">
                    <span className="text-[0.7rem] uppercase tracking-[0.32em] text-white/70">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/75">{item.tagline}</p>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col justify-between gap-6 p-6 text-gray-700 dark:text-gray-300">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm uppercase tracking-[0.28em] text-gray-500 dark:text-gray-400">#{String(idx + 1).padStart(2, '0')}</span>
                      {item.discount && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                          {item.discount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-semibold text-gray-900 dark:text-white">{item.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.tagline}</p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <MagneticButton
                      variant="gradient"
                      size="md"
                      className="w-full justify-center rounded-2xl"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>Shop</span>
                    </MagneticButton>
                    <MagneticButton
                      variant="secondary"
                      size="md"
                      className="w-full justify-center gap-3 overflow-hidden rounded-2xl px-6 py-3 whitespace-nowrap sm:w-auto"
                      whileTap={{ scale: 0.94 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0"
                        initial={{ x: '-120%' }}
                        whileHover={{ x: '120%' }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                      />
                      <motion.span
                        className="relative flex min-w-[11rem] items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide text-white"
                        whileHover={{ gap: '0.9rem' }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        <motion.span
                          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"
                          whileHover={{ scale: 1.05, rotate: [0, -6, 0] }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </motion.span>
                        <span>Add to Cart</span>
                      </motion.span>
                    </MagneticButton>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSlider;
