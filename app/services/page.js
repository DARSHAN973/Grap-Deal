'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { 
  Building2, 
  Truck, 
  Package, 
  Users, 
  Globe, 
  Shield, 
  Zap, 
  HeadphonesIcon,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Clock,
  Handshake,
  FileText,
  BarChart,
  Settings
} from 'lucide-react';

// B2B Services Data
const services = [
  {
    id: 1,
    title: 'Bulk Procurement',
    description: 'Source products in large quantities at wholesale prices with dedicated account management.',
    icon: Package,
    features: ['Volume discounts up to 40%', 'Dedicated account manager', 'Priority sourcing', 'Custom packaging'],
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'White Label Solutions',
    description: 'Private label manufacturing and branding services for your business products.',
    icon: Award,
    features: ['Custom branding', 'Quality assurance', 'Flexible MOQ', 'Design support'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80',
    badge: 'Premium',
    badgeColor: 'bg-purple-500'
  },
  {
    id: 3,
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain solutions with real-time tracking and optimization.',
    icon: Truck,
    features: ['Real-time tracking', 'Inventory management', 'Cost optimization', 'Risk mitigation'],
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
    badge: 'Enterprise',
    badgeColor: 'bg-green-500'
  },
  {
    id: 4,
    title: 'B2B Marketplace',
    description: 'Connect with verified suppliers and buyers in our exclusive B2B marketplace.',
    icon: Globe,
    features: ['Verified suppliers', 'Secure transactions', 'Trade financing', 'Global reach'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    badgeColor: 'bg-red-500'
  },
  {
    id: 5,
    title: 'Business Analytics',
    description: 'Advanced analytics and insights to optimize your business operations.',
    icon: BarChart,
    features: ['Market intelligence', 'Performance metrics', 'Predictive analytics', 'Custom reports'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badge: 'Growth',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 6,
    title: 'Custom Integration',
    description: 'Seamless API integrations and custom solutions for your existing systems.',
    icon: Settings,
    features: ['API integration', 'Custom development', 'System compatibility', 'Technical support'],
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
    badge: 'Technical',
    badgeColor: 'bg-indigo-500'
  }
];

// Success metrics
const metrics = [
  { value: '500+', label: 'Business Partners', icon: Users },
  { value: '₹50M+', label: 'Transaction Volume', icon: TrendingUp },
  { value: '99.9%', label: 'Uptime Guarantee', icon: Shield },
  { value: '24/7', label: 'Support Available', icon: HeadphonesIcon }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    company: 'TechCorp Industries',
    role: 'Procurement Manager',
    content: 'GrapDeal\'s B2B services have transformed our procurement process. We\'ve saved 30% on costs while improving quality.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    company: 'Global Traders Ltd',
    role: 'Supply Chain Director',
    content: 'The white label solutions helped us launch our product line 6 months ahead of schedule. Excellent service!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=150&q=80'
  }
];

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const heroRef = useRef(null);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    })
    .from('.hero-title', {
      duration: 0.8,
      y: 40,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.3');
  }, { scope: heroRef });

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pb-16 pt-28">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/15 to-sky-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1500px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">
          <div className="space-y-6">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
              <Building2 className="h-4 w-4 text-blue-500" />
              B2B Services
            </span>
            
            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Enterprise Solutions for <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Growing Businesses
              </span>
            </h1>
            
            <p className="hero-subtitle mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Comprehensive B2B services designed to scale your business operations, 
              reduce costs, and accelerate growth through our proven solutions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <motion.button
                className="rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
              <motion.button
                className="rounded-2xl border border-gray-300 bg-white/80 px-8 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive B2B Solutions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From procurement to analytics, we provide end-to-end business solutions 
              tailored to your industry needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/90 backdrop-blur transition-all hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Service Badge */}
                  {service.badge && (
                    <div className={`absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white ${service.badgeColor}`}>
                      {service.badge}
                    </div>
                  )}

                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="rounded-xl bg-white/90 p-3 backdrop-blur">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="mb-6 space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-white font-medium transition-colors hover:bg-blue-700">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-16 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Simple steps to get started with our B2B services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Consultation',
                description: 'Schedule a free consultation to discuss your business needs and requirements.',
                icon: Handshake
              },
              {
                step: '2',
                title: 'Custom Proposal',
                description: 'Receive a tailored proposal with pricing and implementation timeline.',
                icon: FileText
              },
              {
                step: '3',
                title: 'Implementation',
                description: 'Our team implements the solution with ongoing support and monitoring.',
                icon: Zap
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Partners Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Success stories from businesses like yours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="rounded-2xl border border-gray-200/50 bg-white/90 p-8 backdrop-blur dark:border-white/10 dark:bg-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-gray-700 dark:text-gray-300 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1500px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-purple-50 p-12 text-center dark:border-blue-800/50 dark:from-blue-950/20 dark:to-purple-950/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join hundreds of successful businesses already using our B2B services. 
              Get started today with a free consultation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                className="rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Consultation
              </motion.button>
              <motion.button
                className="rounded-2xl border border-gray-300 bg-white/80 px-8 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Brochure
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;