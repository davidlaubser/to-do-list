const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Define routes for user registration and login
router.post('/register', register);
router.post('/login', login);

// Export the router
module.exports = router;
