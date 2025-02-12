require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/auth');
const tasksRoutes = require('./src/routes/tasks');

const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Middleware to only allow JSON content type for non-GET/DELETE requests
app.use((req, res, next) => {
  if (req.is('application/json') || req.method === 'GET' || req.method === 'DELETE') {
    return next();
  } else {
    return res.status(400).json({ error: 'Only JSON content type allowed.' });
  }
});

// Define routes
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
