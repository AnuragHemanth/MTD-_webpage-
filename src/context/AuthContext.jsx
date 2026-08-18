import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (credentials) => {
    const mockUser = {
      id: 'demo-user',
      email: credentials?.email || 'user@example.com',
      role: 'student'
    };

    setUser(mockUser);
    setToken('stubbed-jwt-token');
    localStorage.setItem('token', 'stubbed-jwt-token');

    return {
      ok: true,
      user: mockUser,
      message: 'Auth flow initialized. Replace with real JWT logic in Phase 2.'
    };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      setUser,
      setToken
    }),
    [user, token]
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
