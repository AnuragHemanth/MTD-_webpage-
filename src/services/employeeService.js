import api from './api';

export const getEmployeeProfile = async () => api.get('/employees/me');
export const upsertEmployeeProfile = async (payload) => api.put('/employees/me', payload);
export const getEmployeeById = async (id) => api.get(`/employees/${id}`);
export const listEmployees = async () => api.get('/employees');
export const deleteEmployee = async (id) => api.delete(`/employees/${id}`);

export default {
  getEmployeeProfile,
  upsertEmployeeProfile,
  getEmployeeById,
  listEmployees,
  deleteEmployee
};
