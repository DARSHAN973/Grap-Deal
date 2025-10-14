'use client';'use client';'use client';



import { useState, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

import {import { useState, useEffect, useRef } from 'react';import { useState, useEffect, useRef } from 'react';

  Smartphone,

  Shirt,import { motion, AnimatePresence } from 'framer-motion';import { motion, AnimatePresence } from 'framer-motion';

  Home,

  Heart,import {import {

  Gamepad2,

  Car,  Smartphone,  Smartphone,

  Laptop,

  Watch,  Shirt,  Shirt,

  Camera,

  Headphones,  Home,  Home,

  Package,

  ArrowRight,  Heart,  Heart,

} from 'lucide-react';

import { useGSAP } from '@gsap/react';  Gamepad2,  Gamepad2,

import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';  Car,  Car,

import Image from 'next/image';

  Laptop,  Laptop,

// Register GSAP plugins

if (typeof window !== 'undefined') {  Watch,  Watch,

  gsap.registerPlugin(ScrollTrigger);

}  Camera,  Camera,



// Default icon mapping for categories  Headphones,  Headphones,

const defaultIcons = {

  'Electronics': Smartphone,  Gift,  Gift,

  'Fashion': Shirt,

  'Home & Garden': Home,  Sparkles,  Sparkles,

  'Beauty': Heart,

  'Gaming': Gamepad2,  TrendingUp,  TrendingUp,

  'Automotive': Car,

  'Computers': Laptop,  Flame,  Flame,

  'Watches': Watch,

  'Cameras': Camera,  Package,  Package,

  'Audio': Headphones,

  'default': Package  ArrowRight,  ArrowRight,

};

} from 'lucide-react';} from 'lucide-react';

const CategoryCard = ({ category, index }) => {

  const [isLoading, setIsLoading] = useState(true);import { useGSAP } from '@gsap/react';import { useGSAP } from '@gsap/react';

  const cardRef = useRef(null);

import gsap from 'gsap';import gsap from 'gsap';

  useEffect(() => {

    const timer = setTimeout(() => setIsLoading(false), 100 + index * 50);import { ScrollTrigger } from 'gsap/ScrollTrigger';import { ScrollTrigger } from 'gsap/ScrollTrigger';

    return () => clearTimeout(timer);

  }, [index]);import MagneticButton from '../ui/MagneticButton';import MagneticButton from '../ui/MagneticButton';



  useGSAP(() => {import Image from 'next/image';import Image from 'next/image';

    if (!isLoading && cardRef.current) {

      gsap.fromTo(

        cardRef.current,

        {// Register GSAP plugins// Register GSAP plugins

          opacity: 0,

          y: 50,if (typeof window !== 'undefined') {if (typeof window !== 'undefined') {

        },

        {  gsap.registerPlugin(ScrollTrigger);  gsap.registerPlugin(ScrollTrigger);

          opacity: 1,

          y: 0,}}

          duration: 0.6,

          ease: 'power2.out',

          delay: index * 0.1,

        }// Default icon mapping for categories// Default icon mapping for categories

      );

    }const defaultIcons = {const defaultIcons = {

  }, [isLoading, index]);

  'Electronics': Smartphone,  'Electronics': Smartphone,

  if (isLoading) {

    return (  'Fashion': Shirt,  'Fashion': Shirt,

      <div className="group relative overflow-hidden rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse">

        <div className="aspect-square bg-gradient-to-br from-gray-300/50 to-gray-400/50 dark:from-gray-700/50 dark:to-gray-600/50" />  'Home & Garden': Home,  'Home & Garden': Home,

        <div className="absolute inset-0 flex items-end p-4">

          <div className="w-full space-y-2">  'Beauty': Heart,  'Beauty': Heart,

            <div className="h-4 bg-white/70 dark:bg-gray-600/70 rounded w-3/4" />

            <div className="h-3 bg-white/50 dark:bg-gray-600/50 rounded w-1/2" />  'Gaming': Gamepad2,  'Gaming': Gamepad2,

          </div>

        </div>  'Automotive': Car,  'Automotive': Car,

      </div>

    );  'Computers': Laptop,  'Computers': Laptop,

  }

  'Watches': Watch,  'Watches': Watch,

  return (

    <motion.div  'Cameras': Camera,  'Cameras': Camera,

      ref={cardRef}

      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900"  'Audio': Headphones,  'Audio': Headphones,

      whileHover={{ scale: 1.02 }}

      whileTap={{ scale: 0.98 }}  'default': Package  'default': Package

    >

      {/* Image */}};};

      <div className="relative aspect-square overflow-hidden">

        {category.image ? (

          <Image

            src={category.image}const CategoryCard = ({ category, index }) => {const CategoriesPage = () => {

            alt={category.name}

            fill  const [isLoading, setIsLoading] = useState(true);  const [categories, setCategories] = useState([]);

            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"

          />  const cardRef = useRef(null);  const [loading, setLoading] = useState(true);

        ) : (

          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">  const [selectedFilter, setSelectedFilter] = useState('All');

            {(() => {

              const IconComponent = defaultIcons[category.name] || defaultIcons.default;  useEffect(() => {  const [searchQuery, setSearchQuery] = useState('');

              return <IconComponent className="h-16 w-16 text-gray-400" />;

            })()}    const timer = setTimeout(() => setIsLoading(false), 100 + index * 50);  const heroRef = useRef();

          </div>

        )}    return () => clearTimeout(timer);

        

        {/* Gradient Overlay */}  }, [index]);  // Fetch categories from API

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          useEffect(() => {

        {/* Hover Overlay */}

        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />  useGSAP(() => {    const fetchCategories = async () => {

      </div>

    if (!isLoading && cardRef.current) {      try {

      {/* Content */}

      <div className="absolute inset-0 flex items-end p-4">      gsap.fromTo(        const response = await fetch('/api/categories');

        <div className="w-full text-white">

          <div className="flex items-center gap-2 mb-2">        cardRef.current,        if (response.ok) {

            {(() => {

              const IconComponent = defaultIcons[category.name] || defaultIcons.default;        {          const data = await response.json();

              return <IconComponent className="h-5 w-5" />;

            })()}          opacity: 0,          // Only show active categories on frontend

            <span className="text-sm opacity-90">{category.productCount || 0}+ products</span>

          </div>          y: 50,          const activeCategories = data.filter(category => category.isActive);

          <h3 className="text-xl font-bold leading-tight mb-1">

            {category.name}        },          setCategories(activeCategories);

          </h3>

                  {        } else {

          {/* Hover CTA */}

          <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">          opacity: 1,          console.error('Failed to fetch categories');

            <div className="flex items-center gap-2 text-sm font-medium">

              <span>Shop Now</span>          y: 0,        }

              <ArrowRight className="h-4 w-4" />

            </div>          duration: 0.6,      } catch (error) {

          </div>

        </div>          ease: 'power2.out',        console.error('Error fetching categories:', error);

      </div>

    </motion.div>          delay: index * 0.1,      } finally {

  );

};        }        setLoading(false);



const CategoriesPage = () => {      );      }

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);    }    };

  const [searchQuery, setSearchQuery] = useState('');

  const heroRef = useRef();  }, [isLoading, index]);



  // Fetch categories from API    fetchCategories();

  useEffect(() => {

    const fetchCategories = async () => {  if (isLoading) {  }, []);

      try {

        const response = await fetch('/api/categories');    return (

        if (response.ok) {

          const data = await response.json();      <div className="group relative overflow-hidden rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse">  // Filter categories based on search and filter

          // Only show active categories on frontend

          const activeCategories = data.filter(category => category.isActive);        <div className="aspect-square bg-gradient-to-br from-gray-300/50 to-gray-400/50 dark:from-gray-700/50 dark:to-gray-600/50" />  const filteredCategories = categories.filter(category => {

          setCategories(activeCategories);

        } else {        <div className="absolute inset-0 flex items-end p-4">    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());

          console.error('Failed to fetch categories');

        }          <div className="w-full space-y-2">    const matchesFilter = selectedFilter === 'All' || selectedFilter === 'all';

      } catch (error) {

        console.error('Error fetching categories:', error);            <div className="h-4 bg-white/70 dark:bg-gray-600/70 rounded w-3/4" />    return matchesSearch && matchesFilter;

      } finally {

        setLoading(false);            <div className="h-3 bg-white/50 dark:bg-gray-600/50 rounded w-1/2" />  });

      }

    };          </div>



    fetchCategories();        </div>  // Filter options

  }, []);

      </div>  const filterPills = [

  // Filter categories based on search

  const filteredCategories = categories.filter(category => {    );    { id: 'all', label: 'All Categories' },

    return category.name.toLowerCase().includes(searchQuery.toLowerCase());

  });  }    { id: 'active', label: 'Active' }



  // GSAP animations for hero section  ];

  useGSAP(() => {

    if (heroRef.current) {  return (

      const tl = gsap.timeline();

          <motion.divconst CategoryCard = ({ category, index }) => {

      tl.from('.hero-badge', {

        duration: 0.8,      ref={cardRef}  const [isLoading, setIsLoading] = useState(true);

        y: 30,

        opacity: 0,      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900"  const cardRef = useRef(null);

        ease: 'power2.out'

      })      whileHover={{ scale: 1.02 }}

      .from('.hero-title', {

        duration: 1,      whileTap={{ scale: 0.98 }}  useEffect(() => {

        y: 50,

        opacity: 0,    >    const timer = setTimeout(() => setIsLoading(false), 100 + index * 50);

        ease: 'power2.out'

      }, '-=0.4')      {/* Image */}    return () => clearTimeout(timer);

      .from('.hero-subtitle', {

        duration: 0.8,      <div className="relative aspect-square overflow-hidden">  }, [index]);

        y: 30,

        opacity: 0,        {category.image ? (

        ease: 'power2.out'

      }, '-=0.6')          <Image  useGSAP(() => {

      .from('.hero-stats', {

        duration: 0.6,            src={category.image}    if (!isLoading && cardRef.current) {

        y: 20,

        opacity: 0,            alt={category.name}      gsap.fromTo(

        ease: 'power2.out'

      }, '-=0.4');            fill        cardRef.current,

    }

  }, []);            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"        {



  if (loading) {          />          opacity: 0,

    return (

      <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">        ) : (          y: 30,

        <div className="flex items-center justify-center min-h-screen">

          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">          scale: 0.95,

        </div>

      </main>            {(() => {        },

    );

  }              const IconComponent = defaultIcons[category.name] || defaultIcons.default;        {



  return (              return <IconComponent className="h-16 w-16 text-gray-400" />;          opacity: 1,

    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* Hero Section */}            })()}          y: 0,

      <section ref={heroRef} className="relative overflow-hidden py-20 lg:py-32">

        {/* Floating Elements */}          </div>          scale: 1,

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl" />        )}          duration: 0.6,

          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />

        </div>                  delay: index * 0.08,



        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1400px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">        {/* Gradient Overlay */}          ease: 'power2.out',

          <div className="space-y-6">

            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />        }

              <Package className="h-4 w-4 text-violet-500" />

              Shop by Category              );

            </span>

                    {/* Hover Overlay */}    }

            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">

              Shop by Category        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />  }, [isLoading, index]);

            </h1>

                  </div>

            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 lg:text-xl">

              Explore trending collections across Fashion, Electronics, Beauty & more  if (isLoading) {

            </p>

      {/* Content */}    return (

            {/* Quick Stats */}

            <div className="hero-stats flex items-center justify-center gap-8 pt-4">      <div className="absolute inset-0 flex items-end p-4">      <div className="group relative overflow-hidden rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse">

              <div className="text-center">

                <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</div>        <div className="w-full text-white">        <div className="aspect-square bg-gradient-to-br from-gray-300/50 to-gray-400/50 dark:from-gray-700/50 dark:to-gray-600/50" />

                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>

              </div>          <div className="flex items-center gap-2 mb-2">        <div className="absolute inset-0 flex items-end p-4">

              <div className="text-center">

                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>            {(() => {          <div className="w-full space-y-2">

                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>

              </div>              const IconComponent = defaultIcons[category.name] || defaultIcons.default;            <div className="h-4 bg-white/70 dark:bg-gray-600/70 rounded w-3/4" />

              <div className="text-center">

                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>              return <IconComponent className="h-5 w-5" />;            <div className="h-3 bg-white/50 dark:bg-gray-600/50 rounded w-1/2" />

                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>

              </div>            })()}          </div>

            </div>

          </div>            <span className="text-sm opacity-90">{category.productCount || 0}+ products</span>        </div>

        </div>

      </section>          </div>      </div>



      {/* Categories Grid */}          <h3 className="text-xl font-bold leading-tight mb-1">    );

      <section className="relative py-16">

        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">            {category.name}  }

          <motion.div

            className="mb-12 text-center"          </h3>

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}            return (

            viewport={{ once: true }}

            transition={{ duration: 0.6 }}          {/* Hover CTA */}    <motion.div

          >

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">          <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">      ref={cardRef}

              Browse Categories

            </h2>            <div className="flex items-center gap-2 text-sm font-medium">      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900"

            <p className="mt-4 text-gray-600 dark:text-gray-400">

              Find exactly what you're looking for              <span>Shop Now</span>      whileHover={{ scale: 1.02 }}

            </p>

          </motion.div>              <ArrowRight className="h-4 w-4" />      whileTap={{ scale: 0.98 }}



          {/* Search Input */}            </div>    >

          <div className="mb-8 flex justify-center">

            <input          </div>      {/* Image */}

              type="text"

              placeholder="Search categories..."        </div>      <div className="relative aspect-square overflow-hidden">

              value={searchQuery}

              onChange={(e) => setSearchQuery(e.target.value)}      </div>        {category.image ? (

              className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"

            />    </motion.div>          <Image

          </div>

  );            src={category.image}

          {/* Responsive Grid */}

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">};            alt={category.name}

            {filteredCategories.map((category, index) => (

              <CategoryCard key={category.id} category={category} index={index} />            fill

            ))}

          </div>const CategoriesPage = () => {            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"



          {/* No Results */}  const [categories, setCategories] = useState([]);          />

          {filteredCategories.length === 0 && !loading && (

            <motion.div  const [loading, setLoading] = useState(true);        ) : (

              className="py-16 text-center"

              initial={{ opacity: 0 }}  const [selectedFilter, setSelectedFilter] = useState('All');          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">

              animate={{ opacity: 1 }}

              transition={{ duration: 0.5 }}  const [searchQuery, setSearchQuery] = useState('');            {(() => {

            >

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">  const heroRef = useRef();              const IconComponent = defaultIcons[category.name] || defaultIcons.default;

                <Package className="h-8 w-8 text-gray-400" />

              </div>              return <IconComponent className="h-16 w-16 text-gray-400" />;

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No categories found</h3>

              <p className="mt-2 text-gray-600 dark:text-gray-400">  // Fetch categories from API            })()}

                Try adjusting your search query

              </p>  useEffect(() => {          </div>

            </motion.div>

          )}    const fetchCategories = async () => {        )}

        </div>

      </section>      try {        

    </main>

  );        const response = await fetch('/api/categories');        {/* Gradient Overlay */}

};

        if (response.ok) {        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

export default CategoriesPage;
          const data = await response.json();        

          // Only show active categories on frontend        {/* Hover Overlay */}

          const activeCategories = data.filter(category => category.isActive);        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          setCategories(activeCategories);      </div>

        } else {

          console.error('Failed to fetch categories');      {/* Content */}

        }      <div className="absolute inset-0 flex items-end p-4">

      } catch (error) {        <div className="w-full text-white">

        console.error('Error fetching categories:', error);          <div className="flex items-center gap-2 mb-2">

      } finally {            {(() => {

        setLoading(false);              const IconComponent = defaultIcons[category.name] || defaultIcons.default;

      }              return <IconComponent className="h-5 w-5" />;

    };            })()}

            <span className="text-sm opacity-90">{category.productCount || 0}+ products</span>

    fetchCategories();          </div>

  }, []);          <h3 className="text-xl font-bold leading-tight mb-1">

            {category.name}

  // Filter categories based on search and filter          </h3>

  const filteredCategories = categories.filter(category => {          

    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());          {/* Hover CTA */}

    const matchesFilter = selectedFilter === 'All' || selectedFilter === 'all';          <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

    return matchesSearch && matchesFilter;            <div className="flex items-center gap-2 text-sm font-medium">

  });              <span>Shop Now</span>

              <ArrowRight className="h-4 w-4" />

  // GSAP animations for hero section            </div>

  useGSAP(() => {          </div>

    if (heroRef.current) {        </div>

      const tl = gsap.timeline();      </div>

          </motion.div>

      tl.from('.hero-badge', {  );

        duration: 0.8,};

        y: 30,

        opacity: 0,const FeaturedBanner = ({ category, index }) => {

        ease: 'power2.out'  return (

      })    <motion.div

      .from('.hero-title', {      className="group relative overflow-hidden rounded-3xl shadow-2xl"

        duration: 1,      initial={{ opacity: 0, y: 50 }}

        y: 50,      whileInView={{ opacity: 1, y: 0 }}

        opacity: 0,      viewport={{ once: true, amount: 0.3 }}

        ease: 'power2.out'      transition={{ duration: 0.8, delay: index * 0.2 }}

      }, '-=0.4')    >

      .from('.hero-subtitle', {      <div className="flex flex-col lg:flex-row">

        duration: 0.8,        {/* Content */}

        y: 30,        <div className="relative z-20 flex flex-1 items-center p-8 lg:p-12">

        opacity: 0,          <div>

        ease: 'power2.out'            <motion.span

      }, '-=0.6')              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"

      .from('.hero-stats', {              initial={{ opacity: 0, x: -20 }}

        duration: 0.6,              whileInView={{ opacity: 1, x: 0 }}

        y: 20,              viewport={{ once: true }}

        opacity: 0,              transition={{ duration: 0.6, delay: 0.3 }}

        ease: 'power2.out'            >

      }, '-=0.4');              <Gift className="h-4 w-4" />

    }              {category.subtitle}

  }, []);            </motion.span>

            

  if (loading) {            <motion.h2

    return (              className="mt-4 text-3xl font-bold text-white lg:text-4xl"

      <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">              initial={{ opacity: 0, y: 20 }}

        <div className="flex items-center justify-center min-h-screen">              whileInView={{ opacity: 1, y: 0 }}

          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>              viewport={{ once: true }}

        </div>              transition={{ duration: 0.6, delay: 0.4 }}

      </main>            >

    );              {category.title}

  }            </motion.h2>

            

  return (            <motion.p

    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">              className="mt-3 text-white/90"

      {/* 1️⃣ Hero Section */}              initial={{ opacity: 0, y: 20 }}

      <section ref={heroRef} className="relative overflow-hidden py-20 lg:py-32">              whileInView={{ opacity: 1, y: 0 }}

        {/* Floating Elements */}              viewport={{ once: true }}

        <div className="absolute inset-0 overflow-hidden">              transition={{ duration: 0.6, delay: 0.5 }}

          <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl" />            >

          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />              {category.description}

        </div>            </motion.p>

            

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1400px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">            <motion.div

          <div className="space-y-6">              className="mt-6"

            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">              initial={{ opacity: 0, y: 20 }}

              <Package className="h-4 w-4 text-violet-500" />              whileInView={{ opacity: 1, y: 0 }}

              Shop by Category              viewport={{ once: true }}

            </span>              transition={{ duration: 0.6, delay: 0.6 }}

                        >

            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">              <MagneticButton

              Shop by Category                variant="secondary"

            </h1>                size="lg"

                            className="bg-white/95 text-gray-900 shadow-xl hover:bg-white"

            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 lg:text-xl">              >

              Explore trending collections across Fashion, Electronics, Beauty & more                <ArrowRight className="h-5 w-5" />

            </p>                {category.ctaText}

              </MagneticButton>

            {/* Quick Stats */}            </motion.div>

            <div className="hero-stats flex items-center justify-center gap-8 pt-4">          </div>

              <div className="text-center">        </div>

                <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</div>

                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>        {/* Image */}

              </div>        <div className="relative lg:flex-1">

              <div className="text-center">          <div className="aspect-[16/10] lg:aspect-[4/3]">

                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>            <img

                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>              src={category.image}

              </div>              alt={category.title}

              <div className="text-center">              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"

                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>            />

                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>            <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient}`} />

              </div>          </div>

            </div>        </div>

          </div>      </div>

        </div>    </motion.div>

      </section>  );

};

      {/* 2️⃣ Categories Grid */}

      <section className="relative py-16">// Update the main component to use dynamic data and add loading

        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">const filteredCategories = categories.filter(category => {

          <motion.div  const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());

            className="mb-12 text-center"  const matchesFilter = selectedFilter === 'All' || selectedFilter === 'all';

            initial={{ opacity: 0, y: 20 }}  return matchesSearch && matchesFilter;

            whileInView={{ opacity: 1, y: 0 }}});

            viewport={{ once: true }}

            transition={{ duration: 0.6 }}// GSAP animations for hero section

          >useGSAP(() => {

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">  if (heroRef.current) {

              Browse Categories    const tl = gsap.timeline();

            </h2>    

            <p className="mt-4 text-gray-600 dark:text-gray-400">    tl.from('.hero-badge', {

              Find exactly what you're looking for      duration: 0.8,

            </p>      y: 30,

          </motion.div>      opacity: 0,

      ease: 'power2.out'

          {/* Search Input */}    })

          <div className="mb-8 flex justify-center">    .from('.hero-title', {

            <input      duration: 1,

              type="text"      y: 50,

              placeholder="Search categories..."      opacity: 0,

              value={searchQuery}      ease: 'power2.out'

              onChange={(e) => setSearchQuery(e.target.value)}    }, '-=0.4')

              className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"    .from('.hero-subtitle', {

            />      duration: 0.8,

          </div>      y: 30,

      opacity: 0,

          {/* Responsive Grid: 2 → 3-4 → 5-6 columns */}      ease: 'power2.out'

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">    }, '-=0.6')

            {filteredCategories.map((category, index) => (    .from('.hero-stats', {

              <CategoryCard key={category.id} category={category} index={index} />      duration: 0.6,

            ))}      y: 20,

          </div>      opacity: 0,

      ease: 'power2.out'

          {/* No Results */}    }, '-=0.4');

          {filteredCategories.length === 0 && !loading && (  }

            <motion.div}, []);

              className="py-16 text-center"            return category.isNew;

              initial={{ opacity: 0 }}          case 'hot':

              animate={{ opacity: 1 }}            return category.isHot;

              transition={{ duration: 0.5 }}          case 'popular':

            >            return category.productCount > 150;

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">          default:

                <Package className="h-8 w-8 text-gray-400" />            return true;

              </div>        }

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No categories found</h3>      });

              <p className="mt-2 text-gray-600 dark:text-gray-400">    }

                Try adjusting your search query

              </p>    setFilteredCategories(filtered);

            </motion.div>  }, [selectedFilter]);

          )}

        </div>  return (

      </section>    <main className="relative min-h-screen bg-transparent">

    </main>      {/* 1️⃣ Hero / Header */}

  );      <section ref={heroRef} className="relative overflow-hidden pb-16 pt-28">

};        {/* Background Elements */}

        <div className="pointer-events-none absolute inset-0">

export default CategoriesPage;          <div className="absolute left-1/2 top-[-10%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/15 to-sky-500/20 blur-2xl" />
          <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1400px)] px-4 text-center sm:px-6 lg:px-10 xl:px-16">
          <div className="space-y-6">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
              <Package className="h-4 w-4 text-violet-500" />
              Shop by Category
            </span>
            
            <h1 className="hero-title text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Shop by Category
            </h1>
            
            <p className="hero-subtitle mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 lg:text-xl">
              Explore trending collections across Fashion, Electronics, Beauty & more
            </p>

            {/* Quick Stats */}
            <div className="hero-stats flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Filter Pills */}
      <section className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-gray-800/50 dark:bg-gray-950/80">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 py-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-wrap justify-center gap-3">
            {filterPills.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/90 text-gray-700 hover:bg-gray-100 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2️⃣ Categories Grid */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Browse Categories
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Find exactly what you're looking for
            </p>
          </motion.div>

          {/* Responsive Grid: 2 → 3-4 → 5-6 columns */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No categories found</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try selecting a different filter
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3️⃣ Featured Categories / Banners */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[min(96vw,1400px)] px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Featured Collections
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Don't miss out on these amazing deals
            </p>
          </motion.div>

          <div className="space-y-8">
            {featuredCategories.map((category, index) => (
              <FeaturedBanner key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;