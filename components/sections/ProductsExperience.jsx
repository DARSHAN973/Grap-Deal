'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Layers,
  LineChart,
  Globe2,
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import ProductCard from '../ui/ProductCard';
import ScrollReveal from '../ui/ScrollReveal';

const heroHighlights = [
  {
    label: 'Drop Velocity',
    value: '3.4x',
    sub: 'Faster GTM to storefront',
  },
  {
    label: 'Conversion Uplift',
    value: '+62%',
    sub: 'When hero + trending sync',
  },
  {
    label: 'Regions Localized',
    value: '42',
    sub: 'Currency + copy ready',
  },
];

const productWebNodes = [
  {
    id: 'aurora-pack',
    title: 'Aurora drops',
    highlight: 'Seasonal storytelling kit',
    stat: 'Avg +48% AOV',
    position: 'top-[12%] left-[14%]',
    color: 'from-blue-500/70 via-indigo-500/60 to-purple-500/70',
  },
  {
    id: 'merch-grid',
    title: 'Merch webs',
    highlight: 'Dynamic collection webs',
    stat: '12 live automations',
    position: 'top-[8%] right-[18%]',
    color: 'from-emerald-500/70 via-teal-500/60 to-cyan-500/70',
  },
  {
    id: 'conversion-lab',
    title: 'Conversion lab',
    highlight: 'Rapid A/B deck',
    stat: '6-hour iteration loop',
    position: 'bottom-[18%] left-[12%]',
    color: 'from-orange-500/70 via-amber-500/60 to-rose-500/70',
  },
  {
    id: 'market-swarm',
    title: 'Market swarm',
    highlight: 'Influencer co-build hub',
    stat: '200+ creators synced',
    position: 'bottom-[12%] right-[14%]',
    color: 'from-fuchsia-500/70 via-violet-500/60 to-sky-500/70',
  },
];

const curatedProducts = [
  {
    id: 1,
    name: 'Velocity Hero Stack',
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviews: 182,
    tag: 'Launch Ready',
  },
  {
    id: 2,
    name: 'Trending Rail OS',
    price: 199,
    originalPrice: 259,
    rating: 4.8,
    reviews: 136,
    tag: 'New',
  },
  {
    id: 3,
    name: 'Creator Partner Capsule',
    price: 289,
    originalPrice: 329,
    rating: 4.7,
    reviews: 98,
    tag: 'Collab',
  },
  {
    id: 4,
    name: 'Localization Toolkit',
    price: 159,
    originalPrice: 219,
    rating: 4.8,
    reviews: 154,
    tag: 'Global',
  },
  {
    id: 5,
    name: 'Merch Automation Web',
    price: 329,
    originalPrice: 399,
    rating: 5,
    reviews: 211,
    tag: 'Bestseller',
  },
  {
    id: 6,
    name: 'Retention Signal Lab',
    price: 189,
    originalPrice: 0,
    rating: 4.6,
    reviews: 76,
    tag: 'Limited',
  },
];

const marketingPlaybooks = [
  {
    title: 'Full-funnel story webs',
    description:
      'Sync hero banners, trending rails, and story stacks into one orchestrated launch narrative that recalibrates every hour.',
    icon: Layers,
    metric: 'Playbook 01',
  },
  {
    title: 'Conversion signal loops',
    description:
      'Deploy data-backed offers with built-in social proof, urgency choreography, and adaptive pricing to unlock the next 10% uplift.',
    icon: LineChart,
    metric: 'Playbook 02',
  },
  {
    title: 'Global growth rituals',
    description:
      'Automate localization and influencer co-drops: 24-hour content, currency sync, and post-launch retention remixes.',
    icon: Globe2,
    metric: 'Playbook 03',
  },
];

const ProductsExperience = () => {
  return (
    <main className="relative overflow-hidden bg-transparent text-gray-100 transition-colors duration-500">
      <section className="relative isolate overflow-hidden pb-24 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-20%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/25 via-purple-500/20 to-indigo-500/25 blur-3xl" />
          <div className="absolute left-[10%] top-[35%] h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-500/25 blur-2xl" />
          <div className="absolute right-[12%] top-[45%] h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/25 to-rose-500/25 blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[min(95vw,1400px)] gap-16 px-4 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-900/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-gray-900 backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
              <Sparkles className="h-4 w-4" />
              Drop studio
            </span>
            <motion.h1
              className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.25rem]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Build cinematic product stories that convert in every market.
            </motion.h1>
            <p className="max-w-xl text-base text-gray-600 dark:text-gray-300">
              Grap Deal drops align hero surfaces, trending rails, automation webs, and retention rituals. Launch campaigns that feel handcrafted, yet operate on autopilot.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <MagneticButton variant="gradient" className="px-7 py-3 text-sm font-semibold">
                <ArrowRight className="h-4 w-4" />
                Preview launch base
              </MagneticButton>
              <MagneticButton variant="secondary" className="px-7 py-3 text-sm font-semibold">
                <Zap className="h-4 w-4" />
                Book a live demo
              </MagneticButton>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {heroHighlights.map(({ label, value, sub }) => (
                <motion.div
                  key={label}
                  className="rounded-3xl border border-gray-900/5 bg-white/70 p-6 shadow-[0_20px_45px_-18px_rgba(15,23,42,0.25)] backdrop-blur-md dark:border-white/10 dark:bg-white/5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="mt-3 text-3xl font-semibold">{value}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[26rem] rounded-[3rem] border border-white/20 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-900/90 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.45)] dark:border-white/10">
              <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_65%)]" />
              <div className="absolute inset-[12%] rounded-[2.4rem] border border-white/10" />
              <div className="absolute inset-[22%] rounded-[1.8rem] border border-white/5" />

              {['left-[18%] top-[24%]', 'left-[55%] top-[16%]', 'left-[24%] top-[62%]', 'left-[60%] top-[66%]'].map((pos, idx) => (
                <motion.span
                  key={pos}
                  className={`absolute ${pos} h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500`}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl" />
              <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500" />

              <motion.div
                className="absolute left-1/2 top-[18%] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity }}
              >
                <TrendingUp className="h-4 w-4" />
                Live CTR
              </motion.div>

              <div className="absolute inset-0">
                <motion.div
                  className="absolute left-[55%] top-[28%] h-[2px] w-[22%] bg-gradient-to-r from-white/10 via-white/40 to-transparent"
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute left-[36%] top-[68%] h-[22%] w-[2px] bg-gradient-to-b from-transparent via-white/50 to-white/10"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3.1, repeat: Infinity }}
                />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Live drop</p>
                  <h2 className="mt-3 text-2xl font-semibold">Aurora Merch Grid</h2>
                  <p className="mt-2 text-sm text-white/70">
                    Machine-curated product stories adapting to every cohort in real time.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/80">Real-time A/B</span>
                  <span className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/80">Creator sync</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto w-full max-w-[min(95vw,1400px)] px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">Product constellations</span>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Dynamic webs that learn with every drop.</h2>
              </div>
              <p className="max-w-xl text-sm text-gray-600 dark:text-gray-300">
                Pair modular canvases with automation connectors. Each node measures dwell time, share velocity, and cohort resonance in under 10 minutes.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative mt-16 overflow-hidden rounded-[3rem] border border-gray-900/10 bg-white/80 p-10 shadow-[0_40px_120px_-30px_rgba(15,23,42,0.3)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-12 rounded-[2.5rem] border border-dashed border-white/10" />

            <div className="relative aspect-[5/3] w-full">
              <div className="absolute left-[18%] top-[28%] h-[2px] w-[24%] bg-gradient-to-r from-sky-500/10 via-sky-500/60 to-transparent" />
              <div className="absolute left-[54%] top-[30%] h-[2px] w-[23%] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-fuchsia-500/10" />
              <div className="absolute left-[30%] top-[55%] h-[28%] w-[2px] bg-gradient-to-b from-transparent via-emerald-500/40 to-emerald-500/10" />
              <div className="absolute left-[48%] top-[58%] h-[24%] w-[2px] bg-gradient-to-b from-transparent via-orange-500/40 to-orange-500/10" />

              {productWebNodes.map(({ id, title, highlight, stat, position, color }, idx) => (
                <motion.div
                  key={id}
                  className={`absolute ${position} w-[220px] max-w-[45vw] rounded-3xl border border-white/20 bg-white/90 p-6 text-gray-900 shadow-[0_20px_45px_-18px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/10 dark:bg-gray-900/80 dark:text-white`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${color} px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/90`}>
                    Node
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">{stat}</p>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto w-full max-w-[min(95vw,1400px)] px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">Curated arsenal</span>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Pick the stack that amplifies your next release.</h2>
              </div>
              <MagneticButton variant="ghost" className="self-start px-6 py-2 text-sm font-semibold">
                Browse full library
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {curatedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="mx-auto w-full max-w-[min(95vw,1400px)] overflow-hidden rounded-[3rem] border border-gray-900/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-12 shadow-[0_45px_140px_-30px_rgba(15,23,42,0.6)] text-white sm:p-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-lg space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                <TrendingUp className="h-4 w-4" />
                Marketing strat lab
              </span>
              <h2 className="text-3xl font-semibold sm:text-4xl">Momentum playbooks engineered for commerce squads.</h2>
              <p className="text-sm text-white/70">
                Every Grap Deal product ships with guidance on offer sequencing, lifecycle nudges, and creator amplification. Blend data and editorial craft for launches that refuse to go quiet.
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                <span className="rounded-full border border-white/20 px-4 py-1">Retention loops</span>
                <span className="rounded-full border border-white/20 px-4 py-1">Creator pods</span>
                <span className="rounded-full border border-white/20 px-4 py-1">Geo personalization</span>
                <span className="rounded-full border border-white/20 px-4 py-1">Offer choreography</span>
              </div>
            </div>

            <div className="grid flex-1 gap-6 md:grid-cols-2">
              {marketingPlaybooks.map(({ title, description, icon: Icon, metric }, idx) => (
                <motion.div
                  key={title}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_70%)]" />
                  <div className="relative flex h-full flex-col gap-4 text-white">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/60">
                      <span>{metric}</span>
                      <motion.span
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.span>
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-white/70">{description}</p>
                    <MagneticButton variant="ghost" className="mt-auto w-fit px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      Download canvas
                      <ArrowRight className="h-3.5 w-3.5" />
                    </MagneticButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsExperience;
