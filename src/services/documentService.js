import api from './api';

export const getMyDocuments = async () => api.get('/documents/me');

export const uploadDocument = async (documentType, file) => {
  const formData = new FormData();
  formData.append('documentType', documentType);
  formData.append('document', file);

  return api.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const replaceDocument = async (documentType, file) => {
  const formData = new FormData();
  formData.append('documentType', documentType);
  formData.append('document', file);

  return api.put('/documents/replace', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const viewDocument = async (fileUrl) => api.get(fileUrl, { responseType: 'blob' });

export const verifyDocument = async (id) => api.put(`/documents/${id}/verify`);
export const rejectDocument = async (id, rejectionReason) => api.put(`/documents/${id}/reject`, { rejectionReason });
export const getDocumentByType = async (type) => api.get(`/documents/type/${type}`);

export default {
  getMyDocuments,
  uploadDocument,
  replaceDocument,
  viewDocument,
  verifyDocument,
  rejectDocument,
  getDocumentByType
};
