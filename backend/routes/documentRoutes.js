const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const {
  listMyDocuments,
  uploadDocument,
  viewDocument,
  replaceDocument,
  verifyDocument,
  rejectDocument,
  getDocumentById,
  getDocumentByType
} = require('../controllers/documentController');

const router = express.Router();

router.use(authMiddleware);

router.get('/me', listMyDocuments);
router.get('/type/:type', getDocumentByType);
router.get('/file/:filename', viewDocument);
router.get('/:id', getDocumentById);
router.post('/upload', uploadMiddleware.single('document'), uploadDocument);
router.put('/replace', uploadMiddleware.single('document'), replaceDocument);
router.put('/:id/verify', roleMiddleware(['ADMIN', 'HR']), verifyDocument);
router.put('/:id/reject', roleMiddleware(['ADMIN', 'HR']), rejectDocument);

module.exports = router;
