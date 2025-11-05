// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // Link to the user who made the order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // An array of the products in the order
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
      name: String,
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: Number, // Price at the time of order
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // e.g., Pending, Confirmed, Shipped
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('order', OrderSchema);