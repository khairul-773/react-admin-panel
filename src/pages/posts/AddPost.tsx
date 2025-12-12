import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { addPost } from '@/store/slices/postsSlice';
import Button from '@/components/ui/Button';
import PageSubmenu from '@/components/ui/PageSubmenu';
import { postSubmenuItems } from '@/constants/submenuItems';

interface PostFormData {
  title: string;
  body: string;
  userId: number;
}

const AddPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    body: '',
    userId: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await dispatch(addPost(formData)).unwrap();
      // Reset form
      setFormData({ title: '', body: '', userId: 1 });
      // Navigate to all posts
      navigate('/posts/all');
    } catch (error) {
      console.error('Failed to add post:', error);
      alert('Failed to add post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <PageSubmenu items={postSubmenuItems} />
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Post</h1>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4361ee] bg-white text-gray-900"
              placeholder="Enter post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Content *
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={8}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4361ee] bg-white text-gray-900"
              placeholder="Write your post content here..."
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Post'}
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => navigate('/posts/all')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
