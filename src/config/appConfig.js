const normalizeBasePath = (value = '') => {
  const trimmed = String(value || '').trim();

  if (!trimmed) {
    return '';
  }

  const withoutSlashes = trimmed.replace(/^\/+|\/+$/g, '');
  return withoutSlashes ? `/${withoutSlashes}` : '';
};

export const appConfig = {
  appName: 'Student & Employee Management Portal',
  logoText: 'MTD',
  logoPlaceholder: 'MTD',
  colors: {
    primary: '#ff6a00',
    secondary: '#e55a00',
    gradient: 'linear-gradient(135deg, #ff6a00, #e55a00)',
    text: '#111111',
    textWhite: '#ffffff',
    textMuted: '#5c5c5c',
    border: '#e9e9e9',
    background: '#f7f7f7',
    surface: '#ffffff',
    dark: '#1a1a1a',
    success: '#2e7d32',
    warning: '#f59e0b',
    danger: '#dc2626'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    headingWeight: 600,
    bodyWeight: 400
  },
  apiUrl: import.meta.env.VITE_API_URL || '',
  basePath: normalizeBasePath(import.meta.env.VITE_APP_BASE_PATH)
};

export const BASE_PATH = appConfig.basePath;
export const API_URL = appConfig.apiUrl;

export default appConfig;
