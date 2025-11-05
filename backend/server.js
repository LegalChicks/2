// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(cors()); 
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => res.send('LCEN API Running...'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard')); // <-- ADD THIS LINE
app.use('/api/products', require('./routes/products')); // <-- ADD THIS LINE
app.use('/api/orders', require('./routes/orders'));     // <-- ADD THIS LINE
app.use('/api/training', require('./routes/training')); // <-- ADD THIS LINE

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));