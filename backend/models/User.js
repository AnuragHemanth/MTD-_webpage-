const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'employee', 'trainer', 'hr', 'admin'],
      required: true
    },
    accountStatus: { type: String, default: 'active' },
    emailVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
