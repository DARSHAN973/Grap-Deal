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
  Globe2
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const dropSignals = [
  {
    id: 'signal-1',
    title: 'Drop cadence',
    value: 'Fridays · 21:00 IST',
    description: 'Sync hero banners and trending rails with one publish.',
    Icon: Sparkles,
    accent: 'from-blue-500/25 via-indigo-500/15 to-purple-500/25'
  },
  {
    id: 'signal-2',
    title: 'Quality gate',
    value: '42-point review',
    description: 'Every showcase passes marketplace & compliance filters.',
    Icon: ShieldCheck,
    accent: 'from-emerald-500/25 via-teal-500/15 to-cyan-500/25'
  },
  {
    id: 'signal-3',
    title: 'Global sellers',
    value: '42 countries',
    description: 'Localized copy & currency modes ready out of the box.',
    Icon: Globe2,
    accent: 'from-orange-500/25 via-amber-500/15 to-rose-500/25'
  }
];

const footerNav = [
  {
    title: 'Platform',
    links: [
      { label: 'Hero composer', href: '/products' },
      { label: 'Trending rail', href: '/products' },
      { label: 'Dynamic widgets', href: '/products' },
      { label: 'Automation API', href: '/products' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Marketplace playbook', href: '/playbook' },
      { label: 'Design tokens', href: '/tokens' },
      { label: 'Status page', href: '/status' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Grap Deal', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press kit', href: '/press' },
      { label: 'Contact', href: '/contact' }
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
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-48 left-[8%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-32 right-[10%] h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-orange-500/10 to-rose-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 py-24 sm:px-6 lg:px-10 xl:px-16">
        <motion.div
          className="flex flex-col gap-10 rounded-[3rem] border border-white/10 bg-white/[0.04] p-10 shadow-[0_40px_120px_rgba(15,23,42,0.45)] backdrop-blur-3xl lg:flex-row lg:items-center lg:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              <Sparkles className="h-4 w-4" />
              Beta collective
            </span>
            <h3 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
              Join the Grap Deal Collective and get weekly drop frameworks.
            </h3>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              Templates, launch rituals, and performance benchmarks delivered every Friday. Cancel anytime.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-inner"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
                Stay ahead of every drop
              </span>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="group relative flex w-full items-center gap-3 rounded-[1.8rem] border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all focus-within:border-white/35 focus-within:bg-white/10 focus-within:shadow-[0_0_28px_rgba(96,165,250,0.25)]">
                  <Mail className="h-5 w-5 text-emerald-200/90" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="yourname@brand.com"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    required
                  />
                </div>
                <MagneticButton
                  type="submit"
                  variant="gradient"
                  className="w-full justify-center px-6 py-3 text-sm font-semibold sm:w-auto"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <motion.span
                      className="flex items-center gap-2"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <Heart className="h-4 w-4 text-rose-400" />
                      Added to the runway list
                    </motion.span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Request access
                    </span>
                  )}
                </MagneticButton>
              </div>
              <p className="text-xs text-white/50">
                No spam, just launch signals and frameworks. Unsubscribe anytime.
              </p>
            </div>
          </form>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr,1fr]">
          <div className="grid gap-6 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl md:grid-cols-2">
            {dropSignals.map(({ id, title, value, description, Icon, accent }) => (
              <motion.div
                key={id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-40`} />
                <div className="relative flex flex-col gap-3 text-white">
                  <Icon className="h-5 w-5" />
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">{title}</span>
                    <h4 className="mt-2 text-xl font-semibold">{value}</h4>
                  </div>
                  <p className="text-sm text-white/70">{description}</p>
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
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">Talk to us</span>
              <h4 className="mt-3 text-2xl font-semibold">We partner with teams shipping bold marketplace journeys.</h4>
              <p className="mt-3 text-sm text-white/70">
                Drop a note and we will align demos, data integrations, and pricing to your rollout timeline.
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/75">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <MapPin className="h-4 w-4" />
                <span>Bengaluru · Remote first</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Phone className="h-4 w-4" />
                <span>+91 99887 6655</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Mail className="h-4 w-4" />
                <span>team@grapdeal.dev</span>
              </div>
            </div>
          </motion.div>
        </div>

  <div className="mt-16 grid gap-12 lg:grid-cols-[2fr,3fr]">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <span className="text-2xl font-bold">GD</span>
              </div>
              <div>
                <p className="text-xl font-semibold">Grap Deal</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Marketplace Studio</p>
              </div>
            </div>
            <p className="max-w-lg text-sm text-white/70">
              We orchestrate cinematic commerce surfaces that connect catalog intelligence with storytelling. Build once, localize everywhere, and keep every drop feeling fresh.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/40 hover:bg-white/15 hover:text-white"
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
                <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">{title}</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  {links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      >
                        <span>{link.label}</span>
                        <ArrowUp className="h-3.5 w-3.5 text-white/40 group-hover:text-white" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.28em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 px-4 py-1">Launch kits</span>
            <span className="rounded-full border border-white/10 px-4 py-1">No-code ready</span>
            <span className="rounded-full border border-white/10 px-4 py-1">24/5 support</span>
          </div>
          <p className="text-center text-[0.7rem] uppercase tracking-[0.35em] text-white/40">
            © {new Date().getFullYear()} Grap Deal Studio — Crafted with intuition & data.
          </p>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-lg"
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