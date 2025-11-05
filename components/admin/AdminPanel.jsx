"use client";

import { useState, useEffect } from "react";
import CategoryManagement from "./CategoryManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
import AdminHeader from "./AdminHeader";
import {
  HomeIcon,
  UsersIcon,
  CubeIcon,
  TruckIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: HomeIcon },
    { id: "users", name: "User Management", icon: UsersIcon },
    { id: "products", name: "Product Management", icon: CubeIcon },
    { id: "categories", name: "Category Management", icon: CubeIcon },
    { id: "orders", name: "Order Management", icon: TruckIcon },
    { id: "c2c", name: "C2C Management", icon: ArrowsRightLeftIcon },
    { id: "payments", name: "Payment Management", icon: CreditCardIcon },
    { id: "analytics", name: "Analytics & Reports", icon: ChartBarIcon },
    { id: "settings", name: "Settings", icon: Cog6ToothIcon },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "users":
        return <UserManagement />;
      case "products":
        return <ProductManagement />;
      case "categories":
        return <CategoryManagementContent />;
      case "orders":
        return <OrderManagement />;
      case "c2c":
        return <C2CManagementContent />;
      case "payments":
        return <PaymentManagementContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Grap Deal</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                    activeSection === item.id
                      ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:pl-64' : ''} transition-all duration-300`}>
        {/* Admin Header */}
        <AdminHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeVendors: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalProducts: 0,
    totalCategories: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch statistics
        const statsResponse = await fetch('/api/admin/dashboard/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData.data);
        }

        // Fetch recent activity
        const activityResponse = await fetch('/api/admin/dashboard/activity');
        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          setRecentActivity(activityData.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format time ago
  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Get activity color class
  const getActivityColor = (color) => {
    const colors = {
      green: 'bg-green-400',
      blue: 'bg-blue-400',
      yellow: 'bg-yellow-400',
      red: 'bg-red-400',
      purple: 'bg-purple-400'
    };
    return colors[color] || 'bg-gray-400';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Welcome to your admin dashboard. Here's an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? '...' : stats.totalUsers.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Vendors</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? '...' : stats.activeVendors.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TruckIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Orders</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? '...' : stats.totalOrders.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCardIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? '...' : `₹${stats.totalRevenue.toLocaleString()}`}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CubeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Products</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? '...' : stats.totalProducts.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TruckIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending Orders</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? '...' : stats.pendingOrders.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CubeIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Categories</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? '...' : stats.totalCategories.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-gray-300 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-48"></div>
                  </div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 ${getActivityColor(activity.color)} rounded-full mr-3`}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.message}
                      {activity.amount && (
                        <span className="text-green-600 font-medium ml-2">₹{activity.amount.toLocaleString()}</span>
                      )}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{timeAgo(activity.timestamp)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No recent activity found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



// Category Management Content
const CategoryManagementContent = () => (
  <div>
    <CategoryManagement />
  </div>
);

// C2C Management Content
const C2CManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">C2C Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Customer-to-Customer marketplace functionality.
      </p>
    </div>

    {/* Coming Soon Message */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="max-w-md mx-auto">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <ArrowsRightLeftIcon className="h-8 w-8 text-white" />
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            C2C Marketplace Coming Soon
          </h3>
          
          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            We're building an amazing customer-to-customer marketplace where users can buy and sell items directly with each other.
          </p>
          
          {/* Features List */}
          <div className="text-left max-w-sm mx-auto mb-8">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center">
              Upcoming Features:
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-3"></div>
                Listing approval system
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-3"></div>
                Secure transactions
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-3"></div>
                User verification
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-3"></div>
                Escrow payment system
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-3"></div>
                Dispute resolution
              </li>
            </ul>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            🚧 Under Development
          </div>
          
          {/* Estimated Launch */}
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            Estimated Launch: Q2 2025
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Payment Management Content
const PaymentManagementContent = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [activePaymentTab, setActivePaymentTab] = useState('payouts');
  const [processingPayout, setProcessingPayout] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setPaymentLoading(true);
        const response = await fetch(`/api/admin/payments?type=${activePaymentTab}`);
        if (response.ok) {
          const result = await response.json();
          setPaymentData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch payment data:', error);
      } finally {
        setPaymentLoading(false);
      }
    };

    fetchPaymentData();
  }, [activePaymentTab]);

  const handleProcessPayout = async (payoutId, vendorName) => {
    if (!confirm(`Process payout for ${vendorName}?`)) return;
    
    try {
      setProcessingPayout(payoutId);
      const response = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'process_payout',
          payoutId
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Payout processed successfully! UTR: ${result.data.utrNumber}`);
        // Refresh data
        const refreshResponse = await fetch(`/api/admin/payments?type=${activePaymentTab}`);
        if (refreshResponse.ok) {
          const refreshResult = await refreshResponse.json();
          setPaymentData(refreshResult.data);
        }
      } else {
        alert('Failed to process payout');
      }
    } catch (error) {
      console.error('Payout processing error:', error);
      alert('Failed to process payout');
    } finally {
      setProcessingPayout(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Payment Management</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Manage vendor payouts, logistics payments, and financial oversight.
        </p>
      </div>

      {paymentLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Payment Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
              <div className="text-2xl font-bold text-green-600">
                ₹{paymentData?.stats?.totalRevenue?.toLocaleString() || '0'}
              </div>
            </div>
            {/* Pending Payouts removed as per request */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
              <div className="text-sm text-gray-500 dark:text-gray-400">Commission Earned</div>
              <div className="text-2xl font-bold text-blue-600">
                ₹{paymentData?.stats?.commissionEarned?.toLocaleString() || '0'}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
              <div className="text-sm text-gray-500 dark:text-gray-400">Profit</div>
              <div className="text-2xl font-bold text-indigo-600">
                ₹{paymentData?.stats?.profit?.toLocaleString() || '0'}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
              <div className="text-sm text-gray-500 dark:text-gray-400">Logistics Paid</div>
              <div className="text-2xl font-bold text-gray-600">
                {paymentData?.stats?.logisticsPaid == null ? (
                  <span className="text-sm text-yellow-600 font-medium">Coming Soon</span>
                ) : (
                  `₹${paymentData.stats.logisticsPaid.toLocaleString()}`
                )}
              </div>
            </div>
          </div>

          {/* Payment Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'payouts', label: 'Vendor Payouts' },
                { id: 'transactions', label: 'Transaction History' },
                { id: 'logistics', label: 'Logistics Payments' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePaymentTab(tab.id)}
                  className={`${
                    activePaymentTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content based on active tab */}
          {activePaymentTab === 'payouts' && paymentData?.payouts && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Payout Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paymentData.payouts.map((payout) => (
                    <tr key={payout.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span>{payout.vendorName}</span>
                          {!payout.vendorIsActive && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Coming Soon</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ₹{payout.amountDue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        ₹{payout.commission.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ₹{payout.payoutAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          payout.status === 'PENDING' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {/* If vendor is not active, don't show process action */}
                        {payout.status === 'PENDING' && payout.vendorIsActive && (
                          <button
                            onClick={() => handleProcessPayout(payout.id, payout.vendorName)}
                            disabled={processingPayout === payout.id}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs mr-2"
                          >
                            {processingPayout === payout.id ? 'Processing...' : 'Process Payout'}
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activePaymentTab === 'transactions' && paymentData?.transactions && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paymentData.transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {transaction.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ₹{transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === 'PAID' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{transaction.paymentMethod || transaction.gatewayId || ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activePaymentTab === 'logistics' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <CreditCardIcon className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Logistics Payment Management</h3>
                <p className="text-sm">Coming soon - Integration with logistics partners for automated payments</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Analytics Content
const AnalyticsContent = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [reportType, setReportType] = useState('overview');
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setAnalyticsLoading(true);
        const response = await fetch(`/api/admin/analytics?period=${selectedPeriod}&type=${reportType}`);
        if (response.ok) {
          const result = await response.json();
          setAnalyticsData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod, reportType]);

  const handleGenerateReport = async () => {
    try {
      setGeneratingReport(true);
      const response = await fetch('/api/admin/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reportType,
          period: selectedPeriod,
          format: 'PDF'
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Report generation started! Report ID: ${result.data.reportId}`);
      }
    } catch (error) {
      console.error('Report generation error:', error);
      alert('Failed to generate report');
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics & Reports</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          View detailed analytics and generate reports.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Period
            </label>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Type
            </label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="overview">Overview</option>
              <option value="revenue">Revenue Details</option>
              <option value="products">Product Performance</option>
              <option value="customers">Customer Analytics</option>
            </select>
          </div>

          <div className="flex-1 flex justify-end items-end">
            <button 
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              {generatingReport ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      {analyticsLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : analyticsData ? (
        <>
          {/* Key Metrics */}
          {analyticsData.overview && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
                <div className="text-2xl font-bold text-blue-600">
                  {analyticsData.overview.totalOrders?.toLocaleString() || '0'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
                <div className="text-2xl font-bold text-green-600">
                  ₹{analyticsData.overview.totalRevenue?.toLocaleString() || '0'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
                <div className="text-sm text-gray-500 dark:text-gray-400">New Users</div>
                <div className="text-2xl font-bold text-purple-600">
                  {analyticsData.overview.newUsers?.toLocaleString() || '0'}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {analyticsData.overview.successRate || '0'}%
                </div>
              </div>
            </div>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Daily Sales Trend</h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex flex-col justify-center p-4">
                {analyticsData.dailySales && analyticsData.dailySales.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                      Sales trend over {selectedPeriod} days
                    </div>
                    {analyticsData.dailySales.slice(-7).map((day, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {new Date(day.date).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-4">
                          <span className="text-blue-600">{day.orders} orders</span>
                          <span className="text-green-600">₹{day.revenue?.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-center">No sales data available</span>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Status Distribution</h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex flex-col justify-center p-4">
                {analyticsData.ordersByStatus && analyticsData.ordersByStatus.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.ordersByStatus.map((status, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                          {status.status.toLowerCase().replace('_', ' ')}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ 
                                width: `${(status.count / analyticsData.overview.totalOrders) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {status.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-center">No order data available</span>
                )}
              </div>
            </div>
          </div>

          {/* Top Performers */}
          {analyticsData.topPerformers && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Products</h3>
                <div className="space-y-3">
                  {analyticsData.topPerformers.topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sales} sales</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          ₹{product.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Vendors</h3>
                <div className="space-y-3">
                  {analyticsData.topPerformers.topVendors.map((vendor, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.sales} sales</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          ₹{vendor.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No analytics data available
        </div>
      )}
    </div>
  );
};

// Settings Content
const SettingsContent = () => {
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const [savingSettings, setSavingSettings] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setSettingsLoading(true);
        const response = await fetch('/api/admin/settings');
        if (response.ok) {
          const result = await response.json();
          setSettings(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setSettingsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSaveSettings = async (section) => {
    try {
      setSavingSettings(true);
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          section,
          settings: settings[section]
        })
      });

      if (response.ok) {
        alert('Settings saved successfully!');
        setUnsavedChanges(false);
      } else {
        const error = await response.json();
        alert(`Failed to save settings: ${error.error}`);
      }
    } catch (error) {
      console.error('Settings save error:', error);
      alert('Failed to save settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleTestAction = async (action) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error('Test action error:', error);
      alert('Test action failed');
    }
  };

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Cog6ToothIcon },
    { id: 'commission', label: 'Commission', icon: CreditCardIcon },
    { id: 'payment', label: 'Payment', icon: CreditCardIcon },
    { id: 'notifications', label: 'Notifications', icon: Cog6ToothIcon },
    { id: 'security', label: 'Security', icon: Cog6ToothIcon }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Configure platform settings and preferences.
        </p>
        {unsavedChanges && (
          <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              You have unsaved changes. Remember to save your settings.
            </p>
          </div>
        )}
      </div>

      {settingsLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : settings ? (
        <div className="flex">
          {/* Settings Sidebar */}
          <div className="w-64 mr-8">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id)}
                    className={`${
                      activeSettingsTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors w-full text-left`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 space-y-6">
            {/* General Settings */}
            {activeSettingsTab === 'general' && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">General Settings</h3>
                  <button 
                    onClick={() => handleSaveSettings('general')}
                    disabled={savingSettings}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm"
                  >
                    {savingSettings ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform Name</label>
                    <input 
                      type="text" 
                      value={settings.general?.platformName || ''} 
                      onChange={(e) => handleSettingChange('general', 'platformName', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Email</label>
                    <input 
                      type="email" 
                      value={settings.general?.adminEmail || ''} 
                      onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Support Email</label>
                    <input 
                      type="email" 
                      value={settings.general?.supportEmail || ''} 
                      onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
                    <select 
                      value={settings.general?.timezone || ''} 
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Commission Settings */}
            {activeSettingsTab === 'commission' && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Commission Settings</h3>
                  <button 
                    onClick={() => handleSaveSettings('commission')}
                    disabled={savingSettings}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm"
                  >
                    {savingSettings ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-Commerce Commission (%)</label>
                    <input 
                      type="number" 
                      min="0" max="50"
                      value={settings.commission?.eCommerceCommission || ''} 
                      onChange={(e) => handleSettingChange('commission', 'eCommerceCommission', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">B2C Commission (%)</label>
                    <input 
                      type="number" 
                      min="0" max="50"
                      value={settings.commission?.b2cCommission || ''} 
                      onChange={(e) => handleSettingChange('commission', 'b2cCommission', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">B2B Commission (%)</label>
                    <input 
                      type="number" 
                      min="0" max="50"
                      value={settings.commission?.b2bCommission || ''} 
                      onChange={(e) => handleSettingChange('commission', 'b2bCommission', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">C2C Transaction Fee (₹)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={settings.commission?.c2cTransactionFee || ''} 
                      onChange={(e) => handleSettingChange('commission', 'c2cTransactionFee', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Processing Fee (%)</label>
                    <input 
                      type="number" 
                      min="0" max="10"
                      value={settings.commission?.processingFee || ''} 
                      onChange={(e) => handleSettingChange('commission', 'processingFee', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeSettingsTab === 'payment' && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Settings</h3>
                  <div className="space-x-2">
                    <button 
                      onClick={() => handleTestAction('test_payment')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Test Connection
                    </button>
                    <button 
                      onClick={() => handleSaveSettings('payment')}
                      disabled={savingSettings}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm"
                    >
                      {savingSettings ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="razorpayEnabled"
                      checked={settings.payment?.razorpayEnabled || false} 
                      onChange={(e) => handleSettingChange('payment', 'razorpayEnabled', e.target.checked)}
                      className="h-4 w-4 text-blue-600" 
                    />
                    <label htmlFor="razorpayEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Razorpay Payment Gateway
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Order Amount (₹)</label>
                      <input 
                        type="number" 
                        value={settings.payment?.minOrderAmount || ''} 
                        onChange={(e) => handleSettingChange('payment', 'minOrderAmount', parseFloat(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maximum Order Amount (₹)</label>
                      <input 
                        type="number" 
                        value={settings.payment?.maxOrderAmount || ''} 
                        onChange={(e) => handleSettingChange('payment', 'maxOrderAmount', parseFloat(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <button 
                  onClick={() => handleTestAction('test_email')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Test Email Configuration
                </button>
                <button 
                  onClick={() => handleTestAction('backup_settings')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Backup Settings
                </button>
                <button 
                  onClick={() => {
                    if (confirm('This will reset all settings to default values. Continue?')) {
                      handleTestAction('reset_to_defaults');
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Failed to load settings
        </div>
      )}
    </div>
  );
};

export default AdminPanel;