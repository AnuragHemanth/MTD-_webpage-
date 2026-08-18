import { Outlet } from 'react-router-dom';
import { appConfig } from '../config/appConfig';

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
          <div style={{ padding: '0.75rem 0.9rem', borderRadius: 10, background: '#fff5ee', color: appConfig.colors.primary, fontWeight: 600 }}>Dashboard</div>
          <div style={{ padding: '0.75rem 0.9rem', marginTop: 8, color: '#444' }}>Profile</div>
          <div style={{ padding: '0.75rem 0.9rem', marginTop: 8, color: '#444' }}>Courses</div>
          <div style={{ padding: '0.75rem 0.9rem', marginTop: 8, color: '#444' }}>Documents</div>
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
