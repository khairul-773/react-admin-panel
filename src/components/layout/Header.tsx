import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MdSearch, MdNotifications, MdMenu } from 'react-icons/md';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <MdMenu className="text-2xl text-white" />
          </button>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block font-normal">Welcome back!</p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-xl mx-4 hidden lg:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white text-gray-900"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              <MdNotifications className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">No new notifications</p>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-600 font-normal">Admin</p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;