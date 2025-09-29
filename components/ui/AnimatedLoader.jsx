'use client';

import { motion } from 'framer-motion';

const AnimatedLoader = ({ variant = 'dots', size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', dot: 'w-2 h-2' },
    md: { container: 'w-12 h-12', dot: 'w-3 h-3' },
    lg: { container: 'w-16 h-16', dot: 'w-4 h-4' },
  };

  const colors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${sizes[size].container}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${sizes[size].dot} ${colors[color]} rounded-full`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'spinner') {
    return (
      <motion.div
        className={`${sizes[size].container} border-4 border-gray-200 dark:border-gray-700 rounded-full`}
        style={{
          borderTopColor: color === 'gradient' ? '#3b82f6' : `var(--${color}-500)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`${sizes[size].container} ${colors[color]} rounded-full`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  if (variant === 'bars') {
    return (
      <div className={`flex items-end justify-center space-x-1 ${sizes[size].container}`}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`w-1 ${colors[color]} rounded-full`}
            animate={{
              height: ['20%', '100%', '20%'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default AnimatedLoader;