const Button = ({ children, variant = 'primary', ...props }) => {
  const styles = {
    primary: { background: '#ff6a00', color: '#fff', border: 'none' },
    secondary: { background: '#fff', color: '#111', border: '1px solid #e9e9e9' }
  };

  return (
    <button
      {...props}
      style={{
        borderRadius: 12,
        padding: '0.75rem 1rem',
        fontWeight: 600,
        cursor: 'pointer',
        ...styles[variant] || styles.primary
      }}
    >
      {children}
    </button>
  );
};

export default Button;
