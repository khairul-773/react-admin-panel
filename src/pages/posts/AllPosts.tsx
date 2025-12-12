import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts, removePost, editPost } from '@/store/slices/postsSlice';
import Modal from '@/components/ui/Modal';
import PageSubmenu from '@/components/ui/PageSubmenu';
import { postSubmenuItems } from '@/constants/submenuItems';
import type { Post } from '@/types';

interface PostFormData {
  title: string;
  body: string;
  userId: number;
}

const AllPosts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<PostFormData>({ title: '', body: '', userId: 1 });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (post: Post): void => {
    setCurrentPost(post);
    setFormData({ title: post.title, body: post.body, userId: post.userId });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await dispatch(removePost(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const handleUpdate = async (): Promise<void> => {
    if (!currentPost) return;
    
    try {
      await dispatch(editPost({ 
        id: currentPost.id, 
        post: formData 
      })).unwrap();
      setIsModalOpen(false);
      setCurrentPost(null);
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageSubmenu items={postSubmenuItems} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
        <button 
          onClick={() => navigate('/posts/add')}
          className="px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
        >
          + Add New
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#4361ee] hover:text-white transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-white">{post.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-white">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 group-hover:text-white">
                    <div className="max-w-md truncate">{post.body}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-white bg-[#4361ee] hover:bg-[#3651de] font-medium mr-3 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-white font-medium bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No posts found. Click "+ Add New" to create one.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentPost(null);
        }}
        title="Edit Post"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4361ee] bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Content
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4361ee] bg-white text-gray-900"
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCurrentPost(null);
              }}
              className="px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
            >
              Update Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllPosts;
