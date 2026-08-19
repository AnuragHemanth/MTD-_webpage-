// Helper to check if a value is considered "filled"
const isFilled = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (typeof value === 'number' && value === 0) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

// Calculate student profile completion (0-100%)
const calculateStudentCompletion = (student) => {
  if (!student) return 0;

  const requiredFields = [
    'firstName',
    'lastName',
    'personalEmail',
    'phoneNumber',
    'dateOfBirth',
    'gender',
    'fatherName',
    'motherName',
    'parentPhoneNumber',
    'addressLine1',
    'city',
    'state',
    'postalCode',
    'country',
    'collegeName',
    'university',
    'course',
    'branch',
    'currentYear',
    'currentSemester',
    'cgpa'
  ];

  const filledCount = requiredFields.filter((field) => isFilled(student[field])).length;
  const percentage = Math.round((filledCount / requiredFields.length) * 100);

  return Math.min(100, Math.max(0, percentage));
};

// Calculate employee profile completion (0-100%)
const calculateEmployeeCompletion = (employee) => {
  if (!employee) return 0;

  const requiredFields = [
    'firstName',
    'lastName',
    'personalEmail',
    'phoneNumber',
    'dateOfBirth',
    'gender',
    'fatherName',
    'motherName',
    'spouseName',
    'emergencyContactName',
    'emergencyContactNumber',
    'emergencyContactRelation',
    'addressLine1',
    'city',
    'state',
    'postalCode',
    'country',
    'department',
    'designation',
    'joiningDate',
    'employmentType',
    'reportingManager',
    'workLocation'
  ];

  const filledCount = requiredFields.filter((field) => isFilled(employee[field])).length;
  const percentage = Math.round((filledCount / requiredFields.length) * 100);

  return Math.min(100, Math.max(0, percentage));
};

module.exports = {
  calculateStudentCompletion,
  calculateEmployeeCompletion,
  isFilled
};
