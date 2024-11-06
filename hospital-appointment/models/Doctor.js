// models/Doctor.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false, // Optional
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
