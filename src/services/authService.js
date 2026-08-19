import api from './api';

export const login = async (payload) => api.post('/auth/login', payload);
export const register = async (payload) => api.post(
  '/auth/register',
  payload,
  payload instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
);
export const logout = async () => api.post('/auth/logout');
export const getCurrentUser = async () => api.get('/auth/me');
export const updateCurrentUser = async (payload) => api.patch('/auth/me', payload);

export default {
  login,
  register,
  logout,
  getCurrentUser,
  updateCurrentUser
};
