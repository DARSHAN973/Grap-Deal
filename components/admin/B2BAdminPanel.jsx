"use client";

import { useState } from "react";
import B2BAdminHeader from "./B2BAdminHeader";
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const B2BAdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: "dashboard", name: "B2B Dashboard", icon: HomeIcon },
    { id: "services", name: "Service Management", icon: BriefcaseIcon },
    { id: "clients", name: "B2B Clients", icon: UsersIcon },
    { id: "quotes", name: "Quotes & Proposals", icon: DocumentTextIcon },
    { id: "contracts", name: "Contracts", icon: ClipboardDocumentListIcon },
    { id: "companies", name: "Company Directory", icon: BuildingOfficeIcon },
    { id: "analytics", name: "B2B Analytics", icon: ChartBarIcon },
    { id: "settings", name: "B2B Settings", icon: CogIcon },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <B2BDashboardContent />;
      case "services":
        return <ServiceManagementContent />;
      case "clients":
        return <B2BClientsContent />;
      case "quotes":
        return <QuotesManagementContent />;
      case "contracts":
        return <ContractsManagementContent />;
      case "companies":
        return <CompanyDirectoryContent />;
      case "analytics":
        return <B2BAnalyticsContent />;
      case "settings":
        return <B2BSettingsContent />;
      default:
        return <B2BDashboardContent />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                GrapDeals B2B
              </h1>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active B2B Clients</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <BriefcaseIcon className="h-8 w-8 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <B2BAdminHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// B2B Dashboard Content
const B2BDashboardContent = () => (
  <div>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">B2B Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400">Manage your business-to-business operations</p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Active Services" value="18" change="+12%" />
      <StatCard title="B2B Clients" value="24" change="+8%" />
      <StatCard title="Pending Quotes" value="7" change="-2%" />
      <StatCard title="Monthly Revenue" value="₹2.4L" change="+15%" />
    </div>

    {/* Recent Activity */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent B2B Activity</h2>
      <div className="space-y-4">
        <ActivityItem 
          action="New service quote requested"
          client="Tech Solutions Pvt Ltd"
          time="2 hours ago"
        />
        <ActivityItem 
          action="Contract signed"
          client="Digital Marketing Agency"
          time="5 hours ago"
        />
        <ActivityItem 
          action="Service delivery completed"
          client="Manufacturing Corp"
          time="1 day ago"
        />
      </div>
    </div>
  </div>
);

// Service Management Content
const ServiceManagementContent = () => (
  <div>
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your B2B services and offerings</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Service
        </button>
      </div>
    </div>

    {/* Service Categories */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <ServiceCategory 
        title="Digital Marketing"
        services={8}
        description="SEO, Social Media, PPC campaigns"
      />
      <ServiceCategory 
        title="Web Development"
        services={5}
        description="Custom websites, e-commerce solutions"
      />
      <ServiceCategory 
        title="Business Consulting"
        services={3}
        description="Strategy, operations, growth planning"
      />
    </div>

    {/* Services Table */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Services</h2>
      </div>
      <div className="p-6">
        <div className="text-gray-600 dark:text-gray-400">
          Service management table will be implemented here...
        </div>
      </div>
    </div>
  </div>
);

// Placeholder components for other sections
const B2BClientsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">B2B Clients</h1>
    <p className="text-gray-600 dark:text-gray-400">Manage your business clients and relationships</p>
  </div>
);

const QuotesManagementContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quotes & Proposals</h1>
    <p className="text-gray-600 dark:text-gray-400">Create and manage service quotes for clients</p>
  </div>
);

const ContractsManagementContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contracts</h1>
    <p className="text-gray-600 dark:text-gray-400">Manage service contracts and agreements</p>
  </div>
);

const CompanyDirectoryContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Company Directory</h1>
    <p className="text-gray-600 dark:text-gray-400">Directory of all registered B2B companies</p>
  </div>
);

const B2BAnalyticsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">B2B Analytics</h1>
    <p className="text-gray-600 dark:text-gray-400">Analytics and reports for B2B operations</p>
  </div>
);

const B2BSettingsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">B2B Settings</h1>
    <p className="text-gray-600 dark:text-gray-400">Configure B2B panel settings and preferences</p>
  </div>
);

// Helper Components
const StatCard = ({ title, value, change }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
      <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
  </div>
);

const ActivityItem = ({ action, client, time }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <div>
      <p className="text-sm font-medium text-gray-900 dark:text-white">{action}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{client}</p>
    </div>
    <span className="text-sm text-gray-500 dark:text-gray-400">{time}</span>
  </div>
);

const ServiceCategory = ({ title, services, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
        {services} services
      </span>
      <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        View all →
      </button>
    </div>
  </div>
);

export default B2BAdminPanel;