const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    // Add more fields as needed
  });
  const Patient = mongoose.model('Patient', patientSchema);
  module.exports = Patient