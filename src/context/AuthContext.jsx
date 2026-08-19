import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);
const AUTH_TOKEN_KEY = 'portal-token';

const normalizeRole = (role = '') => String(role || '').trim().toLowerCase();

const normalizeUser = (value) => {
  if (!value) return null;

  return {
    ...value,
    role: normalizeRole(value.role)
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem('portal-user');
    return storedUser ? normalizeUser(JSON.parse(storedUser)) : null;
  });
  const [token, setTokenState] = useState(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem('token');
    return storedToken || null;
  });
  const [loading, setLoading] = useState(false);

  const updateUser = (nextUser) => {
    const normalized = normalizeUser(nextUser);
    setUserState(normalized);

    if (normalized) {
      localStorage.setItem('portal-user', JSON.stringify(normalized));
    } else {
      localStorage.removeItem('portal-user');
    }
  };

  const updateToken = (nextToken) => {
    setTokenState(nextToken);

    if (nextToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
      localStorage.removeItem('token');
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('token');
    }
  };

  const getCurrentUser = async () => {
    if (!token) {
      return null;
    }

    try {
      setLoading(true);
      const response = await authService.getCurrentUser();
      const normalized = normalizeUser(response?.data?.user || response?.data || null);
      updateUser(normalized);
      return normalized;
    } catch (error) {
      updateUser(null);
      updateToken(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);

    try {
      const response = await authService.login(credentials);
      const authToken = response?.data?.token;
      const authUser = normalizeUser(response?.data?.user || null);

      if (!authToken || !authUser) {
        throw new Error('Login response missing user or token.');
      }

      updateToken(authToken);
      updateUser(authUser);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore server-side logout errors for local state cleanup.
    } finally {
      updateUser(null);
      updateToken(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      getCurrentUser,
      setUser: updateUser,
      setToken: updateToken
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};

export default AuthContext;
