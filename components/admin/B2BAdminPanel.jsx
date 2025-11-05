"use client";

import { useState, useEffect } from "react";
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
            <div className="shrink-0">
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
          <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
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
const ServiceManagementContent = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [filter, setFilter] = useState('all');
  const [viewingService, setViewingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, [filter]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('approvalStatus', filter.toUpperCase());
      }
      
      const response = await fetch(`/api/admin/b2b/services?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setServices(data.services);
      } else {
        window.dispatchEvent(new CustomEvent('cart-error', {
          detail: { message: data.error || 'Failed to load services' }
        }));
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Failed to load services' }
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleServiceAction = async (serviceId, action) => {
    try {
      setActionLoading(serviceId);
      
      const response = await fetch('/api/admin/b2b/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: serviceId,
          action
        })
      });

      const data = await response.json();
      
      if (data.success) {
        window.dispatchEvent(new CustomEvent('cart-success', {
          detail: { message: data.message }
        }));
        fetchServices(); // Refresh the list
      } else {
        window.dispatchEvent(new CustomEvent('cart-error', {
          detail: { message: data.error || `Failed to ${action} service` }
        }));
      }
    } catch (error) {
      console.error(`Service ${action} error:`, error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: `Failed to ${action} service` }
      }));
    } finally {
      setActionLoading(null);
    }
  };

  const handleRefundProcessing = async (serviceId) => {
    const refundAmount = prompt('Enter refund amount (₹):');
    const transactionId = prompt('Enter refund transaction ID:');
    const notes = prompt('Enter refund notes (optional):');
    
    if (!refundAmount || !transactionId) {
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Refund amount and transaction ID are required' }
      }));
      return;
    }

    try {
      setActionLoading(serviceId);
      
      const response = await fetch('/api/admin/b2b/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: serviceId,
          action: 'process_refund',
          refundData: {
            amount: parseFloat(refundAmount),
            transactionId,
            notes
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        window.dispatchEvent(new CustomEvent('cart-success', {
          detail: { message: 'Refund processed successfully' }
        }));
        fetchServices(); // Refresh the list
        setViewingService(null); // Close modal
      } else {
        window.dispatchEvent(new CustomEvent('cart-error', {
          detail: { message: data.error || 'Failed to process refund' }
        }));
      }
    } catch (error) {
      console.error('Refund processing error:', error);
      window.dispatchEvent(new CustomEvent('cart-error', {
        detail: { message: 'Failed to process refund' }
      }));
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'APPROVED': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'REJECTED': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Approve and manage B2B service listings</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === tab.key
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Services ({services.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              No services found
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {service.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {service.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {service.serviceType.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {service.contactNumber}
                      </div>
                      {service.email && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {service.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {service.city}, {service.state}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(service.adminApprovalStatus)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex gap-2">
                        {/* View Details Button */}
                        <button
                          onClick={() => setViewingService(service)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
                          title="View Details"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        
                        {service.adminApprovalStatus === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleServiceAction(service.id, 'approve')}
                              disabled={actionLoading === service.id}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50"
                            >
                              {actionLoading === service.id ? '...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleServiceAction(service.id, 'reject')}
                              disabled={actionLoading === service.id}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                            >
                              {actionLoading === service.id ? '...' : 'Reject'}
                            </button>
                          </>
                        )}
                        {service.adminApprovalStatus === 'APPROVED' && (
                          <button
                            onClick={() => handleServiceAction(service.id, 'reject')}
                            disabled={actionLoading === service.id}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                          >
                            {actionLoading === service.id ? '...' : 'Deactivate'}
                          </button>
                        )}
                        {service.adminApprovalStatus === 'REJECTED' && (
                          <button
                            onClick={() => handleServiceAction(service.id, 'approve')}
                            disabled={actionLoading === service.id}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50"
                          >
                            {actionLoading === service.id ? '...' : 'Reactivate'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Service Details Modal */}
      {viewingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Service Details
                </h3>
                <button
                  onClick={() => setViewingService(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8">
              {/* Business Photo - Full Width Large Display */}
              {viewingService.images && viewingService.images.length > 0 && (
                <div className="mb-8">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Business Photo
                  </label>
                  <div className="w-full flex justify-center">
                    <img
                      src={viewingService.images[0]}
                      alt={viewingService.name}
                      className="w-full max-w-4xl h-80 object-cover rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-lg"
                    />
                  </div>
                </div>
              )}
              
              {/* Business Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{viewingService.name}</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Service Type
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">{viewingService.serviceType.replace(/_/g, ' ')}</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Number
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">{viewingService.contactNumber}</p>
                    </div>
                    
                    {viewingService.email && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium">{viewingService.email}</p>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {viewingService.city}, {viewingService.state}
                        {viewingService.pincode && ` - ${viewingService.pincode}`}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <div>{getStatusBadge(viewingService.adminApprovalStatus)}</div>
                    </div>
                  </div>
                </div>
                
                {/* Contact & Status Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Contact & Additional Info
                  </h3>
                  <div className="space-y-4">
                    {viewingService.website && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Website
                        </label>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{viewingService.website}</p>
                      </div>
                    )}
                    
                    {viewingService.address && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium">{viewingService.address}</p>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Submitted Date
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {new Date(viewingService.submittedAt || viewingService.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {viewingService.approvedAt && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Approved Date
                        </label>
                        <p className="text-green-700 dark:text-green-400 font-medium">
                          {new Date(viewingService.approvedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Business Description */}
              {viewingService.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                    Business Description
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                    <p className="text-gray-900 dark:text-white leading-relaxed text-base">
                      {viewingService.description}
                    </p>
                  </div>
                </div>
              )}

              {/* KYC and Bank Details Section */}
              <div className="mb-8">
                <div className="bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-8 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">KYC & Bank Details</h3>
                  </div>
                  
                  {/* Bank Details Section */}
                  <div className="mb-8">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-orange-200 dark:border-orange-600">
                      Bank Account Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                        <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                          Account Holder Name
                        </label>
                        <p className="text-gray-900 dark:text-white font-semibold text-lg">{viewingService.kycAccountHolderName || 'Not provided'}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                        <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                          Bank Account Number
                        </label>
                        <p className="text-gray-900 dark:text-white font-mono text-lg font-bold">
                          {viewingService.kycBankAccountNumber || 'Not provided'}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                        <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                          IFSC Code
                        </label>
                        <p className="text-gray-900 dark:text-white font-mono text-lg font-bold">{viewingService.kycIfscCode || 'Not provided'}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                        <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                          Bank Name
                        </label>
                        <p className="text-gray-900 dark:text-white font-semibold text-lg">{viewingService.kycBankName || 'Not provided'}</p>
                      </div>
                      {viewingService.kycBranchName && (
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                          <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                            Branch Name
                          </label>
                          <p className="text-gray-900 dark:text-white font-semibold text-lg">{viewingService.kycBranchName}</p>
                        </div>
                      )}
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                        <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                          Account Type
                        </label>
                        <p className="text-gray-900 dark:text-white font-semibold text-lg">{viewingService.kycAccountType || 'SAVINGS'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Identity Documents Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-orange-200 dark:border-orange-600">
                      Identity Documents
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {viewingService.kycPanNumber && (
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                          <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                            PAN Number
                          </label>
                          <p className="text-gray-900 dark:text-white font-mono text-lg font-bold">
                            {viewingService.kycPanNumber}
                          </p>
                        </div>
                      )}
                      {viewingService.kycAadharNumber && (
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-600">
                          <label className="block text-xs font-medium text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">
                            Aadhar Number
                          </label>
                          <p className="text-gray-900 dark:text-white font-mono text-lg font-bold">
                            {viewingService.kycAadharNumber}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Refund Status */}
                  {(viewingService.refundRequested || viewingService.refundProcessed) && (
                    <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-600">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Refund Status</h5>
                      <div className="space-y-2">
                        {viewingService.refundRequested && (
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Refund Requested</span>
                          </div>
                        )}
                        {viewingService.refundProcessed && (
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Refund Processed: ₹{viewingService.refundAmount}
                              {viewingService.refundDate && ` on ${new Date(viewingService.refundDate).toLocaleDateString()}`}
                            </span>
                          </div>
                        )}
                        {viewingService.refundTransactionId && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Transaction ID: {viewingService.refundTransactionId}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                {/* Refund Processing Button */}
                {viewingService.adminApprovalStatus === 'REJECTED' && !viewingService.refundProcessed && (
                  <button
                    onClick={() => handleRefundProcessing(viewingService.id)}
                    disabled={actionLoading === viewingService.id}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>{actionLoading === viewingService.id ? 'Processing...' : 'Process Refund'}</span>
                  </button>
                )}

                {viewingService.adminApprovalStatus === 'PENDING' && (
                  <>
                    <button
                      onClick={() => {
                        handleServiceAction(viewingService.id, 'approve');
                        setViewingService(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve Service
                    </button>
                    <button
                      onClick={() => {
                        handleServiceAction(viewingService.id, 'reject');
                        setViewingService(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject Service
                    </button>
                  </>
                )}
                {viewingService.adminApprovalStatus === 'APPROVED' && (
                  <button
                    onClick={() => {
                      handleServiceAction(viewingService.id, 'reject');
                      setViewingService(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Deactivate Service
                  </button>
                )}
                {viewingService.adminApprovalStatus === 'REJECTED' && !viewingService.refundProcessed && (
                  <button
                    onClick={() => {
                      handleServiceAction(viewingService.id, 'approve');
                      setViewingService(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Reactivate Service
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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