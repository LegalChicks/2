// seeder/products.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config({ path: '../.env' }); // Point to main .env

// Products based on your business plan [cite: 130, 422]
const products = [
  {
    name: 'RIR Day-Old Chicks',
    description:
      'Pure Rhode Island Red (RIR) chicks, vaccinated and ready for brooding. Guaranteed LCEN genetics.',
    price: 35, // Example price
    unit: 'per chick',
    category: 'Chicks',
  },
  {
    name: 'Australorp Day-Old Chicks',
    description:
      'Pure Black Australorp chicks, vaccinated and ready for brooding. High-quality LCEN genetics.',
    price: 40,
    unit: 'per chick',
    category: 'Chicks',
  },
  {
    name: 'LCEN Layer Pellets',
    description:
      'Proprietary feed blend for optimal egg production. Member-exclusive price.',
    price: 1500,
    unit: 'per 50kg bag',
    category: 'Feeds',
  },
  {
    name: 'LCEN Starter Crumble',
    description: 'High-protein starter feed for chicks (Week 1-4).',
    price: 1800,
    unit: 'per 50kg bag',
    category: 'Feeds',
  },
  {
    name: 'Poultry Vitamins',
    description: 'Water-soluble vitamin supplement for flock health.',
    price: 250,
    unit: 'per 100g pack',
    category: 'Vitamins',
  },
  {
    name: 'LCEN Egg Cartons',
    description: 'Co-branded packaging materials for collective marketing.',
    price: 100,
    unit: 'per 20-pack',
    category: 'Packaging',
  },
];

const importData = async () => {
  await connectDB();
  try {
    // Clear existing products
    await Product.deleteMany();
    // Insert new products
    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

// To run this, type `node seeder/products.js` in your backend terminal
importData();