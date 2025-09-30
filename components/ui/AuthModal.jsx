'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const modalRef = useRef();
  const formRef = useRef();
  const switchRef = useRef();
  const particlesRef = useRef();
  const backdropRef = useRef();
  const heroIconRef = useRef();

  // Advanced GSAP Animations
  useGSAP(() => {
    if (isOpen && modalRef.current) {
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set(modalRef.current, { opacity: 0, scale: 0.7, y: 100, rotationY: -15 });
      gsap.set('.modal-particle', { opacity: 0, scale: 0, y: 100 });
      gsap.set('.form-field', { opacity: 0, x: -50, rotationX: -10 });
      gsap.set('.modal-header > *', { opacity: 0, y: 30 });
      
      // Backdrop animation
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      
      // Modal entrance with 3D effect
      .to(modalRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'back.out(1.4)'
      }, '-=0.2')
      
      // Floating particles
      .to('.modal-particle', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        stagger: {
          amount: 0.6,
          from: 'random'
        },
        ease: 'power2.out'
      }, '-=0.6')
      
      // Header elements
      .to('.modal-header > *', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.8')
      
      // Form fields with 3D rotation
      .to('.form-field', {
        opacity: 1,
        x: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4');

      // Continuous floating animation for particles
      gsap.to('.modal-particle', {
        y: '-=20',
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 1,
          from: 'random'
        }
      });

      // Hero icon pulse animation
      gsap.to(heroIconRef.current, {
        scale: 1.1,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });
    }
  }, { dependencies: [isOpen] });

  // Form switch animation with morphing effect
  useGSAP(() => {
    if (switchRef.current) {
      const tl = gsap.timeline();
      
      tl.to('.form-field', {
        x: isLogin ? 0 : -20,
        opacity: 0.7,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to('.form-field', {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.2)'
      });
    }
  }, { dependencies: [isLogin] });

  // Success animation
  useGSAP(() => {
    if (isSuccess) {
      const tl = gsap.timeline();
      
      tl.to(formRef.current, {
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to('.success-checkmark', {
        scale: 1.2,
        rotation: 360,
        duration: 0.6,
        ease: 'back.out(1.4)'
      })
      .to(formRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, { dependencies: [isSuccess] });

  // Input validation
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? '' 
          : 'Please enter a valid email address';
      case 'password':
        return value.length >= 6 
          ? '' 
          : 'Password must be at least 6 characters';
      case 'confirmPassword':
        return !isLogin && value !== formData.password 
          ? 'Passwords do not match' 
          : '';
      case 'name':
        return !isLogin && value.trim().length < 2 
          ? 'Name must be at least 2 characters' 
          : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (touchedFields[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (isLogin && (key === 'name' || key === 'confirmPassword')) return;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      
      // Error shake animation
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: 'power2.out'
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Success celebration animation
      const tl = gsap.timeline();
      tl.to('.modal-particle', {
        scale: 1.5,
        y: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
      });
      
      // Close modal after success
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setTouchedFields({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Enhanced Backdrop with Gradient */}
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-blue-900/40 backdrop-blur-xl"
            style={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Floating Particles */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="modal-particle absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 4}px`,
                  height: `${Math.random() * 6 + 4}px`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-60 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Main Modal */}
          <div
            ref={modalRef}
            className="relative w-full max-w-md"
            style={{ perspective: '1000px' }}
          >
            {/* Modal Container with Glass Effect */}
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 dark:from-purple-400/10 dark:via-blue-400/10 dark:to-pink-400/10" />
              
              {/* Dynamic Border Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 p-[1px]">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-3xl" />
              </div>

              <div className="modal-content relative z-10">
                {/* Enhanced Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 group"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" />
                </button>

                {/* Success Overlay */}
                {isSuccess && (
                  <motion.div
                    className="absolute inset-0 bg-green-500/90 backdrop-blur-sm rounded-3xl flex items-center justify-center z-30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'back.out(1.4)' }}
                  >
                    <div className="text-center text-white">
                      <CheckCircleIcon className="success-checkmark w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Success!</h3>
                      <p className="text-green-100">
                        {isLogin ? 'Welcome back!' : 'Account created successfully!'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Header Section */}
                <div className="modal-header relative px-8 pt-8 pb-6 text-center">
                  {/* Hero Icon with Advanced Animation */}
                  <div
                    ref={heroIconRef}
                    className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl shadow-lg"
                  >
                    <div className="relative">
                      <SparklesIcon className="w-10 h-10 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse" />
                    </div>
                  </div>

                  {/* Dynamic Title with Better Typography */}
                  <motion.h2 
                    className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent mb-3"
                    key={isLogin ? 'login' : 'register'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {isLogin ? 'Welcome Back!' : 'Join Our Community!'}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 text-lg"
                    key={`${isLogin}-subtitle`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {isLogin ? 'Enter your credentials to continue' : 'Create your account and start shopping'}
                  </motion.p>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <ShieldCheckIcon className="w-4 h-4 text-green-500" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span>Trusted</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Form Section */}
                <div className="px-8 pb-8">
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div ref={switchRef}>
                      {/* Name Field - Only for register */}
                      {!isLogin && (
                        <motion.div
                          className="form-field"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              placeholder="Full Name"
                              className={`w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 border-2 rounded-2xl backdrop-blur-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white ${
                                errors.name 
                                  ? 'border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/20' 
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            />
                            {errors.name && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute top-full left-0 mt-2 p-2 bg-red-500 text-white text-sm rounded-lg shadow-lg flex items-center gap-2"
                              >
                                <ExclamationTriangleIcon className="w-4 h-4" />
                                {errors.name}
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Email Field */}
                      <div className="form-field relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder="Email Address"
                          className={`w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 border-2 rounded-2xl backdrop-blur-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white ${
                            errors.email 
                              ? 'border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/20' 
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        />
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute top-full left-0 mt-2 p-2 bg-red-500 text-white text-sm rounded-lg shadow-lg flex items-center gap-2 z-10"
                          >
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            {errors.email}
                          </motion.div>
                        )}
                      </div>

                      {/* Password Field */}
                      <div className="form-field relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder="Password"
                          className={`w-full pl-12 pr-14 py-4 bg-white/50 dark:bg-gray-800/50 border-2 rounded-2xl backdrop-blur-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white ${
                            errors.password 
                              ? 'border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/20' 
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                        {errors.password && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute top-full left-0 mt-2 p-2 bg-red-500 text-white text-sm rounded-lg shadow-lg flex items-center gap-2 z-10"
                          >
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            {errors.password}
                          </motion.div>
                        )}
                      </div>

                      {/* Confirm Password Field - Only for register */}
                      {!isLogin && (
                        <motion.div
                          className="form-field"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                            </div>
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              placeholder="Confirm Password"
                              className={`w-full pl-12 pr-14 py-4 bg-white/50 dark:bg-gray-800/50 border-2 rounded-2xl backdrop-blur-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white ${
                                errors.confirmPassword 
                                  ? 'border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/20' 
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </button>
                            {errors.confirmPassword && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute top-full left-0 mt-2 p-2 bg-red-500 text-white text-sm rounded-lg shadow-lg flex items-center gap-2 z-10"
                              >
                                <ExclamationTriangleIcon className="w-4 h-4" />
                                {errors.confirmPassword}
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Forgot Password - Only for login */}
                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors font-medium"
                        >
                          Forgot your password?
                        </button>
                      </div>
                    )}

                    {/* Enhanced Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-3">
                        {isLoading ? (
                          <>
                            <motion.div
                              className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>

                  {/* Switch Mode */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                      <button
                        onClick={switchMode}
                        className="ml-2 text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-semibold transition-colors hover:underline"
                      >
                        {isLogin ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>

                  {/* Enhanced Social Login */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white/80 dark:bg-gray-900/80 text-gray-500 dark:text-gray-400 backdrop-blur-sm rounded-full">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;