const User = require('../models/User');
const Student = require('../models/Student');
const Employee = require('../models/Employee');
const Document = require('../models/Document');
const Course = require('../models/Course');

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalEmployees,
      pendingRegistrations,
      pendingDocuments,
      verifiedDocuments,
      totalUsers
    ] = await Promise.all([
      User.countDocuments({ role: 'STUDENT' }),
      User.countDocuments({ role: 'EMPLOYEE' }),
      User.countDocuments({ accountStatus: 'PENDING' }),
      Document.countDocuments({ verificationStatus: 'PENDING' }),
      Document.countDocuments({ verificationStatus: 'VERIFIED' }),
      User.countDocuments()
    ]);

    return res.status(200).json({
      stats: {
        totalStudents,
        totalEmployees,
        pendingRegistrations,
        pendingDocuments,
        verifiedDocuments,
        totalUsers
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Dashboard stats fetch failed.' });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ students });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Student list fetch failed.' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ employees });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Employee list fetch failed.' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 }).lean();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Users fetch failed.' });
  }
};

const getVerificationQueue = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadedAt: -1 }).lean();
    const populated = await Promise.all(
      documents.map(async (document) => {
        const user = await User.findById(document.userId).select('firstName lastName email role').lean();
        return { ...document, user };
      })
    );

    return res.status(200).json({ documents: populated });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Verification queue fetch failed.' });
  }
};

const getCourses = async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 }).lean();
  return res.status(200).json({ courses });
};

const createCourse = async (req, res) => {
  const { courseId, title, trainerId, description, duration, status } = req.body;
  if (!courseId || !title) return res.status(400).json({ message: 'Course ID and title are required.' });
  const course = await Course.create({ courseId: String(courseId).trim(), title: String(title).trim(), trainerId: trainerId || undefined, description, duration, status });
  return res.status(201).json({ course });
};

const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!course) return res.status(404).json({ message: 'Course not found.' });
  return res.status(200).json({ course });
};

const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found.' });
  return res.status(200).json({ message: 'Course deleted successfully.' });
};

const updateStudentId = async (req, res) => {
  const studentId = String(req.body.studentId || '').trim();
  if (!studentId) return res.status(400).json({ message: 'Student ID is required.' });
  const duplicate = await Student.findOne({ studentId, _id: { $ne: req.params.id } });
  if (duplicate) return res.status(409).json({ message: 'Student ID already exists.' });
  const student = await Student.findByIdAndUpdate(req.params.id, { studentId }, { new: true, runValidators: true });
  if (!student) return res.status(404).json({ message: 'Student not found.' });
  return res.status(200).json({ student });
};

const updateEmployeeId = async (req, res) => {
  const employeeId = String(req.body.employeeId || '').trim();
  if (!employeeId) return res.status(400).json({ message: 'Employee ID is required.' });
  const duplicate = await Employee.findOne({ employeeId, _id: { $ne: req.params.id } });
  if (duplicate) return res.status(409).json({ message: 'Employee ID already exists.' });
  const employee = await Employee.findByIdAndUpdate(req.params.id, { employeeId }, { new: true, runValidators: true });
  if (!employee) return res.status(404).json({ message: 'Employee not found.' });
  return res.status(200).json({ employee });
};

module.exports = {
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
};
