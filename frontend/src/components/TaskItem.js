import React, { useState } from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [editText, setEditText] = useState(task.text); // State for edited text

    const handleSave = () => {
        if (editText.trim() && editText !== task.text) {
            onEdit(task._id, editText.trim()); // Save edited task
        }
        setIsEditing(false); // Exit edit mode after saving
    };

    const handleCancel = () => {
        setIsEditing(false); // Exit edit mode without saving
        setEditText(task.text); // Reset edited text to original
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {isEditing ? (
                <div className="d-flex w-100">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)} // Update edited text state
                        className="form-control me-2"
                        placeholder="Edit task"
                    />
                    <button className="btn btn-primary me-2" onClick={handleSave}>Save</button> {/* Button to save edited task */}
                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button> {/* Button to cancel editing */}
                </div>
            ) : (
                <>
                    <span
                        className="task-item"
                        style={{ textDecoration: task.completed ? 'line-through' : 'none' }} // Strike-through for completed tasks
                    >
                        {task.text}
                    </span>
                    <div className="btn-group">
                        <button
                            className={`btn ${task.completed ? 'btn-warning' : 'btn-secondary'}`}
                            onClick={() => onToggle(task._id, !task.completed)} // Toggle task complete/incomplete
                        >
                            {task.completed ? 'Uncomplete' : 'Complete'}
                        </button>
                        <button
                            className="btn btn-info"
                            onClick={() => setIsEditing(true)} // Enter edit mode
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => onDelete(task._id)} // Delete task by ID
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TaskItem;
