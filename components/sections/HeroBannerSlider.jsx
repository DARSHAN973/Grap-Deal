'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = slides.length;

  const goToSlide = (nextIndex) => {
    setDirection(nextIndex > activeIndex || (activeIndex === totalSlides - 1 && nextIndex === 0) ? 1 : -1);
    setActiveIndex((nextIndex + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!slides || slides.length === 0) return undefined;
    const timer = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 6000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, slides]);

  // fetch banners from API and map to slide shape
  useEffect(() => {
    let mounted = true;
    const fetchBanners = async () => {
      setLoading(true);
  try {
  const res = await fetch('/api/banner');
        const data = await res.json();
        if (!mounted) return;

        if (Array.isArray(data.banners) && data.banners.length) {
          const mapped = data.banners.map((b) => ({
            id: b.id,
            image: b.imageUrl,
            alt: b.title || '',
            tone: '#60a5fa',
            title: b.title || ''
          }));

          setSlides(mapped);
          setActiveIndex(0);
        } else {
          setSlides([]);
        }
      } catch (err) {
        console.error('Failed to load banners', err);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
    return () => { mounted = false; };
  }, []);

  const currentSlide = useMemo(() => slides[activeIndex] || slides[0] || null, [slides, activeIndex]);

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
  {/* Pull the banner up under the sticky header: tighten spacing on mobile */}
   <div className="relative z-10 mx-auto flex min-h-[55vh] w-full max-w-[min(98vw,1800px)] flex-col items-center justify-center px-2 pb-0 pt-0 -mt-8 sm:-mt-10 sm:min-h-[68vh] sm:px-4 md:min-h-[78vh] lg:-mt-12 lg:min-h-[86vh] lg:px-10 xl:px-14">
    <div className="relative mt-0 w-full max-w-[min(95vw,1850px)]">
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.75rem] border border-white/30 bg-white/70 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06]">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-[2.5px] rounded-[1.7rem] sm:rounded-[2.9rem] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(248,113,113,0.35),rgba(239,68,68,0.05),rgba(248,113,113,0.35))] opacity-70"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/8] xl:aspect-[24/9]">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse w-full px-8">
                    <div className="mx-auto h-64 w-full rounded-2xl bg-white/60 dark:bg-white/6" />
                  </div>
                </div>
              ) : currentSlide ? (
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
                      className="absolute inset-0 rounded-[1.5rem] sm:rounded-[3rem] bg-cover bg-center"
                      style={{ backgroundImage: `url(${currentSlide.image})` }}
                    />
                    <motion.div
                      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                    >
                      <div className="flex items-center gap-2">
                        {slides.map((slide, idx) => (
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
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-sm text-white/80">No active banners found.</div>
                </div>
              )}
              {!loading && slides.length > 0 && (
                <div className="absolute bottom-4 right-4 sm:bottom-12 sm:right-12 flex items-center gap-2 sm:gap-4">
                  <NavButton direction="prev" onClick={() => goToSlide(activeIndex - 1)} tone={currentSlide?.tone} />
                  <NavButton direction="next" onClick={() => goToSlide(activeIndex + 1)} tone={currentSlide?.tone} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-8 flex justify-center">
          <button
            type="button"
            disabled={loading || slides.length === 0}
            className={`group flex items-center gap-2 sm:gap-3 rounded-full px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transition-transform ${
              loading || slides.length === 0
                ? 'cursor-not-allowed bg-gray-400 text-white dark:bg-white/10 dark:text-white/40'
                : 'bg-gray-900 text-white hover:-translate-y-1 hover:bg-black dark:bg-white dark:text-gray-900'
            }`}
          >
            Shop
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
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
