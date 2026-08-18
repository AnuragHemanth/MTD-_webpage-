const EmptyState = ({ title = 'No data', message = 'Nothing to display right now.' }) => (
  <div style={{ background: '#fff', border: '1px solid #e9e9e9', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h3>
    <p style={{ margin: '0.5rem 0 0', color: '#5c5c5c' }}>{message}</p>
  </div>
);

export default EmptyState;
