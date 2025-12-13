import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { addPost } from '@/store/slices/postsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
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
    <div className="p-6">
      <PageSubmenu items={postSubmenuItems} />
      <PageHeader title="Add Post" />
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
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

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-6 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors disabled:opacity-50"
            >
              {form.formState.isSubmitting ? 'Adding...' : 'Add Post'}
            </button>
            <button
              type="button"
              onClick={() => form.reset()}
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
