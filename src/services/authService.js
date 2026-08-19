import api from './api';

export const login = async (payload) => api.post('/auth/login', payload);
export const register = async (payload) => api.post('/auth/register', payload);
export const logout = async () => api.post('/auth/logout');
export const getCurrentUser = async () => api.get('/auth/me');

export default {
  login,
  register,
  logout,
  getCurrentUser
};
