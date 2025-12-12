import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg border border-gray-200 w-96">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
                {error && <p className="text-gray-900 bg-red-50 border border-red-200 rounded-md p-3 mb-4">{error}</p>}
                <AuthForm onSubmit={handleLogin} />
            </div>
        </div>
    );
};

export default Login;