import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import TableControls from '../../components/admin/TableControls';
import adminService from '../../services/adminService';

const Verification = () => {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await adminService.getVerificationQueue();
        setDocuments((response.data.documents || []).filter((doc) => doc.verificationStatus !== 'VERIFIED'));
      } catch (error) {
        setDocuments([]);
      }
    };

    fetchDocuments();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return documents.filter((doc) => `${doc.documentType || ''} ${doc.user?.firstName || ''} ${doc.user?.lastName || ''}`.toLowerCase().includes(query));
  }, [documents, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <Card>
      <h2 style={{ marginTop: 0 }}>Verification</h2>
      <TableControls
        search={search}
        onSearchChange={setSearch}
        page={page}
        pageCount={pageCount}
        total={filtered.length}
        onPrev={() => setPage((current) => Math.max(1, current - 1))}
        onNext={() => setPage((current) => Math.min(pageCount, current + 1))}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '0.8rem' }}>User</th>
                <th style={{ padding: '0.8rem' }}>Type</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((doc) => (
                <tr key={doc._id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  <td style={{ padding: '0.8rem' }}>{doc.user?.firstName || 'N/A'} {doc.user?.lastName || ''}</td>
                  <td style={{ padding: '0.8rem' }}>{doc.documentType}</td>
                  <td style={{ padding: '0.8rem' }}><Badge tone={doc.verificationStatus === 'PENDING' ? 'warning' : 'default'}>{doc.verificationStatus}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableControls>
    </Card>
  );
};

export default Verification;
