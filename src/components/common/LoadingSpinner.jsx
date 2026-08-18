const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120, color: '#ff6a00', fontWeight: 600 }}>
    <div style={{ width: 18, height: 18, border: '3px solid #ffd5b8', borderTop: '3px solid #ff6a00', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: 10 }} />
    {label}
  </div>
);

export default LoadingSpinner;
