const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Unique email address
    password: { type: String, required: true } // User password
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
