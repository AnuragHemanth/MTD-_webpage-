import { appConfig } from '../../config/appConfig';

const Sidebar = ({ items = [] }) => (
  <aside style={{ width: 240, background: '#fff', borderRight: `1px solid ${appConfig.colors.border}`, minHeight: '100vh', padding: '1rem' }}>
    <div style={{ fontWeight: 700, fontSize: '1.2rem', padding: '0.5rem 0.75rem', marginBottom: '1rem' }}>{appConfig.logoPlaceholder}</div>
    {items.map((item) => (
      <div key={item.label} style={{ padding: '0.75rem 0.9rem', borderRadius: 10, marginTop: 8, color: '#444' }}>
        {item.label}
      </div>
    ))}
  </aside>
);

export default Sidebar;
