"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CogIcon,
  ShieldCheckIcon,
  BellIcon,
  EyeIcon,
  LockClosedIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  PlusIcon,
  TagIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../providers/UserProvider";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/app/lib/image-utils";
import OrderHistoryCard from "./OrderHistoryCard";

const MyAccount = () => {
  const { user, loading, isAuthenticated } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [userStats, setUserStats] = useState({
    cartItems: 0,
    totalOrders: 0,
    wishlistItems: 0,
    c2cListings: 0,
    orderStatusCounts: {},
    totalSpent: 0,
  });
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [businessServices, setBusinessServices] = useState([]);
  const [businessServicesLoading, setBusinessServicesLoading] = useState(false);
  const [businessPhoto, setBusinessPhoto] = useState(null);
  const [businessPhotoPreview, setBusinessPhotoPreview] = useState(null);

  // Helper function to determine step status
  const getStepStatus = (currentStatus, stepStatus) => {
    const statusOrder = ['PENDING', 'IN_PROCESS', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);
    return stepIndex <= currentIndex;
  };
  const [vendorApplication, setVendorApplication] = useState({
    businessName: "",
    businessType: "",
    description: "",
    phoneNumber: "",
    website: "",
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    // Handle URL parameters for direct tab navigation
    // Avoid referencing `tabs` here (can cause TDZ/initialization ordering issues in some bundlers)
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const allowedTabs = [
      'profile','security','orders','wishlist','addresses','payments','business','vendor','c2c','notifications'
    ];
    if (tabParam && allowedTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  useEffect(() => {
    if (user && isAuthenticated) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      
      setEditData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      
      // Fetch user statistics
      fetchUserStats();
      // Fetch wishlist and addresses
      fetchWishlist();
      fetchAddresses();
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'orders' && user && isAuthenticated) {
      fetchOrders();
    } else if (activeTab === 'wishlist' && user && isAuthenticated) {
      fetchWishlist();
    } else if (activeTab === 'addresses' && user && isAuthenticated) {
      fetchAddresses();
    } else if (activeTab === 'business' && user && isAuthenticated) {
      fetchBusinessServices();
    }
  }, [activeTab, user, isAuthenticated]);

  const fetchUserStats = async () => {
    if (!user || !isAuthenticated) {
      console.log('User not authenticated, skipping stats fetch');
      return;
    }
    
    try {
      const response = await fetch('/api/user/stats');
      if (response.ok) {
        const stats = await response.json();
        setUserStats(stats);
      } else {
        console.error('Failed to fetch user stats:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
      // Use mock data for now
      setUserStats({
        cartItems: 3,
        totalOrders: 12,
        wishlistItems: 8,
        c2cListings: 2,
      });
    }
  };

  const fetchOrders = async () => {
    if (!user || !isAuthenticated) {
      console.log('User not authenticated, skipping orders fetch');
      return;
    }
    
    setOrdersLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        console.error('Failed to fetch orders:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchWishlist = async () => {
    if (!user || !isAuthenticated) {
      console.log('User not authenticated, skipping wishlist fetch');
      return;
    }
    
    try {
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist || []);
      } else {
        console.error('Failed to fetch wishlist:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  const fetchAddresses = async () => {
    if (!user || !isAuthenticated) {
      console.log('User not authenticated, skipping addresses fetch');
      return;
    }
    
    try {
      const response = await fetch('/api/user/address');
      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);
      } else {
        console.error('Failed to fetch addresses:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (!user || !isAuthenticated) {
      console.log('User not authenticated, cannot remove from wishlist');
      return;
    }
    
    try {
      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        setWishlist(prev => prev.filter(item => item.product.id !== productId));
        // Update user stats
        fetchUserStats();
      } else {
        console.error('Failed to remove from wishlist:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleAddAddress = async (addressData) => {
    try {
      const response = await fetch('/api/user/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(prev => [...prev, data.address]);
        setShowAddressForm(false);
        setNewAddress({
          name: '',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          isDefault: false
        });
      }
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  const handleUpdateAddress = async (addressId, addressData) => {
    try {
      const response = await fetch('/api/user/address', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addressId, ...addressData }),
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(prev => prev.map(addr => 
          addr.id === addressId ? data.address : addr
        ));
        setEditingAddress(null);
      }
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await fetch('/api/user/address', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addressId }),
      });

      if (response.ok) {
        setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  const handleBusinessPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBusinessServiceSubmit = async (serviceData) => {
    try {
      let imageUrl = null;
      
      // Upload image first if there's a photo
      if (businessPhoto) {
        const formData = new FormData();
        formData.append('image', businessPhoto);
        formData.append('folder', 'business'); // Specify business folder for USER permissions
        
        const uploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData
        });
        
        const uploadResult = await uploadResponse.json();
        
        if (uploadResult.success) {
          imageUrl = uploadResult.url;
        } else {
          throw new Error('Failed to upload image');
        }
      }

      // Submit business service with image URL
      const response = await fetch('/api/b2b/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...serviceData,
          images: imageUrl ? [imageUrl] : []
        })
      });

      const result = await response.json();

      if (result.success) {
        // Dispatch success event for toast
        window.dispatchEvent(new CustomEvent('cart-success', {
          detail: { message: result.message || 'Business service submitted successfully! It will be reviewed by our team.' }
        }));
        
        setShowBusinessForm(false);
        setBusinessPhoto(null);
        setBusinessPhotoPreview(null);
        fetchBusinessServices(); // Refresh the business services list
      } else {
        // Dispatch error event for toast
        window.dispatchEvent(new CustomEvent('cart-error', {
          detail: { message: result.error || 'Failed to submit business service' }
        }));
      }
    } catch (error) {
      console.error('Business service submission error:', error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Failed to submit business service. Please try again.' }
      }));
    }
  };

  const fetchBusinessServices = async () => {
    if (!user || !isAuthenticated) return;
    
    setBusinessServicesLoading(true);
    try {
      const response = await fetch('/api/admin/b2b/services?userId=' + user.id);
      if (response.ok) {
        const data = await response.json();
        setBusinessServices(data.services || []);
      } else {
        console.error('Failed to fetch business services:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch business services:', error);
    } finally {
      setBusinessServicesLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: "profile", name: "Profile", icon: UserIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
    { id: "orders", name: "Orders", icon: ShoppingBagIcon },
    { id: "wishlist", name: "Wishlist", icon: HeartIcon },
    { id: "addresses", name: "Addresses", icon: MapPinIcon },
    { id: "payments", name: "Payment Methods", icon: CreditCardIcon },
    { id: "business", name: "List Your Business", icon: BuildingStorefrontIcon },
    { id: "vendor", name: "Become Vendor", icon: BuildingStorefrontIcon },
    { id: "c2c", name: "Sell Items", icon: TagIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
  ];

  const handleSave = async () => {
    setSaveLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveLoading(false);
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xl:grid-cols-5 gap-8"
        >
          {/* Sidebar */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-1"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              {/* User Info Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="w-20 h-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <UserIcon className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {user?.email}
                </p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-4"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Profile Information
                      </h1>
                      {!isEditing ? (
                        <motion.button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PencilIcon className="w-4 h-4" />
                          <span>Edit</span>
                        </motion.button>
                      ) : (
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={handleSave}
                            disabled={saveLoading}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {saveLoading ? (
                              <motion.div
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                            ) : (
                              <CheckIcon className="w-4 h-4" />
                            )}
                            <span>Save</span>
                          </motion.button>
                          <motion.button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <XMarkIcon className="w-4 h-4" />
                            <span>Cancel</span>
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {/* User Statistics */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Activity</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <motion.div 
                          className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ShoppingCartIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.cartItems}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Items in Cart</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ShoppingBagIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalOrders}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <HeartIcon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.wishlistItems}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Wishlist Items</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <TagIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.c2cListings}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Your Listings</div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Profile Details Form */}
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Details</h2>
                    
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <motion.input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                        ) : (
                          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <UserIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900 dark:text-white">{user?.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <motion.input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                        ) : (
                          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900 dark:text-white">{user?.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <motion.input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                        ) : (
                          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <PhoneIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900 dark:text-white">{user?.phone || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      {/* Role Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Account Type
                        </label>
                        <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <ShieldCheckIcon className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900 dark:text-white capitalize">{user?.role || "user"}</span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                      Security Settings
                    </h1>

                    <div className="space-y-6">
                      <div className="p-6 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <LockClosedIcon className="w-6 h-6 text-blue-600" />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">Change Password</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                            </div>
                          </div>
                          <motion.button
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Change
                          </motion.button>
                        </div>
                      </div>

                      <div className="p-6 bg-linear-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                            </div>
                          </div>
                          <motion.button
                            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Enable
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "orders" && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                      Order History
                    </h1>
                    
                    {ordersLoading ? (
                      <div className="text-center py-12">
                        <motion.div
                          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading orders...</p>
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <OrderHistoryCard 
                            key={order.id} 
                            order={order} 
                            onOrderUpdate={fetchOrders}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          Start shopping to see your orders here
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "business" && (
                  <motion.div
                    key="business"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          List Your Business
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          Get your business listed in our B2B services directory
                        </p>
                      </div>
                      <motion.button
                        onClick={() => setShowBusinessForm(!showBusinessForm)}
                        className={`px-6 py-3 font-medium rounded-xl transition-all flex items-center space-x-2 ${
                          showBusinessForm 
                            ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                            : 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className={`w-5 h-5 transition-transform ${showBusinessForm ? 'rotate-45' : ''}`} />
                        <span>{showBusinessForm ? 'Cancel' : 'List New Business'}</span>
                      </motion.button>
                    </div>

                    {/* Business Service Form - Inline Display */}
                    {showBusinessForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                          <div className="flex items-center space-x-3 mb-6">
                            <BuildingStorefrontIcon className="h-6 w-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Your Business</h2>
                          </div>
                          
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = {
                              name: formData.get('businessName'),
                              serviceType: formData.get('serviceType'),
                              contactNumber: formData.get('contactNumber'),
                              city: formData.get('city'),
                              state: formData.get('state'),
                              description: formData.get('description'),
                              // KYC and Bank Details
                              kycAccountHolderName: formData.get('kycAccountHolderName'),
                              kycBankAccountNumber: formData.get('kycBankAccountNumber'),
                              kycIfscCode: formData.get('kycIfscCode'),
                              kycBankName: formData.get('kycBankName'),
                              kycBranchName: formData.get('kycBranchName') || null,
                              kycAccountType: formData.get('kycAccountType'),
                              kycPanNumber: formData.get('kycPanNumber') || null,
                              kycAadharNumber: formData.get('kycAadharNumber') || null
                            };
                            handleBusinessServiceSubmit(data);
                          }} className="space-y-6">
                            {/* Business Photo Upload */}
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Business Photo *
                              </label>
                              <div className="flex items-center space-x-4">
                                <div className="shrink-0">
                                  {businessPhotoPreview ? (
                                    <img
                                      src={businessPhotoPreview}
                                      alt="Business preview"
                                      className="w-24 h-24 object-cover rounded-xl border-2 border-gray-300 dark:border-gray-600"
                                    />
                                  ) : (
                                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                      <BuildingStorefrontIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBusinessPhotoChange}
                                    className="hidden"
                                    id="business-photo-upload"
                                    required
                                  />
                                  <label
                                    htmlFor="business-photo-upload"
                                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {businessPhoto ? 'Change Photo' : 'Upload Photo'}
                                  </label>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    PNG, JPG up to 5MB. This will be displayed on your business card.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Business Name *
                                </label>
                                <input
                                  type="text"
                                  name="businessName"
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                  placeholder="Your business name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Contact Number *
                                </label>
                                <input
                                  type="tel"
                                  name="contactNumber"
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                  placeholder="+91 98765 43210"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Service Type *
                                </label>
                                <select
                                  name="serviceType"
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                >
                                  <option value="">Select Service Type</option>
                                  <option value="HEALTHCARE">Healthcare</option>
                                  <option value="LEGAL">Legal Services</option>
                                  <option value="EDUCATION">Education</option>
                                  <option value="TECHNOLOGY">Technology</option>
                                  <option value="OTHER">Other</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  City *
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                  placeholder="City"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  State *
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                  placeholder="State"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Business Description *
                              </label>
                              <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                                placeholder="Describe your services and what makes your business unique..."
                              />
                            </div>

                            {/* KYC and Bank Details Section */}
                            <div className="bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                              <div className="flex items-center space-x-2 mb-4">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">KYC & Bank Details</h3>
                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 text-xs font-medium rounded-full">
                                  Required for Refund Processing
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                These details are required for refund processing if your listing is rejected by admin.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Account Holder Name *
                                  </label>
                                  <input
                                    type="text"
                                    name="kycAccountHolderName"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Full name as per bank account"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Bank Account Number *
                                  </label>
                                  <input
                                    type="text"
                                    name="kycBankAccountNumber"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter bank account number"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    IFSC Code *
                                  </label>
                                  <input
                                    type="text"
                                    name="kycIfscCode"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Bank IFSC code"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Bank Name *
                                  </label>
                                  <input
                                    type="text"
                                    name="kycBankName"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Name of your bank"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Branch Name
                                  </label>
                                  <input
                                    type="text"
                                    name="kycBranchName"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Bank branch name (optional)"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Account Type *
                                  </label>
                                  <select
                                    name="kycAccountType"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                  >
                                    <option value="SAVINGS">Savings Account</option>
                                    <option value="CURRENT">Current Account</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    PAN Number *
                                  </label>
                                  <input
                                    type="text"
                                    name="kycPanNumber"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="PAN card number (e.g. ABCDE1234F)"
                                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Aadhar Number *
                                  </label>
                                  <input
                                    type="text"
                                    name="kycAadharNumber"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Aadhar card number (12 digits)"
                                    pattern="[0-9]{12}"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                              <button
                                type="button"
                                onClick={() => setShowBusinessForm(false)}
                                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                Cancel
                              </button>
                              <motion.button
                                type="submit"
                                className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Submit Business
                              </motion.button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    )}

                    {/* Business Listing Benefits */}
                    {!showBusinessForm && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                          <BuildingStorefrontIcon className="w-10 h-10 text-blue-600 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Free Listing</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Get your business listed in our directory at no cost
                          </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                          <PhoneIcon className="w-10 h-10 text-green-600 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Direct Contact</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Customers can contact you directly through our platform
                          </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                          <TruckIcon className="w-10 h-10 text-purple-600 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lead Generation</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Generate quality leads from our customer base
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Your Business Listings */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Business Listings</h2>
                      
                      {businessServicesLoading ? (
                        <div className="text-center py-8">
                          <motion.div
                            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your listings...</p>
                        </div>
                      ) : businessServices.length > 0 ? (
                        <div className="space-y-4">
                          {businessServices.map((service) => (
                            <motion.div
                              key={service.id}
                              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all"
                              whileHover={{ scale: 1.01 }}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      {service.name}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      service.adminApprovalStatus === 'APPROVED' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                        : service.adminApprovalStatus === 'REJECTED'
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    }`}>
                                      {service.adminApprovalStatus}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                    {service.description}
                                  </p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center space-x-1">
                                      <BuildingStorefrontIcon className="w-4 h-4" />
                                      <span>{service.serviceType.replace(/_/g, ' ')}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <MapPinIcon className="w-4 h-4" />
                                      <span>{service.city}, {service.state}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <PhoneIcon className="w-4 h-4" />
                                      <span>{service.contactNumber}</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {service.adminApprovalStatus === 'APPROVED' && (
                                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                                  )}
                                  {service.adminApprovalStatus === 'REJECTED' && (
                                    <XCircleIcon className="w-6 h-6 text-red-500" />
                                  )}
                                  {service.adminApprovalStatus === 'PENDING' && (
                                    <ClockIcon className="w-6 h-6 text-yellow-500" />
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <BuildingStorefrontIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400 mb-2">No business listings yet</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                            List your first business to start getting customers
                          </p>
                          <motion.button
                            onClick={() => setShowBusinessForm(true)}
                            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            List Your Business
                          </motion.button>
                        </div>
                      )}
                    </div>


                  </motion.div>
                )}

                {activeTab === "vendor" && (
                  <motion.div
                    key="vendor"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                      Become a Vendor
                    </h1>
                    <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <BuildingStorefrontIcon className="w-12 h-12 text-blue-600" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Start Your Business</h3>
                          <p className="text-gray-600 dark:text-gray-400">Join our marketplace and start selling your products</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CheckIcon className="w-6 h-6 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Easy Setup</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Quick verification process</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CreditCardIcon className="w-6 h-6 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Secure Payments</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Get paid on time</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <ShoppingBagIcon className="w-6 h-6 text-purple-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Wide Reach</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Access to customers</p>
                        </div>
                      </div>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={vendorApplication.businessName}
                            onChange={(e) => setVendorApplication({...vendorApplication, businessName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Enter your business name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Business Type
                          </label>
                          <select
                            value={vendorApplication.businessType}
                            onChange={(e) => setVendorApplication({...vendorApplication, businessType: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="">Select business type</option>
                            <option value="retail">Retail</option>
                            <option value="wholesale">Wholesale</option>
                            <option value="manufacturer">Manufacturer</option>
                            <option value="service">Service Provider</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Business Description
                        </label>
                        <textarea
                          rows={4}
                          value={vendorApplication.description}
                          onChange={(e) => setVendorApplication({...vendorApplication, description: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Describe your business and what you sell"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Business Phone
                          </label>
                          <input
                            type="tel"
                            value={vendorApplication.phoneNumber}
                            onChange={(e) => setVendorApplication({...vendorApplication, phoneNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Business contact number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Website (Optional)
                          </label>
                          <input
                            type="url"
                            value={vendorApplication.website}
                            onChange={(e) => setVendorApplication({...vendorApplication, website: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="https://your-website.com"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          type="submit"
                          className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Submit Application
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {activeTab === "c2c" && (
                  <motion.div
                    key="c2c"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Sell Your Items
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          List your products for sale in our marketplace
                        </p>
                      </div>
                      <motion.button
                        className="px-4 py-2 bg-linear-to-r from-green-500 to-teal-600 text-white rounded-xl flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-5 h-5" />
                        <span>Add New Item</span>
                      </motion.button>
                    </div>

                    {/* C2C Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <TagIcon className="w-8 h-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Listing</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Upload photos and details of your items quickly</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                        <ShieldCheckIcon className="w-8 h-8 text-green-600 mb-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Transaction</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Safe payments and buyer protection</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                        <CreditCardIcon className="w-8 h-8 text-purple-600 mb-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Payments</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get paid after successful transaction</p>
                      </div>
                    </div>

                    {/* Your Listings */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Listings</h2>
                      {userStats.c2cListings > 0 ? (
                        <div className="text-center py-8">
                          <TagIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 dark:text-gray-400">You have {userStats.c2cListings} active listings</p>
                          <button className="mt-3 text-blue-600 hover:text-blue-800">View All Listings</button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <TagIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 dark:text-gray-400">You haven't listed any items yet</p>
                          <button className="mt-3 text-blue-600 hover:text-blue-800">Create Your First Listing</button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "wishlist" && (
                  <motion.div
                    key="wishlist"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                      My Wishlist
                    </h1>
                    
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((item) => (
                          <motion.div
                            key={item.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.02 }}
                            layout
                          >
                            <div className="relative">
                              {item.product.images && item.product.images.length > 0 ? (
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                              ) : (
                                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                                  <span className="text-gray-400">No Image</span>
                                </div>
                              )}
                              <button
                                onClick={() => handleRemoveFromWishlist(item.product.id)}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.product.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.product.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-blue-600">₹{item.product.price}</span>
                              <motion.button
                                onClick={() => router.push(`/products/${item.product.id}`)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                View Product
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">Your wishlist is empty</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          Add products to your wishlist to save them for later
                        </p>
                        <motion.button
                          onClick={() => router.push('/products')}
                          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Browse Products
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "addresses" && (
                  <motion.div
                    key="addresses"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        My Addresses
                      </h1>
                      <motion.button
                        onClick={() => setShowAddressForm(!showAddressForm)}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-5 h-5" />
                        <span>Add Address</span>
                      </motion.button>
                    </div>

                    {showAddressForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="ZIP Code"
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Country"
                            value={newAddress.country}
                            onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="flex items-center space-x-2 mt-4">
                          <input
                            type="checkbox"
                            id="defaultAddress"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="defaultAddress" className="text-sm text-gray-700 dark:text-gray-300">
                            Set as default address
                          </label>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            onClick={() => setShowAddressForm(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                          <motion.button
                            onClick={() => handleAddAddress(newAddress)}
                            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Save Address
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {addresses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                          <motion.div
                            key={address.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                            whileHover={{ scale: 1.02 }}
                            layout
                          >
                            {address.isDefault && (
                              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 mb-3">
                                Default Address
                              </div>
                            )}
                            <div className="space-y-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{address.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400">{address.street}</p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">{address.country}</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <button
                                onClick={() => setEditingAddress(address)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No addresses saved</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          Add an address to make checkout faster
                        </p>
                      </div>
                    )}

                    {editingAddress && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setEditingAddress(null)}
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Address</h3>
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={editingAddress.name}
                              onChange={(e) => setEditingAddress({...editingAddress, name: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <input
                              type="text"
                              placeholder="Street Address"
                              value={editingAddress.street}
                              onChange={(e) => setEditingAddress({...editingAddress, street: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="City"
                                value={editingAddress.city}
                                onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                              <input
                                type="text"
                                placeholder="State"
                                value={editingAddress.state}
                                onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="ZIP Code"
                                value={editingAddress.zipCode}
                                onChange={(e) => setEditingAddress({...editingAddress, zipCode: e.target.value})}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                              <input
                                type="text"
                                placeholder="Country"
                                value={editingAddress.country}
                                onChange={(e) => setEditingAddress({...editingAddress, country: e.target.value})}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="editDefaultAddress"
                                checked={editingAddress.isDefault}
                                onChange={(e) => setEditingAddress({...editingAddress, isDefault: e.target.checked})}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <label htmlFor="editDefaultAddress" className="text-sm text-gray-700 dark:text-gray-300">
                                Set as default address
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3 mt-6">
                            <button
                              onClick={() => setEditingAddress(null)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <motion.button
                              onClick={() => handleUpdateAddress(editingAddress.id, editingAddress)}
                              className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Update Address
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Add similar blocks for other tabs */}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyAccount;