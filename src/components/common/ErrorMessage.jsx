const ErrorMessage = ({ message = 'Something went wrong.' }) => (
  <div style={{ background: '#fff1f1', border: '1px solid #f8c4c4', borderRadius: 14, color: '#a22525', padding: '0.9rem 1rem' }}>
    {message}
  </div>
);

export default ErrorMessage;
