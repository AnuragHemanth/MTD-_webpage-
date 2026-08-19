const bcrypt = require('bcryptjs');
const User = require('../models/User');
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

    if (!['STUDENT', 'EMPLOYEE', 'TRAINER', 'HR', 'ADMIN'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'Invalid role selected.' });
    }

    const existingUser = await User.findOne({ email: String(email).trim().toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const finalStatus = normalizeStatus(accountStatus || 'ACTIVE');

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
  }
};

module.exports = authController;
