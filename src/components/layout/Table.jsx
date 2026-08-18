const Table = ({ columns = [], rows = [] }) => (
  <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 16, border: '1px solid #e9e9e9' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#fff7f2' }}>
          {columns.map((column) => (
            <th key={column.key} style={{ textAlign: 'left', padding: '0.9rem 1rem', fontWeight: 700 }}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} style={{ borderTop: '1px solid #f0f0f0' }}>
            {columns.map((column) => (
              <td key={column.key} style={{ padding: '0.85rem 1rem' }}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
