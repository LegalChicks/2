// routes/orders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');

// @route   POST api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
  const { items, totalPrice } = req.body;

  // Basic validation
  if (!items || items.length === 0 || !totalPrice) {
    return res.status(400).json({ msg: 'Order is missing items or total' });
  }

  try {
    // We get req.user.id from the auth middleware
    const newOrder = new Order({
      user: req.user.id,
      items,
      totalPrice,
      status: 'Pending',
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;