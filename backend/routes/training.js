// routes/training.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Training = require('../models/Training');

// @route   GET api/training
// @desc    Get all training modules
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Training.find().sort({ category: 1, title: 1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;