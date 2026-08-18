import { appConfig } from '../../config/appConfig';

const Navbar = () => (
  <header style={{ background: appConfig.colors.gradient, color: appConfig.colors.textWhite, padding: '1rem 1.25rem', borderRadius: 16 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 700 }}>{appConfig.logoPlaceholder}</div>
      <div style={{ fontWeight: 500 }}>Navigation</div>
    </div>
  </header>
);

export default Navbar;
