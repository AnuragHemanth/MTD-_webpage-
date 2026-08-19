const { body } = require('express-validator');

const studentProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters.'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters.'),
  body('personalEmail').optional().trim().isEmail().withMessage('Personal email must be valid.'),
  body('phoneNumber').optional().trim().matches(/^[0-9+\-\s()]{7,20}$/).withMessage('Phone number is invalid.'),
  body('city').optional().trim().isLength({ min: 2, max: 80 }).withMessage('City is required.'),
  body('state').optional().trim().isLength({ min: 2, max: 80 }).withMessage('State is required.'),
  body('country').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Country is required.'),
  body('postalCode').optional().trim().isLength({ min: 4, max: 12 }).withMessage('Postal code is invalid.')
];

const employeeProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters.'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters.'),
  body('personalEmail').optional().trim().isEmail().withMessage('Personal email must be valid.'),
  body('phoneNumber').optional().trim().matches(/^[0-9+\-\s()]{7,20}$/).withMessage('Phone number is invalid.'),
  body('department').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Department is required.'),
  body('designation').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Designation is required.'),
  body('workLocation').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Work location is required.'),
  body('city').optional().trim().isLength({ min: 2, max: 80 }).withMessage('City is required.'),
  body('state').optional().trim().isLength({ min: 2, max: 80 }).withMessage('State is required.'),
  body('country').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Country is required.')
];

module.exports = {
  studentProfileValidation,
  employeeProfileValidation
};
