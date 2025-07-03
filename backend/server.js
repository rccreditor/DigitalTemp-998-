require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./passport'); // Keep if needed

// Import routes
const authRoutes = require('./routes/authRoutes');       
const userRoutes = require('./routes/userRoutes');       
const serviceRoutes = require('./routes/serviceRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Root test route
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
