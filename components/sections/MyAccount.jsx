"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "@heroicons/react/24/outline";
import { useUser } from "../providers/UserProvider";
import { useRouter } from "next/navigation";

const MyAccount = () => {
  const { user, loading, isAuthenticated } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    cartItems: 0,
    totalOrders: 0,
    wishlistItems: 0,
    c2cListings: 0,
  });
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
    if (user) {
      setEditData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      
      // Fetch user statistics
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/user/stats');
      if (response.ok) {
        const stats = await response.json();
        setUserStats(stats);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-8">
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
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
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
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
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
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Profile Information
                      </h1>
                      {!isEditing ? (
                        <motion.button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
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
                          className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ShoppingCartIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.cartItems}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Items in Cart</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ShoppingBagIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalOrders}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <HeartIcon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.wishlistItems}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Wishlist Items</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl text-center"
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
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                      Security Settings
                    </h1>

                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
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

                      <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-700">
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
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                      Order History
                    </h1>
                    <div className="text-center py-12">
                      <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
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
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                      Become a Vendor
                    </h1>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
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
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
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
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Sell Your Items
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          List your products for sale in our marketplace
                        </p>
                      </div>
                      <motion.button
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl flex items-center space-x-2"
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