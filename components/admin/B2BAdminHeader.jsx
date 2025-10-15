"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  BriefcaseIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function B2BAdminHeader({ onMenuClick, sidebarOpen }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPanelsMenu, setShowPanelsMenu] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Menu button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Right side - Admin Panels, Notifications, User menu */}
        <div className="flex items-center gap-4">
          {/* Admin Panels Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPanelsMenu(!showPanelsMenu)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <BriefcaseIcon className="h-5 w-5" />
              <span className="hidden md:block">Admin Panels</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {showPanelsMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowPanelsMenu(false)}
                >
                  <HomeIcon className="h-5 w-5" />
                  Main Admin Panel
                </Link>
                <div className="border-t border-gray-100 dark:border-gray-600 my-1"></div>
                <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                  Coming Soon:
                </div>
                <div className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 cursor-not-allowed">
                  <BriefcaseIcon className="h-5 w-5" />
                  Vendor Panel
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <UserCircleIcon className="h-8 w-8" />
              <span className="hidden md:block text-sm font-medium">B2B Admin</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}