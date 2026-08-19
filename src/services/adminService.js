import api from './api';

export const getDashboardStats = async () => api.get('/admin/stats');
export const getStudents = async () => api.get('/admin/students');
export const getEmployees = async () => api.get('/admin/employees');
export const getUsers = async () => api.get('/admin/users');
export const getVerificationQueue = async () => api.get('/admin/documents/queue');
export const getCourses = async () => api.get('/admin/courses');
export const createCourse = async (payload) => api.post('/admin/courses', payload);
export const updateCourse = async (id, payload) => api.put(`/admin/courses/${id}`, payload);
export const deleteCourse = async (id) => api.delete(`/admin/courses/${id}`);
export const updateStudentId = async (id, studentId) => api.patch(`/admin/students/${id}/id`, { studentId });
export const updateEmployeeId = async (id, employeeId) => api.patch(`/admin/employees/${id}/id`, { employeeId });

export default {
  getDashboardStats,
  getStudents,
  getEmployees,
  getUsers,
  getVerificationQueue,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  updateStudentId,
  updateEmployeeId
};
