import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';

interface AuthFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
}

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Admin Panel" className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-sm text-center font-medium">{error}</p>}
                <AuthForm onSubmit={handleLogin} />
                
                <p className="mt-10 text-center text-sm text-gray-600 font-normal">
                    Not a member?{' '}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;