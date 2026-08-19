import { NavLink, Outlet } from 'react-router-dom';
import { appConfig, BASE_PATH } from '../config/appConfig';

const navItems = [
  { label: 'Dashboard', path: `${BASE_PATH}/employee/dashboard` },
  { label: 'Profile', path: `${BASE_PATH}/employee/profile` },
  { label: 'Employment', path: `${BASE_PATH}/employee/employment` },
  { label: 'Documents', path: `${BASE_PATH}/employee/documents` },
  { label: 'Settings', path: `${BASE_PATH}/employee/settings` }
];

const EmployeeLayout = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', color: appConfig.colors.text }}>
      <aside style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 240, background: '#fff', borderRight: `1px solid ${appConfig.colors.border}` }}>
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${appConfig.colors.border}`, fontWeight: 700, fontSize: '1.1rem' }}>{appConfig.logoPlaceholder}</div>
        <nav style={{ padding: '1rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === `${BASE_PATH}/employee/dashboard`}
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
          <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>Employee Portal</div>
        </header>
        <div style={{ marginTop: '1.5rem' }}><Outlet /></div>
      </main>
    </div>
  );
};

export default EmployeeLayout;
