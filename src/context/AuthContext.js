import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/auth.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const result = await authAPI.getMe();
          if (result.success) {
            setUser(result.data.user);
          }
        } catch (error) {
          console.error('Failed to validate token:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const result = await authAPI.login(credentials);
      if (result.success) {
        setUser(result.data.user);
        setToken(result.data.token);
        return {
          success: true,
          data: result.data
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      const result = await authAPI.signup(userData);
      if (result.success) {
        setUser(result.data.user);
        setToken(result.data.token);
        return { 
          success: true,
          data: result.data
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Signup failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authAPI.logout();
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => React.useContext(AuthContext);
