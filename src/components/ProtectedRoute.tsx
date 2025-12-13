import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';

/**
 * ProtectedRoute Props
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * LoadingSpinner Component
 * Simple loading indicator
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent mb-4"></div>
      <div className="text-base font-medium text-gray-900">Loading...</div>
    </div>
  </div>
);

/**
 * ProtectedRoute Component
 * Restricts access to authenticated users only
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default ProtectedRoute;