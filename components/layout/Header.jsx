'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const logoRef = useRef(null);

  const searchPlaceholders = [
    "Search for products...",
    "Find your perfect item...",
    "Discover trending items...",
    "What are you looking for?",
    "Search our store..."
  ];

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll effect - only run on client
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Animated placeholder text - only run on client
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isClient]);

  // Logo hover animation - only run on client
  useEffect(() => {
    if (!isClient) return;
    
    const logo = logoRef.current;
    if (!logo) return;

    const handleMouseEnter = () => {
      logo.style.transform = 'rotate(360deg) scale(1.1)';
    };
    
    const handleMouseLeave = () => {
      logo.style.transform = 'rotate(0deg) scale(1)';
    };

    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const handleCartClick = () => {
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 600);
  };

  // Demo function for cart animation
  const handleCartDemo = () => {
    setCartCount(prev => prev + 1);
    setShowCartAnimation(true);
    setShowNotification(true);
    setTimeout(() => {
      setShowCartAnimation(false);
      setShowNotification(false);
    }, 2000);
  };

  // Trigger small cart pop when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      setShowCartAnimation(true);
      const t = setTimeout(() => setShowCartAnimation(false), 800);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Cart notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            <span>Added to cart!</span>
          </div>
        </div>
      )}

      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl' 
          : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm'
        } border-b border-gray-200/30 dark:border-gray-700/30`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
          animate={{ 
            background: [
              'linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(147,51,234,0.05) 50%, rgba(236,72,153,0.05) 100%)',
              'linear-gradient(90deg, rgba(236,72,153,0.05) 0%, rgba(59,130,246,0.05) 50%, rgba(147,51,234,0.05) 100%)',
              'linear-gradient(90deg, rgba(147,51,234,0.05) 0%, rgba(236,72,153,0.05) 50%, rgba(59,130,246,0.05) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Full-bleed header so search can use entire width */}
        <div className="relative w-full px-6 sm:px-8 lg:px-12 overflow-visible">
          <div className="flex items-center justify-between h-14 lg:h-16">
            
            {/* Mobile menu button with ReactBits animation */}
            <div className="flex lg:hidden">
              <motion.button
                type="button"
                className="relative p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-white overflow-hidden group"
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 rounded-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Icon with rotation animation */}
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Enhanced Logo with ReactBits animations - Flexible for future changes */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-4 group">
                {/* Logo Container - Easy to replace with image later */}
                <motion.div 
                  ref={logoRef}
                  className="relative w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    rotate: { duration: 0.6 }
                  }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Current: Text Logo | Future: Replace with <img src="/logo.png" alt="Your Store" className="w-8 h-8 object-contain relative z-10" /> */}
                  <motion.span 
                    className="text-white font-bold text-xl relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    E
                  </motion.span>
                </motion.div>
                
                {/* Website Name - Easy to modify for different store names */}
                <div className="hidden sm:block">
                  <motion.div
                    className="flex flex-col"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Main Store Name - Change this for different websites */}
                    <motion.span 
                      className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight"
                      whileHover={{ 
                        background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      YourStore
                    </motion.span>
                    {/* Optional tagline */}
                    <span className="text-xs text-gray-600 dark:text-gray-400 leading-none">
                      E-Commerce
                    </span>
                  </motion.div>
                </div>
              </Link>
            </div>

          {/* Enhanced Desktop Navigation with ReactBits animations */}
          <nav className="hidden lg:flex items-center space-x-3 flex-none flex-nowrap ml-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 40
                }}
              >
                <Link
                  href={item.href}
                  className="group relative block"
                >
                  <motion.div
                    className="relative px-6 py-2.5 text-base font-semibold text-gray-700 dark:text-gray-300 rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, rotate: 0 }}
                      whileHover={{ scale: 1, rotate: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full opacity-0 group-hover:opacity-100"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeInOut",
                        repeat: 0
                      }}
                    />
                    
                    {/* Text */}
                    <motion.span 
                      className="relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap"
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item.name}
                    </motion.span>
                    
                    {/* Bottom line animation */}
                    <motion.div
                      className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ width: 0, x: '-50%' }}
                      whileHover={{ width: '80%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Enhanced Search Bar with ReactBits animations */}
          {/* Wider search on desktop: increased max width and spacing. Allow shrink so nav doesn't wrap */}
          {/* Make search bar fill remaining space between logo/nav and actions */}
          <div className="hidden md:flex flex-1 md:mx-6 lg:mx-12">
              <motion.div 
              className="relative w-full group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 40 }}
            >
              {/* Search icon */}
              <motion.div 
                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
                animate={{ 
                  scale: isSearchFocused ? 1.1 : 1,
                  color: isSearchFocused ? '#3b82f6' : '#9ca3af'
                }}
                transition={{ duration: 0.2 }}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </motion.div>
              
              {/* Input field */}
              <motion.input
                type="text"
                placeholder={isClient ? searchPlaceholders[placeholderIndex] : "Search for products..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-16 pr-6 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg transition-all duration-300 backdrop-blur-sm"
                whileFocus={{
                  scale: 1.02,
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                }}
                whileHover={{
                  borderColor: '#8b5cf6',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 -z-10"
                animate={{ 
                  opacity: isSearchFocused ? 0.1 : 0,
                  scale: isSearchFocused ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating dots when not focused */}
              {!isSearchFocused && !searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Enhanced Right side actions */}
          <div className="flex items-center space-x-6 pr-2">
            {/* Mobile Search button */}
            <motion.button 
              onClick={toggleMobileSearch}
              className="md:hidden relative p-3.5 text-gray-600 dark:text-gray-300 rounded-xl overflow-visible group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <MagnifyingGlassIcon className="h-6 w-6 relative z-10 group-hover:text-white transition-colors" />
            </motion.button>

            {/* Modern Cart Button - Dark/Light Compatible */}
            <motion.button 
              onClick={handleCartClick}
              className="group relative px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg overflow-visible transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)"
              }}
              whileTap={{ scale: 0.98 }}
              animate={showCartAnimation ? { 
                rotate: [0, -8, 8, -6, 6, 0],
                scale: [1, 1.12, 1]
              } : {}}
              transition={{ 
                type: "spring",   
                stiffness: 500, 
                damping: 18,
                duration: showCartAnimation ? 0.8 : 0.2
              }}
            >
              {/* Subtle hover gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 rounded-2xl"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Ring pop when cart updates */}
              {showCartAnimation && (
                <motion.span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ opacity: 0.8, scale: 0.9 }}
                  animate={{ opacity: 0, scale: 1.6 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ boxShadow: '0 0 0 4px rgba(99,102,241,0.08), inset 0 0 0 1px rgba(99,102,241,0.06)' }}
                />
              )}

              {/* Particle burst + animated cart icon */}
              {showCartAnimation && (
                <>
                  {[
                    { x: -28, y: -6, size: 6, color: 'bg-yellow-400', d: 0 },
                    { x: -16, y: -18, size: 8, color: 'bg-blue-300', d: 0.03 },
                    { x: 0, y: -24, size: 10, color: 'bg-pink-400', d: 0.05 },
                    { x: 16, y: -16, size: 8, color: 'bg-green-300', d: 0.08 },
                    { x: 28, y: -6, size: 6, color: 'bg-purple-300', d: 0.1 }
                  ].map((p, idx) => (
                    <motion.span
                      key={idx}
                      className={`${p.color} absolute rounded-full`}
                      style={{ left: '50%', transform: 'translateX(-50%)', height: p.size, width: p.size }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [1, 0], scale: [1, 1.8], x: p.x, y: p.y }}
                      transition={{ duration: 0.7, delay: p.d, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}

              <motion.div
                className="relative z-10 flex items-center space-x-2.5"
                animate={showCartAnimation ? { scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] } : {}}
                transition={{ duration: 0.75, type: 'spring', stiffness: 700, damping: 18 }}
              >
                <div className="relative">
                  <ShoppingCartIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  Cart
                </span>
              </motion.div>
              
              {/* Modern cart count badge */}
              {cartCount > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white dark:border-gray-800 z-20" 
                  style={{ transformOrigin: 'center' }}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: [1.3, 1], rotate: [0, 0] }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 700, damping: 25 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Enhanced Login Button with ReactBits animations */}
            <motion.button 
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-medium overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                backgroundSize: '200% 200%'
              }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                    'linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)',
                    'linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full opacity-0 group-hover:opacity-100"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: 0
                }}
              />
              
              {/* Button content */}
              <motion.span 
                className="relative z-10 flex items-center space-x-2"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <UserIcon className="h-5 w-5" />
                <span>Login</span>
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu with ReactBits animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pt-6 pb-8 space-y-6">
              {/* Mobile search with animation */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={isClient ? searchPlaceholders[placeholderIndex] : "Search for products..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-base"
                />
              </motion.div>

              {/* Mobile navigation with staggered animation */}
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.2 + (index * 0.1), 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 400,
                      damping: 40
                    }}
                  >
                    <Link
                      href={item.href}
                      className="group block relative overflow-hidden rounded-xl"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        className="px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-300"
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        {/* Hover background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        
                        <span className="relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.name}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile login button with animation */}
              <motion.div 
                className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <motion.button 
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-medium overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 2,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <UserIcon className="h-5 w-5" />
                    <span>Login</span>
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobileSearch}
          >
            <motion.div 
              className="bg-white dark:bg-gray-900 w-full px-4 py-6"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleMobileSearch}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={isClient ? searchPlaceholders[placeholderIndex] : "Search for products..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-base"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
};

export default Header;