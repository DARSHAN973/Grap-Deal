'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const AnimatedInput = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  required = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  icon: Icon,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const variants = {
    default: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500',
    filled: 'bg-gray-50 dark:bg-gray-800 border-transparent focus:border-blue-500 focus:ring-blue-500',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500',
    underlined: 'border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 rounded-none bg-transparent',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const hasValue = value && value.length > 0;
  const shouldFloatLabel = focused || hasValue;
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative">
      {/* Floating Label */}
      {label && (
        <motion.label
          className={`absolute left-4 pointer-events-none transition-all duration-300 ${
            shouldFloatLabel
              ? 'top-0 text-xs text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-1 -translate-y-1/2'
              : 'top-1/2 text-gray-500 dark:text-gray-400 -translate-y-1/2'
          } ${disabled ? 'text-gray-400' : ''}`}
          animate={{
            scale: shouldFloatLabel ? 0.85 : 1,
            y: shouldFloatLabel ? '-50%' : '-50%',
            x: shouldFloatLabel ? 0 : Icon ? 40 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}

        {/* Input Field */}
        <motion.input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''}
          disabled={disabled}
          className={`
            w-full rounded-xl transition-all duration-300 outline-none
            ${variants[variant]}
            ${sizes[size]}
            ${Icon ? 'pl-10' : ''}
            ${type === 'password' ? 'pr-10' : ''}
            ${error ? '!border-red-500 !ring-red-500' : ''}
            ${success ? '!border-green-500 !ring-green-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:ring-2 focus:ring-opacity-20
          `}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          {...props}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {/* Success/Error Icons */}
        {(success || error) && type !== 'password' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {success && <Check size={20} className="text-green-500" />}
            {error && <X size={20} className="text-red-500" />}
          </div>
        )}

        {/* Focus Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-blue-500 pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: focused ? 0.3 : 0,
            scale: focused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Error/Success Message */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-green-500'}`}
          >
            {error || success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Underline for underlined variant */}
      {variant === 'underlined' && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: focused ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </div>
  );
};

export default AnimatedInput;