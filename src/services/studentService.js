import api from './api';

export const getStudentProfile = async () => api.get('/students/me');
export const upsertStudentProfile = async (payload) => api.put('/students/me', payload);
export const getStudentById = async (id) => api.get(`/students/${id}`);
export const listStudents = async () => api.get('/students');
export const deleteStudent = async (id) => api.delete(`/students/${id}`);

export default {
  getStudentProfile,
  upsertStudentProfile,
  getStudentById,
  listStudents,
  deleteStudent
};
