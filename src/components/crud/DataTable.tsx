import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts } from '@/store/slices/postsSlice';

// JSX support
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const DataTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return <div className="text-center py-4 text-gray-900">Loading...</div>;
    if (error) return <div className="text-gray-900 text-center py-4 bg-red-50 border border-red-200 rounded-md">{error}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 border-b border-gray-200 font-semibold text-gray-900 text-left">ID</th>
                        <th className="py-3 px-4 border-b border-gray-200 font-semibold text-gray-900 text-left">Title</th>
                        <th className="py-3 px-4 border-b border-gray-200 font-semibold text-gray-900 text-left">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item) => (
                        <tr key={item.id} className="hover:bg-indigo-600 hover:text-white border-b border-gray-100 transition-colors">
                            <td className="py-3 px-4">{item.id}</td>
                            <td className="py-3 px-4">{item.title}</td>
                            <td className="py-3 px-4">{item.body.substring(0, 100)}...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;