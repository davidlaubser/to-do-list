import React, { useState } from 'react';
import API from '../services/api';
import '../styles/Login.css';
import '../styles/Form.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(''); // Clear previous errors

        if (!email || !password) {
            setErrors('Please fill in all fields.'); // Validate inputs
            return;
        }

        try {
            setLoading(true); // Display loading "spinner"
            const response = await API.post('/auth/login', { email, password }); // API call
            localStorage.setItem('token', response.data.token); // Store the JWT token
            onLogin(); // Trigger login state update in App.js
        } catch (err) {
            setErrors(err.response?.data?.error || 'Login failed. Please try again.'); // Display error message
        } finally {
            setLoading(false); // Hide loading "spinner"
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Login</h2>
            {errors && <p className="form-error alert alert-danger">{errors}</p>} {/* Display errors */}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'} {/* Show loading text if loading */}
                </button>
            </form>
        </div>
    );
};

export default Login;
