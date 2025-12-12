import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateEmail, validatePassword } from '../../utils/validators';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLogin = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-gray-900 bg-red-50 border border-red-200 rounded-md p-3 text-sm">{error}</div>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
      </Button>
    </form>
  );
};

export default AuthForm;