const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the email ends with @gmail.com
        if (!email.endsWith('@gmail.com')) {
            return res.status(403).json({ error: 'Email must end with @gmail.com' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        // Respond with a success message
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        // Compare provided password with the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        // Create a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);

        // Respond with the token
        res.json({ token });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};
