import React from 'react';
import { MdTrendingUp } from 'react-icons/md';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color?: string;
}

/**
 * StatCard Component
 * Displays a statistic card with icon, value, and trend
 */
const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, color = 'bg-gray-100' }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 group-hover:text-white tracking-wide uppercase">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900 group-hover:text-white mt-2 tracking-tight">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 ${color} group-hover:bg-white rounded-lg flex items-center justify-center text-2xl border border-gray-200 group-hover:border-white transition-colors`}>
          <span className="text-[#4361ee] group-hover:text-[#4361ee]">{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-gray-900 group-hover:text-white font-semibold flex items-center gap-1">
          <MdTrendingUp /> {trend}
        </span>
        <span className="text-gray-600 group-hover:text-gray-200 ml-2 font-normal">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;
