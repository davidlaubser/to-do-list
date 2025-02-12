import React, { useState } from 'react';
import API from '../services/api';
import '../styles/Register.css';
import '../styles/Form.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    }); // Initialising state with empty values for form data
    const [loading, setLoading] = useState(false); // State for loading "spinner"
    const [message, setMessage] = useState(''); // State for success message
    const [error, setError] = useState(''); // State for error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update state of form data
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setError(''); // Clear previous errors

        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields.'); // Validate inputs
            return;
        }

        try {
            setLoading(true); // Display loading "spinner"
            const response = await API.post('/auth/register', formData); // API call to register user
            setMessage(response.data.message || 'Registration successful!'); // Display success message
            setFormData({ name: '', email: '', password: '' }); // Clear the form
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.'); // Display error message
        } finally {
            setLoading(false); // Hide loading "spinner"
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Create an Account</h2>
            {message && <p className="form-success">{message}</p>} {/* Display success message */}
            {error && <p className="register-error">{error}</p>} {/* Display error message */}
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange} // Update name state
                        placeholder="Enter your full name"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange} // Update email state
                        placeholder="Enter your email"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange} // Update password state
                        placeholder="Enter your password"
                        className="form-control"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'} {/* Show loading text if loading */}
                </button>
            </form>
            <p className="form-middle-text">Already have an account? Please log in below.</p>
        </div>
    );
};

export default Register;
