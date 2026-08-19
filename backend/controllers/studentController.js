const Student = require('../models/Student');
const User = require('../models/User');
const Document = require('../models/Document');
const { calculateStudentCompletion } = require('../utils/profileCompletion');
const { createSequentialId } = require('../utils/generateProfileId');

const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id }).lean();

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found.' });
    }

    // Calculate and attach profile completion percentage
    const resume = await Document.exists({ userId: req.user.id, documentType: 'RESUME' });
    const completion = calculateStudentCompletion(student, Boolean(resume));
    const studentWithCompletion = { ...student, profileCompletion: completion };

    return res.status(200).json({ student: studentWithCompletion });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Student profile fetch failed.' });
  }
};

const upsertStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'STUDENT') {
      return res.status(403).json({ message: 'Only student accounts can update this profile.' });
    }

    const payload = {
      ...req.body,
      userId: req.user.id,
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      studentId: req.body.studentId || await createSequentialId(Student, 'studentId', 'MIDSTD')
    };

    const student = await Student.findOneAndUpdate(
      { userId: req.user.id },
      { $set: payload },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Calculate and attach profile completion percentage
    const resume = await Document.exists({ userId: req.user.id, documentType: 'RESUME' });
    const completion = calculateStudentCompletion(student, Boolean(resume));
    const studentWithCompletion = { ...student.toObject ? student.toObject() : student, profileCompletion: completion };

    return res.status(200).json({ student: studentWithCompletion });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Student profile update failed.' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    return res.status(200).json({ student });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Student fetch failed.' });
  }
};

const listStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json({ students });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Student list fetch failed.' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    return res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Student delete failed.' });
  }
};

module.exports = {
  getStudentProfile,
  upsertStudentProfile,
  getStudentById,
  listStudents,
  deleteStudent
};
