const Badge = ({ children, tone = 'default' }) => {
  const tones = {
    default: { background: '#f1f1f1', color: '#111' },
    primary: { background: '#fff5ee', color: '#ff6a00' },
    success: { background: '#edf9ef', color: '#2e7d32' },
    warning: { background: '#fff8df', color: '#b7791f' }
  };

  return (
    <span style={{ ...tones[tone] || tones.default, borderRadius: 999, display: 'inline-block', padding: '0.35rem 0.75rem', fontWeight: 600, fontSize: '0.8rem' }}>
      {children}
    </span>
  );
};

export default Badge;
