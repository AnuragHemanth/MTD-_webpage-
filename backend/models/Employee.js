const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    department: { type: String },
    designation: { type: String },
    dateOfJoining: { type: Date },
    phone: { type: String },
    address: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
