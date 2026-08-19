const { body } = require('express-validator');

const studentProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters.'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters.'),
  body('personalEmail').optional().trim().isEmail().withMessage('Personal email must be valid.'),
  body('phoneNumber').optional().trim().matches(/^[0-9+\-\s()]{7,20}$/).withMessage('Phone number is invalid.'),
  body('city').optional().trim().isLength({ min: 2, max: 80 }).withMessage('City is required.'),
  body('state').optional().trim().isLength({ min: 2, max: 80 }).withMessage('State is required.'),
  body('country').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Country is required.'),
  body('postalCode').optional().trim().isLength({ min: 4, max: 12 }).withMessage('Postal code is invalid.'),
  body('skills').optional().isArray().withMessage('Skills must be a list.'),
  body('skills.*').optional().trim().isLength({ min: 1, max: 80 }).withMessage('Each skill must be between 1 and 80 characters.')
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
  body('country').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Country is required.'),
  body('skills').optional().isArray().withMessage('Skills must be a list.'),
  body('skills.*').optional().trim().isLength({ min: 1, max: 80 }).withMessage('Each skill must be between 1 and 80 characters.'),
  body('bankName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Bank name is invalid.'),
  body('bankAccountName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Account name is invalid.'),
  body('bankAccountNumber').optional().trim().matches(/^\d{6,30}$/).withMessage('Bank account number is invalid.'),
  body('bankIfscCode').optional().trim().matches(/^[A-Za-z0-9-]{4,20}$/).withMessage('Bank routing code is invalid.')
];

module.exports = {
  studentProfileValidation,
  employeeProfileValidation
};
