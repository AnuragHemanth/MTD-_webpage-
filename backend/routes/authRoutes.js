const express = require('express');
const { login, register, logout, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { loginValidation, registerValidation } = require('../validators/authValidators');

const router = express.Router();

router.post('/login', loginValidation, validationMiddleware, login);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
