import axios from 'axios';
import { API_URL } from '../config/appConfig';

const AUTH_TOKEN_KEY = 'portal-token';

const api = axios.create({
  baseURL: API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
