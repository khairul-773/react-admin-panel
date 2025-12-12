import React from 'react';
import DataTable from '@/components/crud/DataTable';
import { MdPeople, MdDescription, MdWhatshot, MdAttachMoney, MdTrendingUp } from 'react-icons/md';

const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: <MdPeople />, color: 'bg-gray-100' },
        { label: 'Total Posts', value: '5,678', icon: <MdDescription />, color: 'bg-gray-100' },
        { label: 'Active Sessions', value: '89', icon: <MdWhatshot />, color: 'bg-gray-100' },
        { label: 'Revenue', value: '$12,345', icon: <MdAttachMoney />, color: 'bg-gray-100' },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-700 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6 hover:bg-[#4361ee] hover:text-white hover:border-[#4361ee] transition-colors group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-700 group-hover:text-white">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 group-hover:text-white mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} group-hover:bg-white rounded-lg flex items-center justify-center text-2xl border border-gray-200 group-hover:border-white transition-colors`}>
                                <span className="text-[#4361ee] group-hover:text-[#4361ee]">{stat.icon}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-gray-900 group-hover:text-white font-medium flex items-center gap-1"><MdTrendingUp /> 12%</span>
                            <span className="text-gray-600 group-hover:text-gray-200 ml-2">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
                    <p className="text-sm text-gray-700">Latest posts from JSONPlaceholder API</p>
                </div>
                <DataTable />
            </div>
        </div>
    );
};

export default Dashboard;