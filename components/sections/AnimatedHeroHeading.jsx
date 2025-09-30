'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedHeroHeading = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const highlightVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.6,
        ease: "back.out(1.7)"
      }
    }
  };

  const shimmerVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: "100%",
      transition: {
        delay: 2,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const words = ["Shop", "Smart.", "Save", "Big.", "Grap", "the", "Deal"];

  return (
    <section className="relative w-full pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-transparent">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Main heading with word animation */}
          <div className="relative mb-6">
            <motion.h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className={`inline-block mr-3 sm:mr-4 lg:mr-6 ${
                    index === 0 || index === 2 ? 'text-gray-900 dark:text-white' :
                    index === 1 || index === 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' :
                    index === 4 ? 'relative' : 
                    'text-gray-900 dark:text-white'
                  }`}
                  style={{
                    transformOrigin: "50% 50% -30px",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {index === 4 ? (
                    <>
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
                        {word}
                      </span>
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        variants={shimmerVariants}
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                      />
                    </>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>

            {/* Highlight decoration */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 lg:w-48 h-1 sm:h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full opacity-80"
              variants={highlightVariants}
            />
          </div>

          {/* Subtext with typewriter effect */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
              Discover amazing deals on premium products
              <motion.span
                className="inline-block w-1 h-6 sm:h-7 lg:h-8 bg-blue-600 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </p>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 2) * 30}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Call to action indicator */}
          <motion.div
            className="mt-8 sm:mt-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 0.6, ease: "back.out(1.7)" }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full mr-3"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Live deals below
              </span>
              <motion.div
                className="ml-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade effect */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-950" /> */}
    </section>
  );
};

export default AnimatedHeroHeading;