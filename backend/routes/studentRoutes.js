const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { studentProfileValidation } = require('../validators/profileValidators');
const {
  getStudentProfile,
  upsertStudentProfile,
  getStudentById,
  listStudents,
  deleteStudent
} = require('../controllers/studentController');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['STUDENT']));

router.get('/me', getStudentProfile);
router.put('/me', studentProfileValidation, validationMiddleware, upsertStudentProfile);
router.get('/', roleMiddleware(['ADMIN', 'HR']), listStudents);
router.get('/:id', roleMiddleware(['ADMIN', 'HR']), getStudentById);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteStudent);

module.exports = router;
