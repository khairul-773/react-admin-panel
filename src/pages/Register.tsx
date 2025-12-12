import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg border border-gray-200 w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>
                {error && <p className="text-gray-900 bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-center">{error}</p>}
                <AuthForm onSubmit={handleRegister} isLogin={false} />
            </div>
        </div>
    );
};

export default Register;