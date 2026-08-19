const mongoose = require('mongoose');

const DOCUMENT_TYPES = [
  'AADHAAR',
  'PAN',
  'VOTER_ID',
  'PASSPORT',
  '10TH_MARKS_CARD',
  'PUC_MARKS_CARD',
  'DEGREE_MARKS_CARD',
  'DEGREE_CERTIFICATE',
  'MASTERS_MARKS_CARD',
  'MASTERS_CERTIFICATE',
  'COLLEGE_ID',
  'RESUME',
  'CERTIFICATE',
  'OTHER'
];

const VERIFICATION_STATUS = ['NOT_UPLOADED', 'PENDING', 'VERIFIED', 'REJECTED'];

const documentSchema = new mongoose.Schema(
  {
    documentId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentType: { type: String, enum: DOCUMENT_TYPES, required: true },
    fileName: { type: String, required: true },
    storedFileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    verificationStatus: {
      type: String,
      enum: VERIFICATION_STATUS,
      default: 'NOT_UPLOADED'
    },
    uploadedAt: { type: Date, default: Date.now },
    verifiedAt: { type: Date, default: null },
    verifiedBy: { type: String, default: null },
    rejectionReason: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
module.exports.DOCUMENT_TYPES = DOCUMENT_TYPES;
module.exports.VERIFICATION_STATUS = VERIFICATION_STATUS;
