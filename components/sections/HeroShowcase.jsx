'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Store,
  Building2,
  Users2,
  Share2,
  ShieldCheck
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import FloatingParticles from '../ui/FloatingParticles';

const pillars = [
  {
    title: 'E-Commerce & B2C',
    description: 'Managed marketplace with curated vendors and premium delivery.',
    icon: Store,
    accent: 'from-blue-500/15 to-indigo-500/15'
  },
  {
    title: 'B2B Services',
    description: 'Banner ads and verified business listings that drive qualified leads.',
    icon: Building2,
    accent: 'from-emerald-500/15 to-teal-500/15'
  },
  {
    title: 'C2C Community',
    description: 'Customer listings with smart verification and secure hand-offs.',
    icon: Users2,
    accent: 'from-pink-500/15 to-rose-500/15'
  },
  {
    title: 'Unified Logistics',
    description: 'Integrated payouts and shipping management via trusted partners.',
    icon: Share2,
    accent: 'from-amber-500/15 to-orange-500/15'
  }
];

const gradientAnimation = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
  },
  transition: {
    duration: 12,
    repeat: Infinity,
    ease: 'linear'
  }
};

const HeroShowcase = () => {
  return (
    <section className="relative flex items-center justify-center w-full min-h-[calc(100vh-6rem)] overflow-hidden bg-gray-50 dark:bg-gray-950">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_60%)]"
        {...gradientAnimation}
        style={{ backgroundSize: '200% 200%' }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/5"
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <FloatingParticles count={60} color="rgba(129, 140, 248, 0.25)" />

      <div className="relative z-10 w-full max-w-6xl px-4 py-20 sm:py-24 lg:py-28">
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-800 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Unified Commerce Stack
          </motion.span>

          <motion.h1
            className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            Build one platform for E-Commerce, B2B, B2C, and C2C success
          </motion.h1>

          <motion.p
            className="mt-4 max-w-3xl text-base sm:text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Launch a future-ready marketplace with vendor verification, logistics orchestration,
            transparent payouts, and immersive shopping journeys—all powered by Next.js and a
            resilient MySQL core.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <Link href="#modules" className="w-full sm:w-auto">
              <MagneticButton variant="gradient" size="lg" className="w-full">
                <Sparkles className="h-5 w-5" />
                <span>Explore Modules</span>
              </MagneticButton>
            </Link>
            <Link href="/flow" className="w-full sm:w-auto">
              <MagneticButton
                variant="secondary"
                size="lg"
                className="w-full backdrop-blur-lg border border-gray-200/70 dark:border-gray-700"
              >
                <span>View Project Blueprint</span>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          id="modules"
          className="mt-14 grid gap-5 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-white/75 p-6 text-left shadow-lg backdrop-blur-xl transition-all dark:border-white/10 dark:bg-white/[0.04]`}
              >
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${pillar.accent}`}
                />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-gray-900 shadow-md dark:bg-white/10 dark:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroShowcase;
