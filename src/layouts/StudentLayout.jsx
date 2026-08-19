import { NavLink, Outlet } from 'react-router-dom';
import { appConfig, BASE_PATH } from '../config/appConfig';

const navItems = [
  { label: 'Dashboard', path: `${BASE_PATH}/student/dashboard` },
  { label: 'Profile', path: `${BASE_PATH}/student/profile` },
  { label: 'Academic', path: `${BASE_PATH}/student/academic` },
  { label: 'Courses', path: `${BASE_PATH}/student/courses` },
  { label: 'Documents', path: `${BASE_PATH}/student/documents` },
  { label: 'Settings', path: `${BASE_PATH}/student/settings` }
];

const StudentLayout = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', color: appConfig.colors.text }}>
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 240,
        background: '#fff',
        borderRight: `1px solid ${appConfig.colors.border}`,
        boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
      }}>
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${appConfig.colors.border}`, fontWeight: 700, fontSize: '1.1rem' }}>
          {appConfig.logoPlaceholder}
        </div>
        <nav style={{ padding: '1rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === `${BASE_PATH}/student/dashboard`}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.75rem 0.9rem',
                borderRadius: 10,
                marginTop: 8,
                color: isActive ? appConfig.colors.primary : '#444',
                background: isActive ? '#fff5ee' : 'transparent',
                fontWeight: isActive ? 600 : 500
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main style={{ marginLeft: 240, padding: '2rem' }}>
        <header style={{ background: appConfig.colors.surface, borderRadius: 16, padding: '1rem 1.25rem', border: `1px solid ${appConfig.colors.border}` }}>
          <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>Student Portal</div>
        </header>
        <div style={{ marginTop: '1.5rem' }}><Outlet /></div>
      </main>
    </div>
  );
};

export default StudentLayout;
