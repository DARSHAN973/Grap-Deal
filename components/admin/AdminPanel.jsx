"use client";

import { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  TruckIcon,
  MegaphoneIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: HomeIcon },
    { id: "users", name: "User Management", icon: UsersIcon },
    { id: "vendors", name: "Vendor Management", icon: BuildingStorefrontIcon },
    { id: "products", name: "Product Management", icon: CubeIcon },
    { id: "orders", name: "Order Management", icon: TruckIcon },
    { id: "b2b", name: "B2B Management", icon: MegaphoneIcon },
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
        return <UserManagementContent />;
      case "vendors":
        return <VendorManagementContent />;
      case "products":
        return <ProductManagementContent />;
      case "orders":
        return <OrderManagementContent />;
      case "b2b":
        return <B2BManagementContent />;
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Grap Deal Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2">
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
      <div className={`${sidebarOpen ? 'lg:pl-64' : ''} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 shadow px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <UserCircleIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderContent()}
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
const DashboardContent = () => (
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
                <dd className="text-lg font-medium text-gray-900 dark:text-white">1,234</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BuildingStorefrontIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Vendors</dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-white">89</dd>
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
                <dd className="text-lg font-medium text-gray-900 dark:text-white">2,567</dd>
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
                <dd className="text-lg font-medium text-gray-900 dark:text-white">₹4,56,789</dd>
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">New vendor registration: Tech Store</span>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">New order #ORD-1234 received</span>
            </div>
            <span className="text-xs text-gray-500">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Product approval pending: iPhone 15</span>
            </div>
            <span className="text-xs text-gray-500">10 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// User Management Content
const UserManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Manage customers, vendors, and delivery partners.
      </p>
    </div>

    {/* Tabs */}
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Customers
        </button>
        <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Vendors
        </button>
        <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Delivery Partners
        </button>
      </nav>
    </div>

    {/* Table */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">John Doe</div>
                  <div className="text-sm text-gray-500">Customer</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">john@example.com</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Oct 1, 2024</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
              <button className="text-red-600 hover:text-red-900">Block</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Vendor Management Content
const VendorManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Vendor Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Approve, manage, and monitor vendor activities.
      </p>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Approvals</div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">12</div>
      </div>
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Vendors</div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">89</div>
      </div>
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">₹2,34,567</div>
      </div>
    </div>

    {/* Vendor List */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Vendor Applications</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            Export List
          </button>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Business Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Applied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Tech Store</div>
                <div className="text-sm text-gray-500">tech@store.com</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Electronics</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Oct 1, 2024</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-green-600 hover:text-green-800 mr-3">Approve</button>
                <button className="text-red-600 hover:text-red-800 mr-3">Reject</button>
                <button className="text-blue-600 hover:text-blue-800">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Product Management Content
const ProductManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Product Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Approve products, manage categories, and monitor inventory.
      </p>
    </div>

    {/* Filter Bar */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Garden</option>
        </select>
        <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option>All Status</option>
          <option>Pending Approval</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option>All Vendors</option>
          <option>Tech Store</option>
          <option>Fashion Hub</option>
        </select>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Apply Filters
        </button>
      </div>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">iPhone 15 Pro</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">by Tech Store</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹1,29,000</span>
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm">
              Approve
            </button>
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Order Management Content
const OrderManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Order Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Track orders, assign delivery partners, and manage logistics.
      </p>
    </div>

    {/* Order Stats */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">New Orders</div>
        <div className="text-2xl font-bold text-blue-600">23</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Processing</div>
        <div className="text-2xl font-bold text-yellow-600">45</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Shipped</div>
        <div className="text-2xl font-bold text-blue-600">67</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Delivered</div>
        <div className="text-2xl font-bold text-green-600">123</div>
      </div>
    </div>

    {/* Orders Table */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Delivery Partner</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#ORD-1234</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">John Doe</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹2,999</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Processing</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                <option>Assign Partner</option>
                <option>BlueDart</option>
                <option>Delhivery</option>
                <option>Shiprocket</option>
              </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
              <button className="text-green-600 hover:text-green-800">Track</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// B2B Management Content
const B2BManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">B2B Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Manage banner advertisements and business service listings.
      </p>
    </div>

    {/* Tabs for B2B sections */}
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Banner Ads
        </button>
        <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Service Listings
        </button>
        <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Business Verification
        </button>
      </nav>
    </div>

    {/* Banner Management */}
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Banner Campaigns</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            Create New Campaign
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="h-24 bg-gray-300 rounded mb-3"></div>
            <h4 className="font-medium text-gray-900 dark:text-white">Tech Store - Premium Banner</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Homepage Top Banner</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-green-600">Active</span>
              <span className="text-sm text-gray-500">₹50,000/month</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
              <button className="text-red-600 hover:text-red-800 text-sm">Pause</button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Listings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Business Service Listings</h3>
        
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Business</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">City Hospital</div>
                <div className="text-sm text-gray-500">Healthcare Services</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Healthcare</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">+91 9876543210</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                <button className="text-yellow-600 hover:text-yellow-800">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// C2C Management Content
const C2CManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">C2C Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Approve customer-to-customer listings and monitor transactions.
      </p>
    </div>

    {/* C2C Stats */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Pending Approvals</div>
        <div className="text-2xl font-bold text-yellow-600">18</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Active Listings</div>
        <div className="text-2xl font-bold text-green-600">245</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Completed Transactions</div>
        <div className="text-2xl font-bold text-blue-600">67</div>
      </div>
    </div>

    {/* C2C Listings */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Customer Listings</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="h-40 bg-gray-300 rounded mb-3"></div>
            <h4 className="font-medium text-gray-900 dark:text-white">Used iPhone 13</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Listed by: John D.</p>
            <div className="mt-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">₹45,000</span>
            </div>
            <div className="mt-2">
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending Approval</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs">
                Approve
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-xs">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Payment Management Content
const PaymentManagementContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Payment Management</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Manage vendor payouts, logistics payments, and financial oversight.
      </p>
    </div>

    {/* Payment Stats */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
        <div className="text-2xl font-bold text-green-600">₹4,56,789</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Pending Payouts</div>
        <div className="text-2xl font-bold text-yellow-600">₹67,890</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Commission Earned</div>
        <div className="text-2xl font-bold text-blue-600">₹89,456</div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <div className="text-sm text-gray-500 dark:text-gray-400">Logistics Paid</div>
        <div className="text-2xl font-bold text-gray-600">₹23,456</div>
      </div>
    </div>

    {/* Payment Tabs */}
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Vendor Payouts
        </button>
        <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Logistics Payments
        </button>
        <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
          Transaction History
        </button>
      </nav>
    </div>

    {/* Payout Table */}
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
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Tech Store</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹15,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">₹1,500 (10%)</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹13,500</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs mr-2">
                Process Payout
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-xs">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Analytics Content
const AnalyticsContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics & Reports</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        View detailed analytics and generate reports.
      </p>
    </div>

    {/* Time Period Selector */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
      <div className="flex space-x-4">
        <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last year</option>
        </select>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Generate Report
        </button>
      </div>
    </div>

    {/* Charts Placeholder */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sales Overview</h3>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">Sales Chart Placeholder</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Trends</h3>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">Revenue Chart Placeholder</span>
        </div>
      </div>
    </div>

    {/* Performance Metrics */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">2,567</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">89%</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Order Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">4.2</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Average Rating</div>
        </div>
      </div>
    </div>
  </div>
);

// Settings Content
const SettingsContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Configure platform settings and preferences.
      </p>
    </div>

    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform Name</label>
            <input type="text" value="Grap Deal" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Email</label>
            <input type="email" value="admin@grapdeal.com" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Commission Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Commission Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-Commerce Commission (%)</label>
            <input type="number" value="10" className="mt-1 block w-32 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">B2C Commission (%)</label>
            <input type="number" value="8" className="mt-1 block w-32 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">C2C Transaction Fee (₹)</label>
            <input type="number" value="50" className="mt-1 block w-32 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          Save Settings
        </button>
      </div>
    </div>
  </div>
);

export default AdminPanel;