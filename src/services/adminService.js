import api from './api';

export const getDashboardStats = async () => api.get('/admin/stats');
export const getStudents = async () => api.get('/admin/students');
export const getEmployees = async () => api.get('/admin/employees');
export const getUsers = async () => api.get('/admin/users');
export const getVerificationQueue = async () => api.get('/admin/documents/queue');

export default {
  getDashboardStats,
  getStudents,
  getEmployees,
  getUsers,
  getVerificationQueue
};
