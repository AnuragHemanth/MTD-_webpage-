const User = require('../models/User');
const Student = require('../models/Student');
const Employee = require('../models/Employee');
const Document = require('../models/Document');

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

module.exports = {
  getDashboardStats,
  getStudents,
  getEmployees,
  getUsers,
  getVerificationQueue
};
