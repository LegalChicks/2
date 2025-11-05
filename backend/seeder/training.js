// seeder/training.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Training = require('../models/Training');
const connectDB = require('../config/db');

dotenv.config({ path: '../.env' }); // Point to main .env

// Based on prompt 
const courses = [
  {
    title: 'New Member Orientation',
    description:
      'The essential starting point. Learn the LCEN model, cooperative values, and basic farm setup.',
    category: 'Starter',
    format: '3-hour Workshop (Required)',
    isFree: true,
  },
  {
    title: 'Advanced Farm Scaling',
    description:
      'Learn to manage a larger flock, optimize feed-to-egg ratios, and plan for expansion.',
    category: 'Advanced',
    format: 'Online Course',
    isFree: false,
  },
  {
    title: 'Poultry Food Safety',
    description:
      'Proper egg handling, washing, grading, and storage to meet "Legal Chicks Certified" standards.',
    category: 'Safety',
    format: '2-hour Workshop',
    isFree: false,
  },
  {
    title: 'Agri-Business Planning',
    description:
      'Manage your finances, track profits, and learn to grow your farm as a sustainable business.',
    category: 'Business',
    format: 'Online Course',
    isFree: false,
  },
  {
    title: 'TESDA NC II Path',
    description:
      'Official certification path for Poultry Production NC II. This course covers all required modules.',
    category: 'Advanced',
    format: 'Full Program (In-person + Online)',
    isFree: false,
  },
];

const importData = async () => {
  await connectDB();
  try {
    // Clear existing courses
    await Training.deleteMany();
    // Insert new courses
    await Training.insertMany(courses);

    console.log('Training Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

// To run this, type `node seeder/training.js` in your backend terminal
importData();