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
import StudentDashboardPage from '../pages/student/Dashboard';
import StudentProfilePage from '../pages/student/Profile';
import StudentAcademicPage from '../pages/student/Academic';
import StudentCoursesPage from '../pages/student/Courses';
import StudentDocumentsPage from '../pages/student/Documents';
import StudentSettingsPage from '../pages/student/Settings';
import EmployeeDashboardPage from '../pages/employee/Dashboard';
import EmployeeProfilePage from '../pages/employee/Profile';
import EmployeeEmploymentPage from '../pages/employee/Employment';
import EmployeeDocumentsPage from '../pages/employee/Documents';
import EmployeeSettingsPage from '../pages/employee/Settings';
import AdminDashboardPage from '../pages/admin/Dashboard';
import AdminStudentsPage from '../pages/admin/Students';
import AdminEmployeesPage from '../pages/admin/Employees';
import AdminDocumentsPage from '../pages/admin/Documents';
import AdminUsersPage from '../pages/admin/Users';
import AdminSettingsPage from '../pages/admin/Settings';
import HRDashboardPage from '../pages/hr/Dashboard';
import HREmployeesPage from '../pages/hr/Employees';
import HRDocumentsPage from '../pages/hr/Documents';
import HRVerificationPage from '../pages/hr/Verification';
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
            <RoleRoute element={<StudentLayout />} allowedRoles={['student']} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={withBasePath('/student/dashboard')} replace />} />
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="academic" element={<StudentAcademicPage />} />
        <Route path="courses" element={<StudentCoursesPage />} />
        <Route path="documents" element={<StudentDocumentsPage />} />
        <Route path="settings" element={<StudentSettingsPage />} />
      </Route>

      <Route
        path={withBasePath('/employee')}
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <RoleRoute element={<EmployeeLayout />} allowedRoles={['employee']} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={withBasePath('/employee/dashboard')} replace />} />
        <Route path="dashboard" element={<EmployeeDashboardPage />} />
        <Route path="profile" element={<EmployeeProfilePage />} />
        <Route path="employment" element={<EmployeeEmploymentPage />} />
        <Route path="documents" element={<EmployeeDocumentsPage />} />
        <Route path="settings" element={<EmployeeSettingsPage />} />
      </Route>

      <Route
        path={withBasePath('/admin')}
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <RoleRoute element={<AdminLayout />} allowedRoles={['admin']} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={withBasePath('/admin/dashboard')} replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="students" element={<AdminStudentsPage />} />
        <Route path="employees" element={<AdminEmployeesPage />} />
        <Route path="documents" element={<AdminDocumentsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      <Route
        path={withBasePath('/hr')}
        element={
          <ProtectedRoute allowedRoles={['hr']}>
            <RoleRoute element={<HRLayout />} allowedRoles={['hr']} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={withBasePath('/hr/dashboard')} replace />} />
        <Route path="dashboard" element={<HRDashboardPage />} />
        <Route path="employees" element={<HREmployeesPage />} />
        <Route path="documents" element={<HRDocumentsPage />} />
        <Route path="verification" element={<HRVerificationPage />} />
      </Route>

      <Route
        path={withBasePath('/trainer')}
        element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <RoleRoute element={<TrainerLayout />} allowedRoles={['trainer']} />
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
