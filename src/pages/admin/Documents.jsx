import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import TableControls from '../../components/admin/TableControls';
import documentService from '../../services/documentService';
import adminService from '../../services/adminService';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rejectionReasonMap, setRejectionReasonMap] = useState({});
  const pageSize = 8;

  const fetchDocuments = async () => {
    try {
      const response = await adminService.getVerificationQueue();
      setDocuments(response.data.documents || []);
    } catch (error) {
      setDocuments([]);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return documents.filter((doc) => {
      const user = `${doc.user?.firstName || ''} ${doc.user?.lastName || ''} ${doc.user?.email || ''}`.toLowerCase();
      return user.includes(query) || String(doc.documentType || '').toLowerCase().includes(query);
    });
  }, [documents, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleVerify = async (id) => {
    try {
      await documentService.verifyDocument(id);
      await fetchDocuments();
    } catch (error) {
      alert(error?.response?.data?.message || 'Verification failed.');
    }
  };

  const handleReject = async (id) => {
    const reason = rejectionReasonMap[id] || 'Document does not meet requirements.';
    try {
      await documentService.rejectDocument(id, reason);
      await fetchDocuments();
    } catch (error) {
      alert(error?.response?.data?.message || 'Rejection failed.');
    }
  };

  return (
    <Card>
      <h2 style={{ marginTop: 0 }}>Verification queue</h2>
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
                <th style={{ padding: '0.8rem' }}>Document</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
                <th style={{ padding: '0.8rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((doc) => (
                <tr key={doc._id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  <td style={{ padding: '0.8rem' }}>{doc.user?.firstName || 'N/A'} {doc.user?.lastName || ''}</td>
                  <td style={{ padding: '0.8rem' }}>{doc.documentType}</td>
                  <td style={{ padding: '0.8rem' }}><Badge tone={doc.verificationStatus === 'VERIFIED' ? 'success' : doc.verificationStatus === 'PENDING' ? 'warning' : 'default'}>{doc.verificationStatus}</Badge></td>
                  <td style={{ padding: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button type="button" onClick={() => handleVerify(doc._id)} style={{ background: '#2e7d32', color: '#fff', border: 'none', borderRadius: 8, padding: '0.45rem 0.7rem', cursor: 'pointer' }}>Verify</button>
                      <input
                        value={rejectionReasonMap[doc._id] || ''}
                        onChange={(event) => setRejectionReasonMap((prev) => ({ ...prev, [doc._id]: event.target.value }))}
                        placeholder="Reason"
                        style={{ border: '1px solid #ddd', borderRadius: 8, padding: '0.45rem 0.6rem', minWidth: 120 }}
                      />
                      <button type="button" onClick={() => handleReject(doc._id)} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '0.45rem 0.7rem', cursor: 'pointer' }}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableControls>
    </Card>
  );
};

export default Documents;
