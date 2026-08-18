import { Outlet } from 'react-router-dom';
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
          <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>Portal Access</div>
        </div>
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.25rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
