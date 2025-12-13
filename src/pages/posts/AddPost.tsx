import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { addPost } from '@/store/slices/postsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import FormInput from '@/components/forms/FormInput';
import { postSchema, type PostFormInputs } from '@/schemas/validationSchemas';
import { postSubmenuItems } from '@/constants/submenuItems';

const AddPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<PostFormInputs>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      body: '',
      userId: 1,
    },
  });

  const onSubmit = async (data: PostFormInputs) => {
    try {
      await dispatch(addPost(data)).unwrap();
      form.reset();
      navigate('/posts/all');
    } catch (error) {
      console.error('Failed to add post:', error);
      alert('Failed to add post');
    }
  };

  return (
    <div className="mt-2">
      <PageSubmenu items={postSubmenuItems} />
      
      {/* Main Card with Header and Form */}
      <div className="mt-3 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Add Post</h1>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">Create a new post by filling in the details below</p>
        </div>
        
        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Title"
              name="title"
              type="text"
              placeholder="Enter post title"
              form={form}
              required
            />

            <FormInput
              label="Content"
              name="body"
              type="textarea"
              placeholder="Write your post content here..."
              rows={8}
              form={form}
              required
            />

            {/* Footer Section */}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50 text-sm font-semibold tracking-wide"
              >
                {form.formState.isSubmitting ? 'Adding...' : 'Add Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/posts/all')}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold tracking-wide"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
