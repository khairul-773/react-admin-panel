import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts, removePost, editPost } from '@/store/slices/postsSlice';
import Modal from '@/components/ui/Modal';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
import Table, { type Column } from '@/components/ui/Table';
import FormField from '@/components/forms/FormField';
import { postSubmenuItems } from '@/constants/submenuItems';
import type { Post } from '@/types';

interface PostFormData {
  title: string;
  body: string;
  userId: number;
}

const AllPosts = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<PostFormData>({ title: '', body: '', userId: 1 });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const columns: Column<Post>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title', className: 'font-medium text-gray-900 group-hover:text-white' },
    { 
      header: 'Content', 
      accessor: (post) => <div className="max-w-md truncate">{post.body}</div>,
      className: 'text-gray-700 group-hover:text-white'
    },
  ];

  const handleEdit = (post: Post): void => {
    setCurrentPost(post);
    setFormData({ title: post.title, body: post.body, userId: post.userId });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await dispatch(removePost(id)).unwrap();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    }
  };

  const handleUpdate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <PageHeader 
        title="All Posts" 
        buttonText="+ Add New"
        buttonPath="/posts/add"
      />

      <Table
        columns={columns}
        data={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage='No posts found. Click "+ Add New" to create one.'
      />

      {/* Edit Modal */}
      {isModalOpen && currentPost && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentPost(null);
          }}
          title="Edit Post"
        >
          <form onSubmit={handleUpdate} className="space-y-4">
            <FormField
              label="Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
            
            <FormField
              label="Content"
              name="body"
              type="textarea"
              value={formData.body}
              onChange={handleChange}
              rows={8}
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentPost(null);
                }}
                className="px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
              >
                Update Post
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AllPosts;

