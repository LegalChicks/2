// routes/dashboard.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Our JWT middleware
const User = require('../models/User');

// @route   GET api/dashboard
// @desc    Get current user's dashboard data
// @access  Private (requires token)
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id is set by the auth middleware
    // We find the user but exclude the password from the response
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Send back all user data (which now includes farm stats)
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;