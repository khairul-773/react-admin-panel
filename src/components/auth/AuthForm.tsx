import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button';
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
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
      {form.formState.errors.root && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 text-sm font-medium">
          {form.formState.errors.root.message}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email address</label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            {...form.register('email')}
            autoComplete="email"
            className="block w-full rounded-md bg-white border border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            placeholder="Enter your email"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600 font-medium">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-900">Password</label>
          {isLogin && (
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
            </div>
          )}
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            {...form.register('password')}
            autoComplete="current-password"
            className="block w-full rounded-md bg-white border border-gray-300 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            placeholder="Enter your password"
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600 font-medium">{form.formState.errors.password.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold tracking-wide text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {form.formState.isSubmitting ? 'Loading...' : isLogin ? 'Sign in' : 'Create account'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;