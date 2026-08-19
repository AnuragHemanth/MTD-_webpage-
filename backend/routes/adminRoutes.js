const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  getDashboardStats,
  getStudents,
  getEmployees,
  getUsers,
  getVerificationQueue,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  updateStudentId,
  updateEmployeeId
} = require('../controllers/adminController');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN', 'HR']));

router.get('/stats', getDashboardStats);
router.get('/students', getStudents);
router.get('/employees', getEmployees);
router.get('/users', getUsers);
router.get('/documents/queue', getVerificationQueue);
router.get('/courses', getCourses);
router.post('/courses', roleMiddleware(['ADMIN']), createCourse);
router.put('/courses/:id', roleMiddleware(['ADMIN']), updateCourse);
router.delete('/courses/:id', roleMiddleware(['ADMIN']), deleteCourse);
router.patch('/students/:id/id', roleMiddleware(['ADMIN']), updateStudentId);
router.patch('/employees/:id/id', roleMiddleware(['ADMIN']), updateEmployeeId);

module.exports = router;
