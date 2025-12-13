import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button';
import FormInput from '../forms/FormInput';
import { authSchema, type AuthFormInputs } from '@/schemas/validationSchemas';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLogin = true }) => {
  const form = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: AuthFormInputs) => {
    try {
      await onSubmit(data.email, data.password);
    } catch (err) {
      form.setError('root', {
        message: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
      {form.formState.errors.root && (
        <div className="text-gray-900 bg-red-50 border border-red-200 rounded-md p-3 text-sm">
          {form.formState.errors.root.message}
        </div>
      )}
      
      <FormInput
        label="Email"
        name="email"
        type="text"
        placeholder="Enter your email"
        form={form}
        required
      />
      
      <FormInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        form={form}
        required
      />
      
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Loading...' : isLogin ? 'Login' : 'Register'}
      </Button>
    </form>
  );
};

export default AuthForm;