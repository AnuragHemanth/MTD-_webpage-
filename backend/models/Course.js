const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    duration: { type: String },
    status: { type: String, default: 'active' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
