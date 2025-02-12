const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userValidation = require('../middleware/userValidation');
const taskValidation = require('../middleware/taskValidation');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// Apply the authMiddleware and userValidation middleware to all routes
router.use(authMiddleware, userValidation);

// Define routes for tasks CRUD operations
router.get('/', getTasks);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
