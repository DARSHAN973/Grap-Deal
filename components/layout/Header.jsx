'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import SparkleNavbar from '../ui/SparkleNavbar';
import AuthModal from '../ui/AuthModal';
import { useUser } from '../providers/UserProvider';
import { useCart } from '../providers/CartProvider';

const Header = () => {
  const { user, isAuthenticated, logout, loading } = useUser();
  const { totalItems, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const logoRef = useRef(null);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const searchPlaceholders = [
    "Search for products...",
    "Find your perfect item...",
    "Discover trending items...",
    "What are you looking for?",
    "Search our store..."
  ];

  // Search functionality
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=all&limit=8`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data.all || []);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setShowSearchResults(false);
    }
  };

  const handleResultClick = (result) => {
    setSearchQuery('');
    setShowSearchResults(false);
    window.location.href = result.url;
  };

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

  // Handle clicking outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup search timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const handleCartClick = () => {
    toggleCart();
  };

  const handleLogout = async () => {
    await logout();
    setNotificationMessage('Logged out successfully!');
    setNotificationType('success');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Cart animation effect for totalItems changes
  useEffect(() => {
    if (totalItems > 0) {
      // Simple animation effect when cart items change
      const cartButton = document.querySelector('[data-cart-button]');
      if (cartButton) {
        cartButton.classList.add('animate-pulse');
        setTimeout(() => cartButton.classList.remove('animate-pulse'), 600);
      }
    }
  }, [totalItems]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50">
          <motion.div 
            className={`px-4 py-2 rounded-lg shadow-lg ${
              notificationType === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span>{notificationMessage || 'Added to cart!'}</span>
          </motion.div>
        </div>
      )}

      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/40 dark:border-gray-700/40'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 bg-linear-to-r from-blue-500/8 via-purple-500/8 to-pink-500/8 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5"
          animate={{ 
            background: [
              'linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(147,51,234,0.05) 50%, rgba(236,72,153,0.05) 100%)',
              'linear-gradient(90deg, rgba(236,72,153,0.05) 0%, rgba(59,130,246,0.05) 50%, rgba(147,51,234,0.05) 100%)',
              'linear-gradient(90deg, rgba(147,51,234,0.05) 0%, rgba(236,72,153,0.05) 50%, rgba(59,130,246,0.05) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Adjusted padding for mobile - reduced padding */}
        <div className="relative w-full px-3 py-1 sm:px-5 sm:py-2 lg:px-10 lg:py-2">
          <div className="flex items-center justify-between h-12 lg:h-14">
            
            {/* Left side: Mobile menu button and Logo */}
            <div className="flex items-center gap-2">
              {/* Mobile menu button */}
              <motion.button
                type="button"
                className="lg:hidden relative p-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-white overflow-hidden group"
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 rounded-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <Bars3Icon className="h-5 w-5" />
                  )}
                </motion.div>
              </motion.button>

              {/* Logo - adjusted for mobile */}
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div 
                  ref={logoRef}
                  className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
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
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 opacity-0"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.span 
                    className="text-white font-bold text-lg sm:text-xl lg:text-xl relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    G
                  </motion.span>
                </motion.div>
                
                {/* Hide store name on very small screens, show on sm and up */}
                <div className="hidden xs:block sm:block">
                  <motion.div
                    className="flex flex-col"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span 
                      className="text-base sm:text-xl font-bold text-black dark:text-gray-100 leading-tight"
                      whileHover={{ 
                        background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Grap Deal
                    </motion.span>
                  </motion.div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation with Sparkle Effect */}
            <div className="hidden lg:flex flex-1 justify-center mx-6">
              <SparkleNavbar 
                items={navigation}
                color="#3b82f6"
                className="flex items-center"
              />
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <motion.div 
                ref={searchRef}
                className="relative w-full group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 40 }}
              >
                <form onSubmit={handleSearchSubmit}>
                  <motion.div 
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
                    animate={{ 
                      scale: isSearchFocused ? 1.1 : 1,
                      color: isSearchFocused ? '#3b82f6' : '#9ca3af'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isSearching ? (
                      <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    ) : (
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    )}
                  </motion.div>
                  
                  <motion.input
                    type="text"
                    placeholder={isClient ? searchPlaceholders[placeholderIndex] : "Search for products..."}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      if (searchQuery && searchResults.length > 0) {
                        setShowSearchResults(true);
                      }
                    }}
                    onBlur={() => {
                      setIsSearchFocused(false);
                      // Delay hiding results to allow clicking on them
                      setTimeout(() => setShowSearchResults(false), 200);
                    }}
                    className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm transition-all duration-300 backdrop-blur-sm"
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
                </form>
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-2">
                        {searchResults.map((result, index) => (
                          <motion.div
                            key={`${result.type}-${result.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleResultClick(result)}
                            className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center space-x-3"
                          >
                            {/* Result Image/Icon */}
                            <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                              {result.image ? (
                                <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-6 h-6 text-gray-400">
                                  {result.type === 'product' && <MagnifyingGlassIcon />}
                                  {result.type === 'category' && <div className="w-full h-full bg-gray-300 rounded"></div>}
                                  {result.type === 'service' && <Cog6ToothIcon />}
                                </div>
                              )}
                            </div>
                            
                            {/* Result Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {result.name}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  result.type === 'product' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                  result.type === 'category' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                }`}>
                                  {result.type}
                                </span>
                              </div>
                              {result.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                  {result.description}
                                </p>
                              )}
                              {result.price && (
                                <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">
                                  ₹{result.price.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* View All Results */}
                        <motion.div
                          className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <button
                            onClick={handleSearchSubmit}
                            className="w-full p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                          >
                            View all results for "{searchQuery}"
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 -z-10"
                  animate={{ 
                    opacity: isSearchFocused ? 0.1 : 0,
                    scale: isSearchFocused ? 1.02 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {!isSearchFocused && !searchQuery && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                          animate={{ 
                            scale: 1.3,
                            opacity: 1
                          }}
                          initial={{
                            scale: 1,
                            opacity: 0.3
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right side: Action buttons - Optimized for mobile */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
              {/* Mobile Search button */}
              <motion.button 
                onClick={toggleMobileSearch}
                className="md:hidden relative p-2 text-gray-600 dark:text-gray-300 rounded-xl overflow-visible group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 rounded-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <MagnifyingGlassIcon className="h-5 w-5 relative z-10 group-hover:text-white transition-colors" />
              </motion.button>

              {/* Cart Button - Mobile optimized */}
              <motion.button 
                onClick={handleCartClick}
                data-cart-button
                className="group relative p-2 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg overflow-visible transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  className="relative z-10 flex items-center gap-1 sm:gap-2"
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeOut"
                  }}
                >
                  <ShoppingCartIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200" />
                  {/* Hide cart text on mobile, show on sm screens */}
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 hidden sm:inline">
                    Cart
                  </span>
                </motion.div>
                
                {/* Cart count badge */}
                {totalItems > 0 && (
                  <motion.span 
                    className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 bg-linear-to-br from-red-500 to-pink-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white dark:border-gray-800 z-20" 
                    style={{ transformOrigin: 'center' }}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 700, damping: 25 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Auth Buttons - Conditional rendering based on authentication */}
              {!loading && (
                isAuthenticated ? (
                  // Authenticated state: Account icon and Logout button
                  <div className="flex items-center gap-2">
                    {/* Account Icon */}
                    <Link href="/account">
                      <motion.button 
                        className="group relative p-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        title="My Account"
                      >
                        <motion.span 
                          className="relative z-10 flex items-center justify-center"
                          whileHover={{ y: -1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <UserIcon className="h-5 w-5" />
                        </motion.span>
                      </motion.button>
                    </Link>

                    {/* Logout Icon */}
                    <motion.button 
                      onClick={handleLogout}
                      className="group relative p-2 bg-linear-to-r from-red-500 to-pink-600 text-white rounded-xl font-medium overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      title="Logout"
                    >
                      <motion.span 
                        className="relative z-10 flex items-center justify-center"
                        whileHover={{ y: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      </motion.span>
                    </motion.button>
                  </div>
                ) : (
                  // Non-authenticated state: Login button
                  <motion.button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="group relative p-2 sm:px-3 sm:py-2 lg:px-6 lg:py-2.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-medium overflow-hidden"
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
                    <motion.span 
                      className="relative z-10 flex items-center justify-center gap-1"
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <UserIcon className="h-5 w-5" />
                      {/* Show text only on larger screens */}
                      <span className="hidden sm:inline text-sm lg:text-base">Login</span>
                    </motion.span>
                  </motion.button>
                )
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu - NO LOGIN BUTTON HERE since it's in the main header */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            // Fix: make mobile menu fixed to viewport so it opens at the current scroll position
            className="lg:hidden fixed left-0 right-0 top-12 z-60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 overflow-hidden max-h-[calc(100vh-3rem)]"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {/* Mobile navigation - only navigation links, no action buttons */}
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.05 + (index * 0.05), 
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
                      className="px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100"
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100"
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
              
              {/* Optional: Add account-related links here instead of duplicate login button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 400,
                  damping: 40
                }}
                className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700"
              >
                <Link
                  href="/account"
                  className="group block relative overflow-hidden rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.div
                    className="px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-3"
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <UserIcon className="h-5 w-5 relative z-10" />
                    <span className="relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      My Account
                    </span>
                  </motion.div>
                </Link>
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
                  <form onSubmit={(e) => { handleSearchSubmit(e); toggleMobileSearch(); }}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      {isSearching ? (
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      ) : (
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder={isClient ? searchPlaceholders[placeholderIndex] : "Search for products..."}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => {
                        setIsSearchFocused(true);
                        if (searchQuery && searchResults.length > 0) {
                          setShowSearchResults(true);
                        }
                      }}
                      className="w-full pl-14 pr-6 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-base"
                      autoFocus
                    />
                  </form>
                </div>
              </div>

              {/* Mobile Search Results */}
              {(showSearchResults || searchQuery.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 max-h-96 overflow-y-auto space-y-2"
                >
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.map((result, index) => (
                        <motion.div
                          key={`mobile-${result.type}-${result.id}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => { handleResultClick(result); toggleMobileSearch(); }}
                          className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center space-x-3"
                        >
                          {/* Result Image/Icon */}
                          <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            {result.image ? (
                              <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-6 h-6 text-gray-400">
                                {result.type === 'product' && <MagnifyingGlassIcon />}
                                {result.type === 'category' && <div className="w-full h-full bg-gray-300 rounded"></div>}
                                {result.type === 'service' && <Cog6ToothIcon />}
                              </div>
                            )}
                          </div>
                          
                          {/* Result Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {result.name}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                result.type === 'product' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                result.type === 'category' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              }`}>
                                {result.type}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {result.description}
                              </p>
                            )}
                            {result.price && (
                              <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">
                                ₹{result.price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* View All Results - Mobile */}
                      <motion.div
                        className="border-t border-gray-200 dark:border-gray-700 pt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <button
                          onClick={(e) => { handleSearchSubmit(e); toggleMobileSearch(); }}
                          className="w-full p-3 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                        >
                          View all results for "{searchQuery}"
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    searchQuery.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No results found for "{searchQuery}"</p>
                        <p className="text-xs mt-1">Try searching for something else</p>
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;