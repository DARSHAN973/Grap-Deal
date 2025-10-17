"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
  ShoppingBagIcon,
  CalendarIcon,
  CreditCardIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { getImageUrl } from "@/app/lib/image-utils";

const OrderHistoryCard = ({ order, onOrderUpdate }) => {
  const [cancelling, setCancelling] = useState(false);

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    setCancelling(true);
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' })
      });
      
      if (response.ok) {
        if (onOrderUpdate) onOrderUpdate();
        // Optionally show success message
      } else {
        alert('Failed to cancel order. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  // Helper function to determine if a step is completed
  const getStepStatus = (currentStatus, stepStatus) => {
    const statusOrder = ['PENDING', 'IN_PROCESS', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);
    return currentIndex >= stepIndex;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-500';
      case 'IN_PROCESS':
        return 'bg-blue-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-amber-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DELIVERED':
        return CheckCircleIcon;
      case 'IN_PROCESS':
        return TruckIcon;
      case 'CANCELLED':
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const StatusIcon = getStatusIcon(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${getStatusColor(order.status)} flex items-center justify-center shadow-lg`}>
              <StatusIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Order #{order.id ? order.id.slice(-8) : 'Unknown'}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <CalendarIcon className="w-3 h-3" />
                <span>
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Unknown date'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{parseFloat(order.totalAmount || 0).toLocaleString()}
            </div>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
              order.status === 'DELIVERED'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : order.status === 'IN_PROCESS'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                : order.status === 'CANCELLED'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Flipkart-style Order Status Timeline - Full Width */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TruckIcon className="w-5 h-5 mr-2 text-blue-600" />
            Order Status
          </h4>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-8 right-8 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <div 
                className="absolute top-6 left-8 h-0.5 bg-green-500 transition-all duration-500"
                style={{
                  width: order.status === 'PENDING' ? '0%' : 
                         order.status === 'IN_PROCESS' ? '50%' : 
                         order.status === 'DELIVERED' ? '100%' : '0%'
                }}
              ></div>
              
              {/* Status Steps */}
              {[
                { status: 'PENDING', label: 'Order Placed', icon: ClockIcon, detail: 'Order confirmed' },
                { status: 'IN_PROCESS', label: 'Processing', icon: TruckIcon, detail: 'Packed & shipped' },
                { status: 'DELIVERED', label: 'Delivered', icon: CheckCircleIcon, detail: 'Order delivered' },
              ].map((step, index) => {
                const Icon = step.icon;
                const isCompleted = getStepStatus(order.status, step.status);
                const isCurrent = order.status === step.status;
                
                return (
                  <div key={step.status} className="flex flex-col items-center relative z-10 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isCurrent
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-center mt-2">
                      <p className={`text-sm font-medium ${
                        isCompleted || isCurrent 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {step.detail}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                          Current Status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Order Items */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <ShoppingBagIcon className="w-4 h-4 mr-2 text-blue-600" />
              Items Ordered
            </h4>
            <div className="space-y-3">
              {(order.orderItems || []).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm">
                    {item.product?.images && item.product.images.length > 0 ? (
                      <Image
                        src={getImageUrl(item.product.images[0].url || item.product.images[0])}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder-product.png";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                        <ShoppingBagIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-900 dark:text-white truncate">
                      {item.product?.name || 'Product Name'}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity} × ₹{parseFloat(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">
                      ₹{parseFloat(item.total || item.price * item.quantity || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional Order Info */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Order Date:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Unknown'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Items Count:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {(order.orderItems || []).length} item{(order.orderItems || []).length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              {order.status === 'DELIVERED' && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-400 font-medium">
                    ✅ Order delivered successfully! Rate your experience.
                  </p>
                </div>
              )}
              
              {order.status === 'CANCELLED' && (
                <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-800 dark:text-red-400 font-medium">
                    ❌ Order was cancelled. Need help? Contact support.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Payment & Address */}
          <div className="space-y-4">
            
            {/* Payment Information */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <CreditCardIcon className="w-4 h-4 mr-2 text-green-600" />
                Payment Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Payment Method</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.paymentMethod === 'ONLINE' ? 'Online Payment' : order.paymentMethod || 'Cash on Delivery'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Payment Status</span>
                  <span className={`text-sm font-medium ${
                    order.paymentStatus === 'COMPLETED' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total Amount</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      ₹{parseFloat(order.totalAmount || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2 text-red-600" />
                Delivery Address
              </h4>
              {order.shippingAddress ? (
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {order.shippingAddress.fullName}
                  </p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p>{order.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <div className="flex items-center mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 mr-2">📞</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {order.shippingAddress.phone}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Address information not available</p>
              )}
            </div>

            {/* Order Actions */}
            {order.status === 'PENDING' && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <button 
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
                <p className="text-xs text-red-600 dark:text-red-400 text-center mt-2">
                  You can cancel this order until it's shipped
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderHistoryCard;