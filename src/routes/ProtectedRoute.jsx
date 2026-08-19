import { Navigate, useLocation } from 'react-router-dom';
import { BASE_PATH } from '../config/appConfig';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  const loginPath = `${BASE_PATH}/login`;
  const normalizedRole = String(user?.role || '').toLowerCase();

  if (!token || !user) {
    return <Navigate to={loginPath} replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.map((role) => String(role).toLowerCase()).includes(normalizedRole)) {
    return <Navigate to={loginPath} replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
