const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    text: { type: String, required: true }, // Task description
    completed: { type: Boolean, default: false } // Task completion status
});

// Export the Task model
module.exports = mongoose.model('Task', TaskSchema);
