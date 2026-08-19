const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  getDashboardStats,
  getStudents,
  getEmployees,
  getUsers,
  getVerificationQueue
} = require('../controllers/adminController');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN', 'HR']));

router.get('/stats', getDashboardStats);
router.get('/students', getStudents);
router.get('/employees', getEmployees);
router.get('/users', getUsers);
router.get('/documents/queue', getVerificationQueue);

module.exports = router;
