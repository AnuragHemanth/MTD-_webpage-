const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    personalEmail: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, trim: true },
    maritalStatus: { type: String, trim: true },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    spouseName: { type: String, trim: true },
    emergencyContactName: { type: String, trim: true },
    emergencyContactNumber: { type: String, trim: true },
    emergencyContactRelation: { type: String, trim: true },
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
    department: { type: String, trim: true },
    designation: { type: String, trim: true },
    joiningDate: { type: Date },
    employmentType: { type: String, trim: true },
    reportingManager: { type: String, trim: true },
    workLocation: { type: String, trim: true },
    previousExperience: { type: Number, default: 0 },
    skills: [{ type: String, trim: true }],
    profileCompletion: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
