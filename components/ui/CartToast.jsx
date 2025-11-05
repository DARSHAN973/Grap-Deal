import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const CartToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleCartSuccess = (event) => {
      addToast({
        id: Date.now(),
        type: 'success',
        message: event.detail.message,
      });
    };

    const handleCartError = (event) => {
      addToast({
        id: Date.now(),
        type: 'error',
        message: event.detail.message,
      });
    };

    window.addEventListener('cart-success', handleCartSuccess);
    window.addEventListener('cart-error', handleCartError);

    return () => {
      window.removeEventListener('cart-success', handleCartSuccess);
      window.removeEventListener('cart-error', handleCartError);
    };
  }, []);

  const addToast = (toast) => {
    setToasts((prev) => [...prev, toast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg p-4 shadow-lg backdrop-blur-sm ${
              toast.type === 'success'
                ? 'bg-green-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 rounded-full p-1 hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CartToast;