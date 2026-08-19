const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { employeeProfileValidation } = require('../validators/profileValidators');
const {
  getEmployeeProfile,
  upsertEmployeeProfile,
  getEmployeeById,
  listEmployees,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['EMPLOYEE']));

router.get('/me', getEmployeeProfile);
router.put('/me', employeeProfileValidation, validationMiddleware, upsertEmployeeProfile);
router.get('/', roleMiddleware(['ADMIN', 'HR']), listEmployees);
router.get('/:id', roleMiddleware(['ADMIN', 'HR']), getEmployeeById);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteEmployee);

module.exports = router;
