const fs = require('fs');
const path = require('path');
const Document = require('../models/Document');
const { DOCUMENT_TYPES, VERIFICATION_STATUS } = require('../models/Document');

const UPLOAD_ROOT = path.join(__dirname, '..', 'uploads');

const ensureUploadDirectory = () => {
  if (!fs.existsSync(UPLOAD_ROOT)) {
    fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
  }
};

const normalizeRole = (role = '') => String(role).trim().toUpperCase();

const getDocumentTypeLabel = (type) => String(type || '').replace(/_/g, ' ');

const canAccessDocument = (req, document) => {
  if (!document || !req.user) {
    return false;
  }

  const currentUserId = String(req.user.id);
  const isOwner = String(document.userId) === currentUserId;
  const isAuthorizedRole = ['ADMIN', 'HR', 'EMPLOYEE', 'STUDENT', 'TRAINER'].includes(normalizeRole(req.user.role));

  return isOwner || (isAuthorizedRole && req.user.role !== 'undefined' && ['ADMIN', 'HR'].includes(normalizeRole(req.user.role)));
};

const listMyDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id }).sort({ uploadedAt: -1 });
    return res.status(200).json({ documents });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Document list failed.' });
  }
};

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const documentType = String(req.body.documentType || '').toUpperCase();

    if (!DOCUMENT_TYPES.includes(documentType)) {
      return res.status(400).json({ message: 'Invalid document type.' });
    }

    const existing = await Document.findOne({ userId: req.user.id, documentType });

    if (existing) {
      const oldFilePath = path.join(UPLOAD_ROOT, existing.storedFileName);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      await Document.findByIdAndDelete(existing._id);
    }

    ensureUploadDirectory();

    const documentId = `DOC-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const fileName = req.file.originalname;
    const storedFileName = req.file.filename;
    const fileUrl = `/api/documents/file/${storedFileName}`;

    const document = await Document.create({
      documentId,
      userId: req.user.id,
      documentType,
      fileName,
      storedFileName,
      fileUrl,
      verificationStatus: 'PENDING',
      uploadedAt: new Date()
    });

    return res.status(201).json({ document });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Document upload failed.' });
  }
};

const viewDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ storedFileName: req.params.filename });

    if (!document) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    if (!canAccessDocument(req, document)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const filePath = path.join(UPLOAD_ROOT, document.storedFileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File does not exist on disk.' });
    }

    res.setHeader('Content-Disposition', `inline; filename="${document.fileName}"`);
    return res.sendFile(filePath);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Document view failed.' });
  }
};

const replaceDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No replacement file uploaded.' });
  }

  const document = await Document.findOne({ userId: req.user.id, documentType: req.body.documentType });

  if (!document) {
    return res.status(404).json({ message: 'Document not found.' });
  }

  const oldFilePath = path.join(UPLOAD_ROOT, document.storedFileName);
  if (fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }

  document.fileName = req.file.originalname;
  document.storedFileName = req.file.filename;
  document.fileUrl = `/api/documents/file/${req.file.filename}`;
  document.verificationStatus = 'PENDING';
  document.uploadedAt = new Date();
  document.verifiedAt = null;
  document.verifiedBy = null;
  document.rejectionReason = null;
  await document.save();

  return res.status(200).json({ document });
};

const verifyDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    if (!['ADMIN', 'HR'].includes(String(req.user.role).toUpperCase())) {
      return res.status(403).json({ message: 'Only HR/ADMIN can verify documents.' });
    }

    document.verificationStatus = 'VERIFIED';
    document.verifiedAt = new Date();
    document.verifiedBy = `${req.user.email}`;
    document.rejectionReason = null;
    await document.save();

    return res.status(200).json({ document });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Verification failed.' });
  }
};

const rejectDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    if (!['ADMIN', 'HR'].includes(String(req.user.role).toUpperCase())) {
      return res.status(403).json({ message: 'Only HR/ADMIN can reject documents.' });
    }

    document.verificationStatus = 'REJECTED';
    document.verifiedAt = null;
    document.rejectionReason = req.body.rejectionReason || 'Document does not meet requirements.';
    await document.save();

    return res.status(200).json({ document });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Rejection failed.' });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    if (!canAccessDocument(req, document)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return res.status(200).json({ document });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Document fetch failed.' });
  }
};

const getDocumentByType = async (req, res) => {
  try {
    const document = await Document.findOne({ userId: req.user.id, documentType: req.params.type.toUpperCase() });
    if (!document) {
      return res.status(404).json({ message: `${getDocumentTypeLabel(req.params.type)} not uploaded.` });
    }
    return res.status(200).json({ document });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Document lookup failed.' });
  }
};

module.exports = {
  listMyDocuments,
  uploadDocument,
  viewDocument,
  replaceDocument,
  verifyDocument,
  rejectDocument,
  getDocumentById,
  getDocumentByType,
  VERIFICATION_STATUS,
  DOCUMENT_TYPES
};
