const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    college: { type: String },
    course: { type: String },
    semester: { type: String },
    cgpa: { type: Number },
    phone: { type: String },
    address: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
