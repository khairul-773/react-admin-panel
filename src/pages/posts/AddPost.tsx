import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { addPost } from '@/store/slices/postsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
import FormField from '@/components/forms/FormField';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <PageSubmenu items={postSubmenuItems} />
      <PageHeader title="Add Post" />
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
          />

          <FormField
            label="Content"
            name="body"
            type="textarea"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write your post content here..."
            rows={8}
            required
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Post'}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ title: '', body: '', userId: 1 })}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
