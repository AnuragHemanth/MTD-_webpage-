const express = require('express');
const { login, register, logout, getCurrentUser, updateCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { loginValidation, registerValidation } = require('../validators/authValidators');

const router = express.Router();

router.post('/login', loginValidation, validationMiddleware, login);
router.post('/register', uploadMiddleware.single('resume'), registerValidation, validationMiddleware, register);
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);
router.patch('/me', authMiddleware, updateCurrentUser);

module.exports = router;
