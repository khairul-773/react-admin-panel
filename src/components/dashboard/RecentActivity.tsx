import React from 'react';
import { MdAdd, MdEdit, MdDelete, MdPerson } from 'react-icons/md';

interface Activity {
  id: number;
  type: 'add' | 'edit' | 'delete' | 'user';
  title: string;
  description: string;
  time: string;
}

/**
 * RecentActivity Component
 * Displays recent activities in the dashboard
 */
const RecentActivity: React.FC = () => {
  // Mock data - replace with real data from your store
  const activities: Activity[] = [
    {
      id: 1,
      type: 'add',
      title: 'New Product Added',
      description: 'Product "Sample Item" was added to inventory',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'edit',
      title: 'Product Updated',
      description: 'Product details were updated',
      time: '15 minutes ago',
    },
    {
      id: 3,
      type: 'user',
      title: 'New User Registered',
      description: 'User "john@example.com" registered',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'delete',
      title: 'Post Deleted',
      description: 'A post was removed from the system',
      time: '2 hours ago',
    },
    {
      id: 5,
      type: 'add',
      title: 'New Category Created',
      description: 'Category "Electronics" was added',
      time: '3 hours ago',
    },
  ];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'add':
        return <MdAdd className="text-green-600" />;
      case 'edit':
        return <MdEdit className="text-blue-600" />;
      case 'delete':
        return <MdDelete className="text-red-600" />;
      case 'user':
        return <MdPerson className="text-indigo-600" />;
      default:
        return <MdAdd className="text-gray-600" />;
    }
  };

  const getIconBg = (type: Activity['type']) => {
    switch (type) {
      case 'add':
        return 'bg-green-100';
      case 'edit':
        return 'bg-blue-100';
      case 'delete':
        return 'bg-red-100';
      case 'user':
        return 'bg-indigo-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">Recent Activity</h2>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">Latest actions performed in the system</p>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className={`w-10 h-10 ${getIconBg(activity.type)} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{activity.title}</p>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 py-2 border-t border-gray-200">
        View All Activities
      </button>
    </div>
  );
};

export default RecentActivity;
