'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Shield, 
  HeadphonesIcon,
  Star,
  TrendingUp,
  Clock,
  Handshake,
  FileText,
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// Service type icons mapping
const serviceTypeIcons = {
  'HEALTHCARE': Building2,
  'LEGAL': FileText,
  'EDUCATION': Users,
  'TECHNOLOGY': Globe,
  'FINANCE': TrendingUp,
  'REAL_ESTATE': Building2,
  'AUTOMOTIVE': Building2,
  'HOME_SERVICES': Handshake,
  'OTHER': Building2
};

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
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const heroRef = useRef(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/b2b/services');
        const data = await response.json();
        
        if (data.success) {
          setServices(data.services);
        } else {
          setError(data.error || 'Failed to load services');
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
                onClick={() => window.location.href = '/account?tab=business'}
                className="rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                List Your Business
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

          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-gray-200/50 bg-white/90 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-2xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 dark:text-red-400 mb-4">
                <Building2 className="h-16 w-16 mx-auto opacity-50 mb-4" />
                <p className="text-lg font-medium">Failed to load services</p>
                <p className="text-sm opacity-75">{error}</p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">No services available at the moment</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Check back later for new service listings</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = serviceTypeIcons[service.serviceType] || Building2;
                const businessImage = service.images && service.images.length > 0 
                  ? (Array.isArray(service.images) ? service.images[0]?.url || service.images[0] : service.images)
                  : null;
                
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
                    {/* Business Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {businessImage ? (
                        <Image
                          src={businessImage}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`${businessImage ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20`}>
                        <Icon className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {service.serviceType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Business Info */}
                      <div className="space-y-2 mb-4">
                        {/* Contact Number */}
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <a 
                            href={`tel:${service.contactNumber}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {service.contactNumber}
                          </a>
                        </div>

                        {/* Email (if available) */}
                        {service.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <a 
                              href={`mailto:${service.email}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                            >
                              {service.email}
                            </a>
                          </div>
                        )}

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <span className="truncate">
                            {service.city}, {service.state}
                          </span>
                        </div>

                        {/* Website (if available) */}
                        {service.website && (
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Globe className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <a 
                              href={service.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Pricing Info */}
                      {service.priceType !== 'CONTACT' && service.basePrice && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-800 dark:text-green-400">
                            {service.priceType === 'HOURLY' ? 'Starting from' : 'Price:'} ₹{service.basePrice}
                            {service.priceType === 'HOURLY' ? '/hour' : ''}
                          </p>
                        </div>
                      )}

                      {/* Contact Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <a
                          href={`tel:${service.contactNumber}`}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          Call
                        </a>
                        <a
                          href={`sms:${service.contactNumber}`}
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          Message
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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


    </main>
  );
};

export default ServicesPage;