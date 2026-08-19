import { useRef, useState } from 'react';
import Badge from '../common/Badge';
import documentService from '../../services/documentService';

const statusColors = {
  NOT_UPLOADED: 'default',
  PENDING: 'warning',
  VERIFIED: 'success',
  REJECTED: 'default'
};

const DocumentCard = ({ documentType, document, required = false, onUploadSuccess, onView }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const status = document?.verificationStatus || 'NOT_UPLOADED';

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      if (document) {
        await documentService.replaceDocument(documentType, file);
      } else {
        await documentService.uploadDocument(documentType, file);
      }
      if (onUploadSuccess) await onUploadSuccess();
    } catch (error) {
      alert(error?.response?.data?.message || 'Document upload failed.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleView = async () => {
    if (!document?.fileUrl) return;

    try {
      const response = await documentService.viewDocument(document.fileUrl);
      const objectUrl = URL.createObjectURL(response.data);
      window.open(objectUrl, '_blank');
    } catch (error) {
      alert(error?.response?.data?.message || 'Document could not be opened.');
    }
  };

  return (
    <div style={{ border: '1px solid #ececec', borderRadius: 14, padding: '1rem', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 700 }}>{documentType.replace(/_/g, ' ')}</div>
          <div style={{ marginTop: 6, fontSize: '0.85rem', color: '#666' }}>
            {required ? 'Required' : 'Optional'}
          </div>
        </div>

        <Badge tone={statusColors[status] || 'default'}>{status}</Badge>
      </div>

      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {document?.fileUrl && (
          <button type="button" onClick={handleView} style={{ background: '#fff5ee', color: '#ff6a00', border: 'none', borderRadius: 10, padding: '0.6rem 0.9rem', fontWeight: 600, cursor: 'pointer' }}>
            View
          </button>
        )}

        <button type="button" onClick={() => fileInputRef.current?.click()} style={{ background: '#ff6a00', color: '#fff', border: 'none', borderRadius: 10, padding: '0.6rem 0.9rem', fontWeight: 600, cursor: 'pointer' }}>
          {uploading ? 'Uploading...' : document ? 'Replace' : 'Upload'}
        </button>

        <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />
      </div>

      {document?.rejectionReason && (
        <div style={{ marginTop: '0.75rem', color: '#b42318', fontSize: '0.85rem' }}>
          Rejection reason: {document.rejectionReason}
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
