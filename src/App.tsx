import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/layout/Layout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import NotFound from '@/pages/NotFound';
import AddProduct from '@/pages/products/AddProduct';
import AllProducts from '@/pages/products/AllProducts';
import Category from '@/pages/products/Category';
import Brand from '@/pages/products/Brand';
import Unit from '@/pages/products/Unit';
import Barcode from '@/pages/products/Barcode';
import AddPost from '@/pages/posts/AddPost';
import AllPosts from '@/pages/posts/AllPosts';

/**
 * Route configuration interface
 */
interface RouteConfig {
  path: string;
  component: React.ComponentType;
}

/**
 * Protected routes configuration
 * Centralized route definitions for better maintainability
 */
const protectedRoutes: RouteConfig[] = [
  { path: '/dashboard', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/posts/add', component: AddPost },
  { path: '/posts/all', component: AllPosts },
  { path: '/products/add', component: AddProduct },
  { path: '/products/all', component: AllProducts },
  { path: '/products/category', component: Category },
  { path: '/products/brand', component: Brand },
  { path: '/products/unit', component: Unit },
  { path: '/products/barcode', component: Barcode },
];

/**
 * Main App Component
 * Sets up routing and global providers
 */
const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            {protectedRoutes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Component />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <NotFound />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;