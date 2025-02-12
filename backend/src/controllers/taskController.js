const Task = require('../models/Task');

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId }).select('_id text completed');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new task for the authenticated user
exports.createTask = async (req, res) => {
    try {
        const { text } = req.body;
        const task = await Task.create({ userId: req.user.userId, text });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing task for the authenticated user
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { text, completed },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an existing task for the authenticated user
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
