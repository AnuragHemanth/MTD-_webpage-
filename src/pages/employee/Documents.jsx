import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import DocumentCard from '../../components/documents/DocumentCard';
import documentService from '../../services/documentService';

const requiredTypes = ['AADHAAR', 'PAN', 'PASSPORT', 'RESUME'];
const optionalTypes = ['VOTER_ID', 'COLLEGE_ID', 'CERTIFICATE', 'OTHER'];

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const documentMap = useMemo(() => {
    return documents.reduce((acc, item) => {
      acc[item.documentType] = item;
      return acc;
    }, {});
  }, [documents]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentService.getMyDocuments();
      setDocuments(response.data.documents || []);
    } catch (error) {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const renderBlock = (title, types) => (
    <Card>
      <h3 style={{ margin: '0 0 1rem' }}>{title}</h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {types.map((type) => (
          <DocumentCard
            key={type}
            documentType={type}
            document={documentMap[type]}
            required={requiredTypes.includes(type)}
            onUploadSuccess={fetchDocuments}
            onView={documentService.viewDocument}
          />
        ))}
      </div>
    </Card>
  );

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>Employee documents</h2>
          <Badge tone="primary">{loading ? 'Loading' : `${documents.length} uploaded`}</Badge>
        </div>
      </Card>

      {renderBlock('Required documents', requiredTypes)}
      {renderBlock('Optional documents', optionalTypes)}
    </div>
  );
};

export default Documents;
