// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // This is the member price 
    required: true,
  },
  unit: {
    type: String, // e.g., "per chick", "per 50kg bag"
    required: true,
  },
  category: {
    type: String, // e.g., "Chicks", "Feeds", "Vitamins"
    required: true,
  },
  imageUrl: {
    type: String, // Optional image
    default: 'https://via.placeholder.com/300x200.png?text=LCEN+Product',
  },
});

module.exports = mongoose.model('product', ProductSchema);