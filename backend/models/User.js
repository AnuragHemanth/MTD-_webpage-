const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['STUDENT', 'EMPLOYEE', 'TRAINER', 'HR', 'ADMIN'],
      required: true
    },
    accountStatus: {
      type: String,
      enum: ['PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE'],
      default: 'PENDING'
    },
    emailVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
