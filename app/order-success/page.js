'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircleIcon, ClockIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import MagneticButton from '@/components/ui/MagneticButton';
import { getImageUrl } from '@/app/lib/image-utils';

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');

  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        const currentOrder = data.orders?.find(o => o.id === orderId);
        setOrder(currentOrder);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, fetchOrderDetails]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <MagneticButton onClick={() => router.push('/')}>
            Return Home
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingBagIcon className="h-6 w-6 text-orange-500 mr-2" />
                Order Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {order.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'IN_PROCESS' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'DELIVERED'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'IN_PROCESS' ? 'Confirmed' : 
                     order.status === 'DELIVERED' ? 'Delivered' :
                     order.status === 'CANCELLED' ? 'Cancelled' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.paymentStatus === 'COMPLETED' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ClockIcon className="h-6 w-6 text-blue-500 mr-2" />
                Delivery Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Delivery Address:</span>
                  <div className="mt-1 text-sm">
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p>{order.shippingAddress.addressLine2}</p>
                    )}
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Estimated Delivery:</strong> 3-5 business days
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    You&apos;ll receive tracking information via SMS and email once your order is shipped.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.orderItems?.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative">
                  {item.product.images?.[0] && (
                    <Image 
                      src={getImageUrl(item.product.images[0].url)}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.total}</p>
                  <p className="text-sm text-gray-600">₹{item.price} each</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton 
            onClick={() => router.push('/account')}
            className="bg-orange-500 hover:bg-orange-600"
          >
            View All Orders
          </MagneticButton>
          <MagneticButton 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            🏠 Back to Home
          </MagneticButton>
          <MagneticButton 
            onClick={() => router.push('/products')}
            className="bg-gray-700 hover:bg-gray-800"
          >
            🛍️ Continue Shopping
          </MagneticButton>
        </motion.div>

        {/* Auto-redirect Notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              🎉 <strong>Thank you for your purchase!</strong> 
              <br />
              <span className="text-xs text-blue-600 mt-1">
                You can continue shopping or check your order status in your account.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Payment Method Notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>🚚 Fast Delivery:</strong> We support both online payments and Cash on Delivery (COD). 
              Your order will be processed within 24 hours!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}