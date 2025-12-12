import { createContext, useContext, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginSuccess, logout as logoutAction } from '@/store/slices/authSlice';

interface AuthUser {
  email: string;
  token: string;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
} & AuthActions;

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const token = 'mock-jwt-token';
    const userData = { email, token };
    
    dispatch(loginSuccess(userData));
  };

  const register = async (email: string, password: string) => {
    // Simulate API call
    const token = 'mock-jwt-token';
    const userData = { email, token };
    
    dispatch(loginSuccess(userData));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};