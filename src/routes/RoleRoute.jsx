import { Navigate } from 'react-router-dom';
import { BASE_PATH } from '../config/appConfig';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ element, allowedRoles = [] }) => {
  const { user, token } = useAuth();
  const loginPath = `${BASE_PATH}/login`;
  const normalizedRole = String(user?.role || '').toLowerCase();

  if (!token || !user) {
    return <Navigate to={loginPath} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.map((role) => String(role).toLowerCase()).includes(normalizedRole)) {
    return <Navigate to={loginPath} replace />;
  }

  return element;
};

export default RoleRoute;
