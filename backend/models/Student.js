const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    personalEmail: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    parentPhoneNumber: { type: String, trim: true },
    alternatePhoneNumber: { type: String, trim: true },
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
    collegeName: { type: String, trim: true },
    university: { type: String, trim: true },
    course: { type: String, trim: true },
    branch: { type: String, trim: true },
    currentYear: { type: String, trim: true },
    currentSemester: { type: String, trim: true },
    rollNumber: { type: String, trim: true },
    cgpa: { type: Number },
    backlogs: { type: Number, default: 0 },
    skills: [{ type: String, trim: true }],
    profileCompletion: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
