import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../providers/CartProvider';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/app/lib/image-utils';
import MagneticButton from '../ui/MagneticButton';

const CartSidebar = () => {
  const router = useRouter();
  const {
    isOpen,
    items,
    totalItems,
    totalPrice,
    loading,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleProductClick = (productId) => {
    closeCart();
    router.push(`/products/${productId}`);
  };

  const calculateItemPrice = (item) => {
    const price = item.variant?.price || item.product.price;
    return parseFloat(price) * item.quantity;
  };

  const handleCheckout = () => {
    console.log('Checkout clicked, items:', items.length);
    closeCart();
    router.push('/checkout?type=cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl dark:bg-gray-900"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart ({totalItems})
                </h2>
                <button
                  onClick={closeCart}
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                ) : items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                      Your cart is empty
                    </h3>
                    <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                      Start shopping to add items to your cart
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {/* Product Image */}
                        <div 
                          className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer"
                          onClick={() => handleProductClick(item.product.id)}
                        >
                          <img
                            src={getImageUrl(item.product.images?.[0]?.url || item.product.images?.[0] || '')}
                            alt={item.product.name}
                            className="h-full w-full object-cover hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.target.src = '/placeholder-product.jpg';
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h4 
                            className="font-medium text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => handleProductClick(item.product.id)}
                          >
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.product.brand} • {item.product.category}
                          </p>
                          {item.variant && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Variant: {item.variant.name}
                            </p>
                          )}
                          
                          {/* Price */}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                ₹{calculateItemPrice(item).toFixed(0)}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                (₹{parseFloat(item.variant?.price || item.product.price).toFixed(0)} each)
                              </span>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuantityChange(item.id, item.quantity - 1);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2rem] text-center font-medium text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuantityChange(item.id, item.quantity + 1);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 p-6 dark:border-gray-700">
                  {/* Total */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{totalPrice.toFixed(0)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <MagneticButton
                      variant="gradient"
                      size="lg"
                      className="w-full justify-center"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </MagneticButton>
                    
                    <button
                      onClick={clearCart}
                      className="w-full rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;