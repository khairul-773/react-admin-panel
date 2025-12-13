import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts, removePost, editPost } from '@/store/slices/postsSlice';
import Modal from '@/components/ui/Modal';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
import Table, { type Column } from '@/components/ui/Table';
import FormInput from '@/components/forms/FormInput';
import { postSchema, type PostFormInputs } from '@/schemas/validationSchemas';
import { postSubmenuItems } from '@/constants/submenuItems';
import type { Post } from '@/types';

const AllPosts = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const form = useForm<PostFormInputs>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: '', body: '', userId: 1 },
  });

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
    form.reset({ title: post.title, body: post.body, userId: post.userId });
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

  const handleUpdate = async (data: PostFormInputs): Promise<void> => {
    if (!currentPost) return;
    
    try {
      await dispatch(editPost({ 
        id: currentPost.id, 
        post: data 
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
      
      <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-xl font-bold text-gray-900">All Posts</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all your posts</p>
        </div>

        <Table
          columns={columns}
          data={posts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No posts found."
        />
      </div>

      {/* Edit Modal */}
      {isModalOpen && currentPost && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentPost(null);
            form.reset();
          }}
          title="Edit Post"
        >
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <FormInput
              label="Title"
              name="title"
              type="text"
              form={form}
              required
            />
            
            <FormInput
              label="Content"
              name="body"
              type="textarea"
              rows={8}
              form={form}
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentPost(null);
                  form.reset();
                }}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
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

