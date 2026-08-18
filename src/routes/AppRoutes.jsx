import { Navigate, Route, Routes } from 'react-router-dom';
import { BASE_PATH } from '../config/appConfig';
import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';
import EmployeeLayout from '../layouts/EmployeeLayout';
import AdminLayout from '../layouts/AdminLayout';
import HRLayout from '../layouts/HRLayout';
import TrainerLayout from '../layouts/TrainerLayout';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import StudentDashboardPage from '../pages/student/StudentDashboardPage';
import EmployeeDashboardPage from '../pages/employee/EmployeeDashboardPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import HRDashboardPage from '../pages/hr/HRDashboardPage';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

const AppRoutes = () => {
  const withBasePath = (path) => `${BASE_PATH}${path}`;

  return (
    <Routes>
      <Route path={withBasePath('/')} element={<PublicLayout />}>
        <Route index element={<Navigate to={withBasePath('/login')} replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path={withBasePath('/student')}
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboardPage />} />
      </Route>

      <Route
        path={withBasePath('/employee')}
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboardPage />} />
      </Route>

      <Route
        path={withBasePath('/admin')}
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
      </Route>

      <Route
        path={withBasePath('/hr')}
        element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HRDashboardPage />} />
      </Route>

      <Route
        path={withBasePath('/trainer')}
        element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <TrainerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={withBasePath('/trainer/dashboard')} replace />} />
        <Route path="dashboard" element={<div>Trainer dashboard coming soon.</div>} />
      </Route>

      <Route path="*" element={<Navigate to={withBasePath('/login')} replace />} />
    </Routes>
  );
};

export default AppRoutes;
