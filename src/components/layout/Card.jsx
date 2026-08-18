const Card = ({ children, style = {} }) => (
  <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e9e9e9', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', padding: '1.25rem', ...style }}>
    {children}
  </div>
);

export default Card;
