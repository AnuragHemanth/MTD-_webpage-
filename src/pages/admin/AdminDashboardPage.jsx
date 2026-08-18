import { appConfig } from '../../config/appConfig';

const AdminDashboardPage = () => {
  return (
    <div style={{ background: appConfig.colors.surface, borderRadius: 20, boxShadow: '0 16px 40px rgba(0,0,0,0.06)', border: `1px solid ${appConfig.colors.border}`, padding: '2rem' }}>
      <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Admin Dashboard</h1>
      <p style={{ marginTop: '0.75rem', color: appConfig.colors.textMuted }}>Platform controls and management reports will appear here.</p>
      <div style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: 14, background: '#fff7f2', border: `1px solid #ffd8ba`, color: appConfig.colors.primary, fontWeight: 600 }}>Coming soon</div>
    </div>
  );
};

export default AdminDashboardPage;
