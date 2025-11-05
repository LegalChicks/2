// models/Training.js
const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // 'Starter', 'Advanced', 'Business', 'Safety'
  category: {
    type: String,
    required: true,
  },
  // e.g., "3-hour Workshop", "Online, Self-paced"
  format: {
    type: String,
    required: true,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('training', TrainingSchema);