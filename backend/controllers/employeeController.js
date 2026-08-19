const Employee = require('../models/Employee');
const User = require('../models/User');
const { calculateEmployeeCompletion } = require('../utils/profileCompletion');
const { createSequentialId } = require('../utils/generateProfileId');

const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id }).select('+bankAccountNumber').lean();

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found.' });
    }

    // Calculate and attach profile completion percentage
    const completion = calculateEmployeeCompletion(employee);
    const employeeWithCompletion = { ...employee, profileCompletion: completion };

    return res.status(200).json({ employee: employeeWithCompletion });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Employee profile fetch failed.' });
  }
};

const upsertEmployeeProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'EMPLOYEE') {
      return res.status(403).json({ message: 'Only employee accounts can update this profile.' });
    }

    const payload = {
      ...req.body,
      userId: req.user.id,
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      employeeId: req.body.employeeId || await createSequentialId(Employee, 'employeeId', 'MID')
    };

    const employee = await Employee.findOneAndUpdate(
      { userId: req.user.id },
      { $set: payload },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Calculate and attach profile completion percentage
    const completion = calculateEmployeeCompletion(employee);
    const employeeWithCompletion = { ...employee.toObject ? employee.toObject() : employee, profileCompletion: completion };

    return res.status(200).json({ employee: employeeWithCompletion });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Employee profile update failed.' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    return res.status(200).json({ employee });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Employee fetch failed.' });
  }
};

const listEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    return res.status(200).json({ employees });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Employee list fetch failed.' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Employee delete failed.' });
  }
};

module.exports = {
  getEmployeeProfile,
  upsertEmployeeProfile,
  getEmployeeById,
  listEmployees,
  deleteEmployee
};
