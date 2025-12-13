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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 group-hover:text-white tracking-wide uppercase">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 group-hover:text-white mt-2 tracking-tight">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} group-hover:bg-white rounded-lg flex items-center justify-center text-2xl border border-gray-200 group-hover:border-white transition-colors`}>
                                <span className="text-[#4361ee] group-hover:text-[#4361ee]">{stat.icon}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-gray-900 group-hover:text-white font-semibold flex items-center gap-1"><MdTrendingUp /> 12%</span>
                            <span className="text-gray-600 group-hover:text-gray-200 ml-2 font-normal">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">Recent Posts</h2>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">Latest posts from JSONPlaceholder API</p>
                </div>
                <DataTable />
            </div>
        </div>
    );
};

export default Dashboard;