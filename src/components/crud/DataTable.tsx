import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts } from '@/store/slices/postsSlice';
import type { RootState } from '@/store';
import { TABLE_CONFIG } from '@/constants';

/**
 * DataTable Component
 * Displays posts data in a table format with loading and error states
 */
const DataTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-4 text-base text-gray-900 font-medium">
        {TABLE_CONFIG.LOADING_MESSAGE}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-base text-gray-900 text-center py-4 bg-red-50 border border-red-200 rounded-md font-medium">
        {TABLE_CONFIG.ERROR_MESSAGE}: {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
              ID
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
              Title
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider text-left">
              Body
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-indigo-600 hover:text-white border-b border-gray-100 transition-colors group"
            >
              <td className="py-3 px-4 text-sm font-medium">{item.id}</td>
              <td className="py-3 px-4 text-sm font-medium">{item.title}</td>
              <td className="py-3 px-4 text-sm text-gray-600 group-hover:text-white leading-relaxed">
                {item.body.substring(0, 100)}...
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;