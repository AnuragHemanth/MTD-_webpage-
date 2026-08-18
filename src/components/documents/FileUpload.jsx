const FileUpload = ({ label = 'Upload file' }) => (
  <label style={{ display: 'block', background: '#fff', border: '1px dashed #ffb07c', borderRadius: 14, padding: '1rem', color: '#ff6a00', fontWeight: 600 }}>
    <input type="file" style={{ display: 'none' }} />
    {label}
  </label>
);

export default FileUpload;
