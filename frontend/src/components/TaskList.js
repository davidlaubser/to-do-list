import React, { useEffect, useState } from 'react';
import API from '../services/api';
import TaskItem from './TaskItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Styles.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // State for tasks
    const [text, setText] = useState(''); // State for new task text

    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks'); // Fetch tasks from API
            setTasks(data); // Update tasks state
        } catch (error) {
            alert('Failed to fetch tasks.'); // Display error message if fetch fails
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!text.trim()) return; // Prevent empty tasks from being added

        try {
            const { data } = await API.post('/tasks', { text: text.trim() }); // Add new task
            setTasks([...tasks, data]); // Update tasks state with new task
            setText(''); // Clear input field
        } catch (err) {
            alert('Failed to add task.'); // Display error message if add fails
        }
    };

    const updateTask = async (id, updatedText) => {
        try {
            const { data } = await API.put(`/tasks/${id}`, { text: updatedText }); // Update task by ID
            setTasks(tasks.map(task => (task._id === id ? data : task))); // Update tasks state with edited task
        } catch (err) {
            alert('Failed to update task.'); // Display error message if update fails
        }
    };

    const toggleTaskCompletion = async (id, completed) => {
        try {
            const { data } = await API.put(`/tasks/${id}`, { completed }); // Toggle task completion by ID
            setTasks(tasks.map(task => (task._id === id ? data : task))); // Update tasks state with toggled task
        } catch (err) {
            alert('Failed to update task completion.'); // Display error message if toggle fails
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`); // Delete task by ID
            setTasks(tasks.filter(task => task._id !== id)); // Update tasks state by filtering out deleted task
        } catch (err) {
            alert('Failed to delete task.'); // Display error message if delete fails
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks when component mounts
    }, []);

    return (
        <div className="card shadow-sm">
            <h2 className="card-header bg-primary text-white text-center">Your Tasks</h2> {/* Card header */}
            <div className="card-body">
                <form onSubmit={addTask} className="input-group mb-3">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)} // Update new task text state
                        placeholder="New task (max 140 chars)"
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-success">Add</button> {/* Add button */}
                </form>
                <ul className="list-group">
                    {tasks.map(task => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onEdit={updateTask}
                            onDelete={deleteTask}
                            onToggle={toggleTaskCompletion}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;
