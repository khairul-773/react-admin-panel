import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginSuccess, logout as logoutAction, loginStart, loginFailure } from '@/store/slices/authSlice';
import { SUCCESS_MESSAGES } from '@/constants';

/**
 * User authentication data interface
 */
interface AuthUser {
  email: string;
  token: string;
}

/**
 * Authentication error interface
 */
interface AuthError {
  message: string;
  code?: string;
}

/**
 * Authentication actions interface
 */
interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

/**
 * Complete auth context type
 */
export type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
} & AuthActions;

/**
 * Auth context
 */
export const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<AuthError | null>(null);

  /**
   * Login user with email and password
   */
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      dispatch(loginStart());
      setError(null);

      // TODO: Replace with actual API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate credentials (mock validation)
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }

      const token = `mock-jwt-token-${Date.now()}`;
      const userData: AuthUser = { email, token };
      
      dispatch(loginSuccess(userData));
    } catch (err) {
      const authError: AuthError = {
        message: err instanceof Error ? err.message : 'Login failed',
        code: 'AUTH_ERROR',
      };
      setError(authError);
      dispatch(loginFailure());
      throw authError;
    }
  }, [dispatch]);

  /**
   * Register new user with email and password
   */
  const register = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      dispatch(loginStart());
      setError(null);

      // TODO: Replace with actual API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const token = `mock-jwt-token-${Date.now()}`;
      const userData: AuthUser = { email, token };
      
      dispatch(loginSuccess(userData));
      toast.success(SUCCESS_MESSAGES.REGISTER_SUCCESS);
    } catch (err) {
      const authError: AuthError = {
        message: err instanceof Error ? err.message : 'Registration failed',
        code: 'REGISTER_ERROR',
      };
      setError(authError);
      dispatch(loginFailure());
      toast.error(authError.message);
      throw authError;
    }
  }, [dispatch]);

  /**
   * Logout current user
   */
  const logout = useCallback(() => {
    setError(null);
    dispatch(logoutAction());
    toast.info(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  }, [dispatch]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};