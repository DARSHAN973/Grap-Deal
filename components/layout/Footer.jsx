'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
  Send,
  Sparkles,
  ShieldCheck,
  Globe2,
  CheckCircle,
  Globe
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const dropSignals = [
  {
    id: 'drop-1',
    title: 'Weekly Drops',
    value: 'Fridays · 21:00 IST',
    description: 'Fresh arrivals and exclusive deals — grab them before they’re gone.',
    Icon: Sparkles,
    accent: 'from-blue-500/25 via-indigo-500/15 to-purple-500/25',
  },
  {
    id: 'quality-1',
    title: 'Verified Quality',
    value: 'Top-notch Products',
    description: 'Every item is hand-checked for quality and value — shop with confidence.',
    Icon: CheckCircle,
    accent: 'from-green-500/25 via-lime-500/15 to-yellow-500/25',
  },
  {
    id: 'global-1',
    title: 'Global Selection',
    value: '40+ Countries',
    description: 'Curated products from around the world, with local prices and currencies.',
    Icon: Globe,
    accent: 'from-teal-500/25 via-cyan-500/15 to-blue-500/25',
  },
  {
    id: 'favorites-1',
    title: 'Customer Favorites',
    value: 'Top-rated Items',
    description: 'See what’s trending and loved by thousands — join the hype.',
    Icon: Heart,
    accent: 'from-pink-500/25 via-red-500/15 to-orange-500/25',
  },
];

const footerNav = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Categories', href: '/products' },
      { label: 'Special Offers', href: '/products' },
      { label: 'New Arrivals', href: '/products' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/contact' },
      { label: 'Order Tracking', href: '/account' },
      { label: 'Returns & Exchanges', href: '/contact' },
      { label: 'Size Guide', href: '/contact' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Grap Deal', href: '/contact' },
      { label: 'Business Services', href: '/services' },
      { label: 'Careers', href: '/contact' },
      { label: 'Contact Us', href: '/contact' }
    ]
  }
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' }
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 2800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-transparent text-gray-900 dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-48 left-[8%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-32 right-[10%] h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-orange-500/10 to-rose-500/10 blur-3xl" />
      </div>

  <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 py-12 sm:px-6 lg:px-10 xl:px-16">
        {/* Email signup section removed for cleaner launch */}

  <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr,1fr]">
          <div className="grid gap-6 rounded-[2.5rem] border border-gray-200/30 bg-gray-50/60 dark:border-white/10 dark:bg-white/[0.03] p-8 backdrop-blur-2xl md:grid-cols-2">
            {dropSignals.map(({ id, title, value, description, Icon, accent }) => (
              <motion.div
                key={id}
                className="relative overflow-hidden rounded-2xl border border-gray-100/40 bg-white/5 dark:border-white/10 dark:bg-white/5 p-6 text-left shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-40`} />
                <div className="relative flex flex-col gap-3 text-gray-900 dark:text-white">
                  <Icon className="h-5 w-5" />
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">{title}</span>
                    <h4 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{value}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-white/70">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex h-full flex-col justify-between gap-6 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-8 backdrop-blur-2xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">Talk to us</span>
              <h4 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">We partner with teams shipping bold marketplace journeys.</h4>
              <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
                Drop a note and we will align demos, data integrations, and pricing to your rollout timeline.
              </p>
            </div>
            <div className="space-y-3 text-sm text-gray-700 dark:text-white/75">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200/30 bg-gray-50/60 dark:border-white/10 dark:bg-white/5 px-4 py-3">
                <MapPin className="h-4 w-4" />
                <span>Bengaluru · Remote first</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200/30 bg-gray-50/60 dark:border-white/10 dark:bg-white/5 px-4 py-3">
                <Phone className="h-4 w-4" />
                <span>+91 99887 6655</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200/30 bg-gray-50/60 dark:border-white/10 dark:bg-white/5 px-4 py-3">
                <Mail className="h-4 w-4" />
                <span>team@grapdeal.dev</span>
              </div>
            </div>
          </motion.div>
        </div>

  <div className="mt-8 grid gap-12 lg:grid-cols-[2fr,3fr]">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <span className="text-2xl font-bold text-white">GD</span>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Grap Deal</p>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">Marketplace Studio</p>
              </div>
            </div>
            <p className="max-w-lg text-sm text-gray-600 dark:text-white/70">
              We orchestrate cinematic commerce surfaces that connect catalog intelligence with storytelling. Build once, localize everywhere, and keep every drop feeling fresh.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-300/50 dark:border-white/10 bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-white/70 transition-all hover:border-gray-400 dark:hover:border-white/40 hover:bg-gray-200/50 dark:hover:bg-white/15 hover:text-gray-900 dark:hover:text-white"
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            {footerNav.map(({ title, links }) => (
              <div key={title} className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-gray-500 dark:text-white/70">{title}</h4>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-white/70">
                  {links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="group flex items-center justify-between rounded-xl border border-gray-200/30 dark:border-white/5 bg-gray-100/30 dark:bg-white/[0.02] px-4 py-3 transition-all hover:border-gray-300 dark:hover:border-white/30 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      >
                        <span>{link.label}</span>
                        <ArrowUp className="h-3.5 w-3.5 text-gray-400 dark:text-white/40 group-hover:text-gray-700 dark:group-hover:text-white" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

  <div className="mt-8 flex flex-col gap-6 border-t border-gray-200/30 dark:border-white/10 pt-8 text-xs uppercase tracking-[0.28em] text-gray-500 dark:text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gray-300/50 dark:border-white/10 px-4 py-1">Launch kits</span>
            <span className="rounded-full border border-gray-300/50 dark:border-white/10 px-4 py-1">No-code ready</span>
            <span className="rounded-full border border-gray-300/50 dark:border-white/10 px-4 py-1">24/5 support</span>
          </div>
          <p className="text-center text-[0.7rem] uppercase tracking-[0.35em] text-gray-400 dark:text-white/40">
            © {new Date().getFullYear()} Grap Deal Studio — Crafted with intuition & data.
          </p>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full border border-gray-300/50 dark:border-white/20 bg-white/90 dark:bg-white/10 text-gray-700 dark:text-white shadow-xl backdrop-blur-lg"
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>
    </footer>
  );
};

export default Footer;