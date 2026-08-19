const { body } = require('express-validator');

const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email is required.'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
];

const registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters.'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email is required.'),
  body('password')
    .isString()
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters.'),
  body('role')
    .optional()
    .isIn(['STUDENT', 'EMPLOYEE', 'TRAINER', 'HR', 'ADMIN'])
    .withMessage('Invalid role selected.')
];

module.exports = {
  loginValidation,
  registerValidation
};
