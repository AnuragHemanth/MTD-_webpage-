const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Document = require('../models/Document');
const generateToken = require('../utils/generateToken');

const normalizeRole = (role = '') => String(role).trim().toUpperCase();
const normalizeStatus = (status = 'PENDING') => String(status).trim().toUpperCase();

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isValidPassword = await bcrypt.compare(String(password), user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (user.accountStatus !== 'ACTIVE') {
      return res.status(403).json({ message: `Account status is ${user.accountStatus}.` });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus
    });

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        emailVerified: user.emailVerified
      }
    });
  },

  register: async (req, res) => {
    const { firstName, lastName, email, password, role, accountStatus } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: 'First name, last name, email, password, and role are required.' });
    }

    const normalizedRole = normalizeRole(role);

    if (!['STUDENT', 'EMPLOYEE'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'Only student and employee self-registration is allowed.' });
    }

    if (normalizedRole === 'STUDENT' && !req.file) {
      return res.status(400).json({ message: 'Resume is required for student registration.' });
    }

    const existingUser = await User.findOne({ email: String(email).trim().toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const finalStatus = 'ACTIVE';

    const user = await User.create({
      userId: `${normalizedRole}-${Date.now()}`,
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim().toLowerCase(),
      passwordHash,
      role: normalizedRole,
      accountStatus: finalStatus,
      emailVerified: false
    });

    if (normalizedRole === 'STUDENT') {
      await Document.create({
        documentId: `DOC-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId: user._id,
        documentType: 'RESUME',
        fileName: req.file.originalname,
        storedFileName: req.file.filename,
        fileUrl: `/api/documents/file/${req.file.filename}`,
        verificationStatus: 'PENDING',
        uploadedAt: new Date()
      });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      accountStatus: user.accountStatus
    });

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        emailVerified: user.emailVerified
      }
    });
  },

  logout: async (req, res) => {
    return res.status(200).json({ message: 'Logged out successfully.' });
  },

  getCurrentUser: async (req, res) => {
    const user = await User.findById(req.user.id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        emailVerified: user.emailVerified
      }
    });
  },

  updateCurrentUser: async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const updates = {};

    if (firstName !== undefined) updates.firstName = String(firstName).trim();
    if (lastName !== undefined) updates.lastName = String(lastName).trim();
    if (email !== undefined) updates.email = String(email).trim().toLowerCase();

    if (!updates.firstName || !updates.lastName || !updates.email) {
      return res.status(400).json({ message: 'First name, last name, and email are required.' });
    }

    const duplicate = await User.findOne({ email: updates.email, _id: { $ne: req.user.id } });
    if (duplicate) {
      return res.status(409).json({ message: 'This email is already registered.' });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ user });
  }
};

module.exports = authController;
