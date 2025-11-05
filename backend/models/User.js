// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  farmAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // --- NEW FIELDS FOR DASHBOARD  ---
  flockSize: {
    type: Number,
    default: 0,
  },
  eggCount: {
    type: Number,
    default: 0,
  },
  projectedEarnings: {
    type: Number,
    default: 0,
  },
  feedUsage: {
    type: Number, // Stored in kgs
    default: 0,
  },
  // 'Your Farm Journey Status' can be a string
  farmJourneyStatus: {
    type: String,
    default: 'New Member: Awaiting Orientation',
  },
});

module.exports = mongoose.model('user', UserSchema);