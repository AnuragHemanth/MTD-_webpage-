import { NavLink, Outlet } from 'react-router-dom';
import { appConfig } from '../config/appConfig';

const PublicLayout = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', color: appConfig.colors.text }}>
      <header style={{
        background: appConfig.colors.gradient,
        color: appConfig.colors.textWhite,
        padding: '1rem 2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{appConfig.logoPlaceholder}</div>
          <nav style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }} aria-label="Public navigation">
            <NavLink to="/register/student">Student registration</NavLink>
            <NavLink to="/register/employee">Employee registration</NavLink>
            <NavLink to="/admin/login">Admin login</NavLink>
          </nav>
        </div>
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.25rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
