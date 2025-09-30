'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import MagneticButton from '../ui/MagneticButton';
import FloatingParticles from '../ui/FloatingParticles';

const slides = [
  {
    id: 'eco-collection',
    eyebrow: 'Sustainable Staples',
    title: 'Earth-Friendly Essentials',
    subtitle: 'Elevate your daily routine with conscious picks built to last.',
    description:
      "Hand-picked products made from recycled, renewable, and cruelty-free materials. Shop smarter without compromising style.",
    stats: [
      { label: 'Certified Organic', value: '98%' },
      { label: 'Carbon Offset', value: '100%' }
    ],
    ctaLabel: 'Shop Sustainable',
    ctaHref: '/collections/sustainable',
    accent: '#34d399',
    Icon: Leaf
  },
  {
    id: 'express-shipping',
    eyebrow: 'Lightning Delivery',
    title: 'Same-Day Dispatch',
    subtitle: 'From our hub to your doorstep in record speed.',
    description:
      'Premium packaging, real-time tracking, and white-glove delivery for every order. Because waiting is so last season.',
    stats: [
      { label: 'Cities Covered', value: '120+' },
      { label: 'Avg. Delivery', value: '6 hrs' }
    ],
    ctaLabel: 'Track Logistics',
    ctaHref: '/logistics',
    accent: '#60a5fa',
    Icon: Truck
  },
  {
    id: 'exclusive-drops',
    eyebrow: 'Members Only',
    title: 'Limited Edition Drops',
    subtitle: 'Unlock curated capsules crafted with visionary designers.',
    description:
      'Stay ahead with early access, personalized recommendations, and exclusive partner collaborations releasing every Friday.',
    stats: [
      { label: 'Editor Picks', value: '24' },
      { label: 'Sell Out Rate', value: '92%' }
    ],
    ctaLabel: 'Become a Member',
    ctaHref: '/membership',
    accent: '#a855f7',
    Icon: Sparkles
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
    rotateX: 10
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18 }
  },
  exit: (direction) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
    rotateX: -10,
    transition: { duration: 0.35, ease: 'easeIn' }
  })
};

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalSlides = slides.length;

  const goToSlide = (index) => {
    const normalizedIndex = (index + totalSlides) % totalSlides;
    const dir = computeDirection(activeIndex, normalizedIndex, totalSlides);
    setDirection(dir);
    setActiveIndex(normalizedIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 6500);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentSlide = useMemo(() => slides[activeIndex], [activeIndex]);
  const nextSlide = slides[(activeIndex + 1) % totalSlides];
  const SpotlightIcon = currentSlide.Icon;

  return (
    <section className="relative flex items-center justify-center w-full min-h-[calc(100vh-6rem)] py-20 sm:py-24 md:py-28 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticles count={80} color="rgba(164, 202, 255, 0.35)" />
        <motion.div
          className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/25 to-pink-500/20 blur-3xl"
          animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-emerald-400/15 via-cyan-400/20 to-blue-500/15 blur-3xl"
          animate={{ y: [0, -25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-gray-900/60 px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide text-gray-700 dark:text-gray-300 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Hero Experiences curated with motion flair
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Discover your perfect collection in a single swipe
          </h2>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Inspired by the immersive hero moments from Lightswind and ReactBits, this slider keeps your spotlight content front and center across every screen size.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-x-6 -inset-y-8 rounded-[2.5rem] bg-gradient-to-r from-white/70 via-white/40 to-white/10 dark:from-gray-900/80 dark:via-gray-900/40 dark:to-gray-900/10 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl" />

          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/50 dark:border-white/10 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl px-6 sm:px-10 py-14 sm:py-16">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={currentSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center"
              >
                <div className="space-y-6 text-left">
                  <motion.span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium"
                    style={{
                      backgroundColor: `${hexToRgba(currentSlide.accent, 0.14)}`,
                      color: currentSlide.accent
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <PackageCheck className="h-4 w-4" />
                    {currentSlide.eyebrow}
                  </motion.span>

                  <motion.h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                  >
                    {currentSlide.title}
                  </motion.h3>

                  <motion.p
                    className="text-lg sm:text-xl text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.5 }}
                  >
                    {currentSlide.subtitle}
                  </motion.p>

                  <motion.p
                    className="text-base sm:text-lg text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {currentSlide.description}
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38, duration: 0.5 }}
                  >
                    {currentSlide.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-gray-200/70 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/60 px-4 py-4 text-left shadow-sm"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </div>
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row sm:items-center sm:gap-4"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.46, duration: 0.45 }}
                  >
                    <Link href={currentSlide.ctaHref} className="w-full sm:w-auto">
                      <MagneticButton
                        variant="gradient"
                        size="lg"
                        className="w-full"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span>{currentSlide.ctaLabel}</span>
                      </MagneticButton>
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  className="relative flex items-center justify-center"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-[2rem]"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${hexToRgba(
                        currentSlide.accent,
                        0.35
                      )}, transparent 60%)`
                    }}
                    animate={{ opacity: [0.65, 0.95, 0.65] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <motion.div
                    className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-white/10 shadow-2xl overflow-hidden"
                    whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_55%)]"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <SpotlightIcon className="h-4 w-4" />
                      Spotlight Collection
                    </motion.div>
                    <motion.div
                      className="absolute bottom-6 left-6 right-6 space-y-3 text-white/80"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.4 }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="uppercase tracking-[0.3rem] text-white/40">
                          Next Up
                        </span>
                        <span className="font-semibold text-white">
                          {nextSlide.title}
                        </span>
                      </div>
                      <motion.div
                        className="h-1 w-full rounded-full bg-white/10 overflow-hidden"
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: currentSlide.accent }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 6.2, ease: 'easeInOut' }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.article>
            </AnimatePresence>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex - 1)}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/70 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white/90 dark:hover:border-gray-700"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex + 1)}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/70 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white/90 dark:hover:border-gray-700"
                >
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`group relative h-3 rounded-full transition-all ${
                      idx === activeIndex
                        ? 'w-10 bg-gray-900 dark:bg-white'
                        : 'w-3 bg-gray-300/70 dark:bg-gray-700/70 hover:bg-gray-400 dark:hover:bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {idx === activeIndex && (
                      <motion.span
                        layoutId="slider-indicator"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: currentSlide.accent }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function computeDirection(current, next, total) {
  if (current === next) return 0;
  if ((current === total - 1 && next === 0) || next > current) {
    return 1;
  }
  return -1;
}

function hexToRgba(hex, alpha = 1) {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default HeroSlider;
