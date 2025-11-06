'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Script from 'next/script';
import { MapPin, User, Phone, Mail, Home, Building, CreditCard, Truck, Clock, Plus as PlusIcon } from 'lucide-react';
import MagneticButton from '../../components/ui/MagneticButton';

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams?.get('productId');
  const quantity = parseInt(searchParams?.get('quantity')) || 1;
  const type = searchParams?.get('type') || 'cart';

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    addressType: 'home' // home, office, other
  });

  const [errors, setErrors] = useState({});

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []);
      } else {
        // Handle cart loading failure
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSavedAddresses = useCallback(async () => {
    try {
      const response = await fetch('/api/user/address');
      if (response.ok) {
        const data = await response.json();
        setSavedAddresses(data.addresses || []);
        
        // Auto-select default address if exists
        const defaultAddress = data.addresses?.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        } else if (data.addresses?.length > 0) {
          // If no default, select the first address
          setSelectedAddressId(data.addresses[0].id);
        } else {
          // No saved addresses, show new address form
          setShowNewAddressForm(true);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setShowNewAddressForm(true);
    }
  }, []);

  const checkAuthentication = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setAddressForm(prev => ({
            ...prev,
            fullName: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || ''
          }));
          // Fetch saved addresses after user is authenticated
          fetchSavedAddresses();
        } else {
          // User not authenticated, redirect to home with auth prompt
          router.push('/?auth=required');
        }
      } else {
        // User not authenticated, redirect to home with auth prompt
        router.push('/?auth=required');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      router.push('/?auth=required');
    } finally {
      setAuthLoading(false);
    }
  }, [router, fetchSavedAddresses]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    if (type === 'cart') {
      fetchCartItems();
    } else if (productId) {
      fetchProduct();
    } else {
      // No product ID and not cart checkout
      setLoading(false);
    }
  }, [type, productId, fetchProduct, fetchCartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!addressForm.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!addressForm.email.trim()) newErrors.email = 'Email is required';
    if (!addressForm.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!addressForm.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!addressForm.city.trim()) newErrors.city = 'City is required';
    if (!addressForm.state.trim()) newErrors.state = 'State is required';
    if (!addressForm.pincode.trim()) newErrors.pincode = 'Pincode is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (addressForm.email && !emailRegex.test(addressForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (addressForm.phone && !phoneRegex.test(addressForm.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Pincode validation
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (addressForm.pincode && !pincodeRegex.test(addressForm.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let addressId = selectedAddressId;

    // If using new address form, validate and save it
    if (showNewAddressForm || !selectedAddressId) {
      if (!validateForm()) {
        return;
      }

      // COD is now enabled - inventory will be managed in order creation

      setProcessing(true);
      try {
        // Save new address to database
        const addressResponse = await fetch('/api/user/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addressForm)
        });

        if (!addressResponse.ok) {
          throw new Error('Failed to save address');
        }

        const addressData = await addressResponse.json();
        addressId = addressData.addressId;
      } catch (error) {
        console.error('Address save error:', error);
        window.dispatchEvent(new CustomEvent('cart-error', {
          detail: { message: 'Failed to save address. Please try again.' }
        }));
        setProcessing(false);
        return;
      }
    }

    // Handle COD orders
    if (paymentMethod === 'cod') {
      try {
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...(type === 'cart' ? {
              // Cart checkout
              cartItems: cartItems.map(item => ({
                productId: item.productId || item.product.id,
                quantity: item.quantity,
                price: parseFloat(item.price || item.product.price)
              })),
              totalAmount
            } : {
              // Single product checkout
              productId,
              quantity,
              totalAmount
            }),
            addressId,
            paymentMethod: 'cod',
            type: type
          })
        });

        if (!orderResponse.ok) {
          throw new Error('Failed to create COD order');
        }

        const { orderId } = await orderResponse.json();
        
        // For COD, mark as confirmed immediately since inventory is already reduced
        await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'IN_PROCESS',
            paymentStatus: 'PENDING' // Will be paid on delivery
          })
        });

        router.push(`/order-success?orderId=${orderId}&type=cod`);
        return;
      } catch (error) {
        console.error('COD order error:', error);
        window.dispatchEvent(new CustomEvent('cart-error', {
          detail: { message: 'Failed to place COD order. Please try again.' }
        }));
        setProcessing(false);
        return;
      }
    }

    if (!addressId) {
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Please select or add a delivery address' }
      }));
      setProcessing(false);
      return;
    }

    setProcessing(true);
    
    try {
      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(type === 'cart' ? {
            // Cart checkout
            cartItems: cartItems.map(item => ({
              productId: item.productId || item.product.id,
              quantity: item.quantity,
              price: parseFloat(item.price || item.product.price)
            })),
            totalAmount
          } : {
            // Single product checkout
            productId,
            quantity,
            totalAmount
          }),
          addressId,
          paymentMethod,
          type: type
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId } = await orderResponse.json();

      // Initiate Razorpay payment
      await initiatePayment(orderId);
      
    } catch (error) {
      console.error('Checkout error:', error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Something went wrong. Please try again.' }
      }));
    } finally {
      setProcessing(false);
    }
  };

  const initiatePayment = async (orderId) => {
    try {
      const response = await fetch('/api/payment/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: totalAmount, // Amount in rupees (calculated for both cart and single product)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment order');
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'Grap Deal',
        description: `Purchase of ${product.name}`,
        handler: async function (response) {
          // Payment success
          await verifyPayment(response, orderId);
        },
        prefill: {
          name: addressForm.fullName,
          email: addressForm.email,
          contact: addressForm.phone
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment initiation error:', error);
    }
  };

  const verifyPayment = async (paymentResponse, orderId) => {
    try {
      // Show processing toast
      window.dispatchEvent(new CustomEvent('cart-success', {
        detail: { message: 'Verifying payment... Please wait.' }
      }));

      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentResponse,
          orderId
        })
      });

      if (response.ok) {
        // Show success toast
        window.dispatchEvent(new CustomEvent('cart-success', {
          detail: { message: 'Payment successful! Redirecting to order details...' }
        }));
        
        // Redirect after a short delay to let the user see the success message
        setTimeout(() => {
          router.push(`/order-success?orderId=${orderId}`);
        }, 1500);
      } else {
        const errorData = await response.json();
        window.dispatchEvent(new CustomEvent('cart-error', {
          detail: { message: errorData.error || 'Payment verification failed. Please contact support.' }
        }));
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Payment verification failed due to network error. Please contact support.' }
      }));
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {authLoading ? 'Checking authentication...' : 'Loading checkout...'}
          </p>
        </div>
      </div>
    );
  }

  // Check if cart is empty when type is cart
  if (type === 'cart' && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some products to your cart before checkout</p>
          <MagneticButton
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </MagneticButton>
        </div>
      </div>
    );
  }

  // Check if product doesn't exist when type is product
  if (type !== 'cart' && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Product not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The product you&apos;re trying to checkout doesn&apos;t exist</p>
          <MagneticButton
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </MagneticButton>
        </div>
      </div>
    );
  }

  // Calculate total amount based on checkout type
  const totalAmount = type === 'cart' 
    ? cartItems.reduce((sum, item) => sum + (parseFloat(item.price || item.product.price) * item.quantity), 0)
    : product ? product.price * quantity : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            className="bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-white/20 p-8 shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
            
            {/* Cart Checkout - Show all cart items */}
            {type === 'cart' && cartItems.length > 0 && (
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={item.id || index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                    <Image 
                      src={item.product.images?.[0]?.url || item.product.images?.[0] || '/placeholder-product.jpg'} 
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">Brand: {item.product.brand}</p>
                      <p className="text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">₹{(parseFloat(item.price || item.product.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Single Product Checkout */}
            {type !== 'cart' && product && (
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <Image 
                  src={product.images?.[0]?.url || '/placeholder-product.jpg'} 
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Brand: {product.brand}</p>
                  <p className="text-gray-600 dark:text-gray-400">Quantity: {quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h3>
              
              <div className="space-y-3">
                <label className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Online Payment</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pay securely using Razorpay</p>
                  </div>
                </label>

                <label className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl cursor-pointer opacity-60">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <Clock className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <span className="font-medium text-gray-500">Cash on Delivery</span>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Truck className="h-5 w-5" />
                <span className="font-medium">Online Delivery Only</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Free delivery on orders above ₹500
              </p>
            </div>
          </motion.div>

          {/* Address Form */}
          <motion.div
            className="bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-white/20 p-8 shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Delivery Address</h2>

            {/* Saved Addresses Section */}
            {savedAddresses.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Saved Address</h3>
                <div className="space-y-3">
                  {savedAddresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="savedAddress"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={(e) => {
                          setSelectedAddressId(e.target.value);
                          setShowNewAddressForm(false);
                        }}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{address.fullName}</h4>
                            {address.isDefault && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {address.city}, {address.state} {address.pincode}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{address.phone}</p>
                        </div>
                        {selectedAddressId === address.id && (
                          <div className="text-blue-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewAddressForm(true);
                      setSelectedAddressId(null);
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add New Address
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Address Form - Show if no saved addresses or user wants to add new */}
              {(showNewAddressForm || savedAddresses.length === 0) && (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Address</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={addressForm.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={addressForm.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={addressForm.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter 10-digit phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Home className="inline h-4 w-4 mr-1" />
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={addressForm.addressLine1}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="House No, Building Name, Street"
                />
                {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={addressForm.addressLine2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Area, Colony (Optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Building className="inline h-4 w-4 mr-1" />
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={addressForm.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={addressForm.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter state"
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.pincode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="6-digit pincode"
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={addressForm.landmark}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Nearby landmark (Optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Type
                </label>
                <div className="flex gap-4">
                  {['home', 'office', 'other'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        value={type}
                        checked={addressForm.addressType === type}
                        onChange={handleInputChange}
                        className="mr-2 text-blue-600"
                      />
                      <span className="capitalize text-gray-700 dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
                  </div>
                </div>
              )}

              <div className="pt-6">
                <MagneticButton
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full py-4 text-lg font-semibold"
                  disabled={processing || paymentMethod === 'cod'}
                >
                  {processing ? (
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </div>
                  ) : paymentMethod === 'cod' ? (
                    'Cash on Delivery - Coming Soon'
                  ) : (
                    `Pay ₹${totalAmount.toFixed(2)} - Online Payment`
                  )}
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Razorpay Script */}
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;