import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts } from '@/store/slices/postsSlice';
import { fetchProducts } from '@/store/slices/productsSlice';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DataTable from '@/components/crud/DataTable';
import { MdInventory, MdShoppingCart, MdCategory, MdPostAdd } from 'react-icons/md';

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts } = useAppSelector((state) => state.posts);
    const { products, categories, brands } = useAppSelector((state) => state.products);
    
    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchProducts());
    }, [dispatch]);

    const stats = [
        { label: 'Total Products', value: products.length.toString(), icon: <MdInventory />, trend: '+12%' },
        { label: 'Categories', value: categories.length.toString(), icon: <MdCategory />, trend: '+5%' },
        { label: 'Brands', value: brands.length.toString(), icon: <MdShoppingCart />, trend: '+8%' },
        { label: 'Total Posts', value: posts.length.toString(), icon: <MdPostAdd />, trend: '+15%' },
    ];

    return (
        <div className="mt-2 space-y-3">
            {/* Page Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Recent Activity and Recent Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity - Takes 1 column */}
                <div className="lg:col-span-1">
                    <RecentActivity />
                </div>
                
                {/* Recent Posts - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="mb-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">Recent Posts</h2>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">Latest posts from JSONPlaceholder API</p>
                        </div>
                        <DataTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;