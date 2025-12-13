import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

interface AuthFormProps {
    isLogin: boolean;
    onSubmit: (email: string, password: string) => Promise<void>;
}

const Register: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string) => {
        try {
            // Here you would typically send a request to your backend API to register the user
            // For example:
            // await api.register(data);
            // Redirect to login or dashboard after successful registration
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Admin Panel" className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Create your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-sm text-center">{error}</p>}
                <AuthForm onSubmit={handleRegister} isLogin={false} />
                
                <p className="mt-10 text-center text-sm text-gray-600">
                    Already a member?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;