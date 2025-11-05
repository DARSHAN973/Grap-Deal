'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Building,
  Globe,
  Headphones,
  Heart,
  Zap,
  Star,
  Shield,
  Truck,
} from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const formRef = useRef(null);
  const heroRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    })
    .from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.6')
    .from('.hero-stats', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.4');
  }, { scope: heroRef });

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'support', label: 'Customer Support', icon: Headphones },
    { value: 'partnership', label: 'Business Partnership', icon: Building },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: Heart },
    { value: 'technical', label: 'Technical Issue', icon: Zap },
    { value: 'returns', label: 'Returns & Refunds', icon: Truck },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@Grapdeal.com',
      description: 'We\'ll respond within 24 hours',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: '123 Commerce Street, Tech City, TC 12345',
      description: 'Our headquarters',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Monday - Friday: 9AM - 6PM EST',
      description: 'Weekend support available',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

  if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, api: undefined }));

    try {
      const res = await fetch('/api/contactUs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          category: formData.category,
          message: formData.message,
        }),
      });

      let payload = null;
      try { payload = await res.json(); } catch (err) { payload = null; }

      if (!res.ok) {
        if (payload && payload.errors && typeof payload.errors === 'object') {
          setErrors((prev) => ({ ...prev, ...payload.errors }));
        } else if (payload && payload.message) {
          setErrors((prev) => ({ ...prev, api: payload.message }));
        } else {
          setErrors((prev) => ({ ...prev, api: `Submission failed (${res.status})` }));
        }
        return;
      }

      // success
      setIsSubmitted(true);
      setErrors({});
      setFormData({ name: '', email: '', subject: '', category: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrors((prev) => ({ ...prev, api: 'Network error. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pb-6 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-linear-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-linear-to-br from-cyan-400/15 to-blue-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-linear-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1400px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">
          <div className="space-y-4">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-800/20 dark:bg-blue-950/20 dark:text-blue-200">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              Get In Touch
            </span>
            
            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              We're Here to Help
            </h1>
            
            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Have questions? Need support? Want to partner with us? Our team is ready to assist you with anything you need.
            </p>

            {/* Quick Stats */}
            <div className="hero-stats flex items-center justify-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24h</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">99%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="relative py-12">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Multiple Ways to Reach Us
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Choose the method that works best for you
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${info.bgColor}`}>
                  <info.icon className={`h-6 w-6 ${info.color}`} />
                </div>
                
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {info.title}
                </h3>
                
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  {info.value}
                </p>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ Section */}
      <section className="relative py-12">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl border border-gray-200/50 bg-white/90 p-6 shadow-xl dark:border-white/10 dark:bg-white/5">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Send us a Message
                </h3>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20"
                    >
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Message sent successfully!</span>
                      </div>
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                        We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-gray-900 transition-all focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${
                            errors.name
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600 dark:focus:border-red-400'
                              : 'border-gray-300/50 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:focus:border-blue-400'
                          }`}
                          placeholder="Your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-gray-900 transition-all focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${
                            errors.email
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600 dark:focus:border-red-400'
                              : 'border-gray-300/50 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:focus:border-blue-400'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border bg-white py-3 px-4 text-gray-900 transition-all focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${
                        errors.subject
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600 dark:focus:border-red-400'
                          : 'border-gray-300/50 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:focus:border-blue-400'
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category *
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {categories.map((category) => (
                        <label
                          key={category.value}
                          className={`relative cursor-pointer rounded-xl border p-3 transition-all ${
                            formData.category === category.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:border-blue-400 dark:text-blue-300'
                              : 'border-gray-300/50 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={formData.category === category.value}
                            onChange={handleInputChange}
                            className="sr-only"
                            required
                            aria-required="true"
                          />
                          <div className="flex items-center gap-2">
                            <category.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{category.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full rounded-xl border bg-white py-3 px-4 text-gray-900 transition-all focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${
                        errors.message
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600 dark:focus:border-red-400'
                          : 'border-gray-300/50 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:focus:border-blue-400'
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                    {errors.api && (
                      <div className="text-sm text-red-600 dark:text-red-400">{errors.api}</div>
                    )}
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    variant="gradient"
                    size="lg"
                    className="w-full justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </MagneticButton>
                </form>
              </div>
            </motion.div>

            {/* FAQ / Support Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Quick Support */}
              <div className="rounded-3xl border border-gray-200/50 bg-white/90 p-8 shadow-xl dark:border-white/10 dark:bg-white/5">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Quick Support
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-xl bg-blue-50 p-3 dark:bg-blue-950/20">
                    <Shield className="h-6 w-6 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Order Issues</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track orders, returns, and refunds instantly
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 rounded-xl bg-green-50 p-3 dark:bg-green-950/20">
                    <Truck className="h-6 w-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Shipping</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Free shipping on orders over $99
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 rounded-xl bg-purple-50 p-3 dark:bg-purple-950/20">
                    <Star className="h-6 w-6 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">VIP Support</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Priority support for premium members
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Partnerships */}
              <div className="rounded-3xl border border-gray-200/50 bg-white/90 p-8 shadow-xl dark:border-white/10 dark:bg-white/5">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Business Partnerships
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">B2B Sales & Partnerships</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">International Expansion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">API & Developer Relations</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <MagneticButton
                    variant="outline"
                    size="sm"
                    className="w-full justify-center border-blue-300 text-blue-700 hover:border-blue-500 hover:text-blue-800 dark:border-blue-600 dark:text-blue-300"
                  >
                    <Mail className="h-4 w-4" />
                    partner@Grapdeal.com
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="rounded-3xl border border-blue-200/50 bg-linear-to-br from-blue-50 to-indigo-50 p-6 text-center dark:border-blue-800/50 dark:from-blue-950/20 dark:to-indigo-950/20 lg:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              Still have questions?
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Check out our comprehensive help center or schedule a call with our team.
            </p>
            
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <MagneticButton
                variant="primary"
                size="lg"
              >
                <MessageSquare className="h-5 w-5" />
                Visit Help Center
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                className="border-blue-300 text-blue-700 hover:border-blue-500 hover:text-blue-800"
              >
                <Phone className="h-5 w-5" />
                Schedule a Call
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;