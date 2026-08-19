import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import DocumentCard from '../../components/documents/DocumentCard';
import documentService from '../../services/documentService';

const requiredTypes = ['AADHAAR', 'PAN', '10TH_MARKS_CARD', 'COLLEGE_ID'];
const optionalTypes = ['PASSPORT', 'CERTIFICATE', 'RESUME', 'OTHER'];

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
          />
        ))}
      </div>
    </Card>
  );

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>Student documents</h2>
          <Badge tone="primary">{loading ? 'Loading' : `${documents.length} uploaded`}</Badge>
        </div>
      </Card>

      {renderBlock('Required documents', requiredTypes)}
      {renderBlock('Optional documents', optionalTypes)}
    </div>
  );
};

export default Documents;
