const TableControls = ({
  search,
  onSearchChange,
  page,
  pageCount,
  onPrev,
  onNext,
  total,
  children
}) => (
  <div style={{ display: 'grid', gap: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search..."
        style={{
          flex: 1,
          minWidth: 200,
          padding: '0.75rem 1rem',
          borderRadius: 10,
          border: '1px solid #e9e9e9',
          outline: 'none'
        }}
      />
      <div style={{ color: '#666', fontSize: '0.9rem' }}>
        {total} records
      </div>
    </div>

    {children}

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <button type="button" onClick={onPrev} disabled={page <= 1} style={{ padding: '0.6rem 1rem', borderRadius: 10, border: '1px solid #ddd', background: '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>
        Prev
      </button>
      <div style={{ fontWeight: 600 }}>Page {page} / {pageCount || 1}</div>
      <button type="button" onClick={onNext} disabled={page >= pageCount} style={{ padding: '0.6rem 1rem', borderRadius: 10, border: '1px solid #ddd', background: '#fff', cursor: page >= pageCount ? 'not-allowed' : 'pointer' }}>
        Next
      </button>
    </div>
  </div>
);

export default TableControls;
