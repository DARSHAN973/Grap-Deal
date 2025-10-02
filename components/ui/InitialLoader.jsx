"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InitialLoader({ timeout = 4000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide when window load event fires
    const onLoad = () => setVisible(false);
    window.addEventListener('load', onLoad);

    // Fallback timeout in case load doesn't fire quickly
    const t = setTimeout(() => setVisible(false), timeout);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, [timeout]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900"
        >
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Loading…</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
