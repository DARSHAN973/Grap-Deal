'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ParticlesBackground from '../ui/ParticlesBackground';

const heroSlides = [
  {
    id: 'banner-1',
    image:
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1400&q=80',
    alt: 'Futuristic eco-friendly fashion showcased with neon lighting',
    tone: '#60a5fa',
    badge: 'Launchpads',
    title: 'Compose immersive hero stories that convert on day one.',
    description:
      'Blend magnetic visuals with commerce-ready CTAs, all powered by automation-friendly layouts your teams can tune in minutes.',
    primaryCta: 'Preview Experience',
    secondaryCta: 'View Playbook'
  },
  {
    id: 'banner-2',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80',
    alt: 'Minimalistic product presentation with soft gradients',
    tone: '#f97316',
    badge: 'Campaign OS',
    title: 'Launch every drop with adaptive storytelling blocks.',
    description:
      'Swap assets, sequencing, and offers without losing the premium vibe. Your design system and content pipeline finally in sync.',
    primaryCta: 'Build a Drop',
    secondaryCta: 'Browse Components'
  },
  {
    id: 'banner-3',
    image:
      'https://images.unsplash.com/photo-1525909002-1b05e0c869d0?auto=format&fit=crop&w=1400&q=80',
    alt: 'Modern workspace with premium gadgets and lifestyle accessories',
    tone: '#a855f7',
    badge: 'Realtime Sync',
    title: 'Personalize product arcs without touching code.',
    description:
      'Pipe live marketplace data straight into curated hero reveals and trending rails that keep customers exploring longer.',
    primaryCta: 'See Live Demo',
    secondaryCta: 'Platform Docs'
  }
];

const transitionVariants = {
  enter: (direction) => ({
    opacity: 0,
    scale: 1.05,
    x: direction > 0 ? 60 : -60
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut'
    }
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.98,
    x: direction < 0 ? 60 : -60,
    transition: {
      duration: 0.6,
      ease: 'easeIn'
    }
  })
};

const HeroBannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = heroSlides.length;

  const goToSlide = (nextIndex) => {
    setDirection(nextIndex > activeIndex || (activeIndex === totalSlides - 1 && nextIndex === 0) ? 1 : -1);
    setActiveIndex((nextIndex + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 6000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const currentSlide = useMemo(() => heroSlides[activeIndex], [activeIndex]);

  return (
    <section className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <ParticlesBackground
        colors={['#60a5fa', '#a855f7', '#f97316']}
        size={2.5}
        countDesktop={80}
        countTablet={60}
        countMobile={45}
        height="100%"
        zIndex={0}
      />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-52 left-[8%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-pink-500/15 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-64 right-[10%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-cyan-400/12 to-indigo-500/15 blur-3xl"
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

  <div className="relative z-10 mx-auto flex min-h-[94vh] w-full max-w-[min(98vw,1800px)] flex-col items-center justify-center px-4 pb-14 pt-0 sm:min-h-[100vh] sm:px-6 lg:min-h-[110vh] lg:px-10 xl:px-14">
    <div className="relative mt-8 w-full max-w-[min(96vw,1850px)]">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/30 bg-white/70 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06]">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-[2.5px] rounded-[2.9rem] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(248,113,113,0.35),rgba(239,68,68,0.05),rgba(248,113,113,0.35))] opacity-70"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 aspect-[3/2] w-full sm:aspect-[16/9] lg:aspect-[21/8] xl:aspect-[24/9]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentSlide.id}
                  variants={transitionVariants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <div
                    className="absolute inset-0 rounded-[3rem] bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentSlide.image})` }}
                  />
                  <motion.div
                    className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      {heroSlides.map((slide, idx) => (
                        <motion.span
                          key={slide.id}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === activeIndex
                              ? 'w-9 bg-white shadow-lg shadow-black/20'
                              : 'w-3 bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                    <motion.div
                      key={currentSlide.id}
                      className="relative h-1.5 w-44 overflow-hidden rounded-full bg-white/30 shadow-inner"
                      initial={{ opacity: 0, scaleX: 0.9 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${currentSlide.tone} 0%, #ffffff 100%)` }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5.4, ease: 'easeInOut' }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-12 right-12 flex items-center gap-4">
                <NavButton direction="prev" onClick={() => goToSlide(activeIndex - 1)} tone={currentSlide.tone} />
                <NavButton direction="next" onClick={() => goToSlide(activeIndex + 1)} tone={currentSlide.tone} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="group flex items-center gap-3 rounded-full bg-gray-900 px-12 py-4 text-lg font-semibold text-white shadow-2xl transition-transform hover:-translate-y-1 hover:bg-black dark:bg-white dark:text-gray-900"
          >
            Shop
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

const NavButton = ({ direction, onClick, tone }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/50 bg-white/70 text-gray-900 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 dark:border-white/10 dark:bg-white/15 dark:text-white"
  >
    <motion.span
      className="absolute inset-0"
      style={{ background: `radial-gradient(circle at top, ${tone}30, transparent 70%)` }}
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    {direction === 'prev' ? (
      <ArrowLeft className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
    ) : (
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    )}
  </button>
);

export default HeroBannerSlider;
