import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Styles.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // Check if user is logged in
  const [userEmail, setUserEmail] = useState(''); // State for user email

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setLoggedIn(false); // Update login state
    setUserEmail(''); // Clear user email
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (token) {
      const decoded = jwtDecode(token); // Decode token to get user email
      setUserEmail(decoded.email); // Set user email
    }
  }, [loggedIn]); // Update effect when login state changes

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {!loggedIn ? (
            <>
              <Register /> {/* Register component */}
              <Login onLogin={() => setLoggedIn(true)} /> {/* Login component */}
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">
                  Signed in as: <span className="user-email">{userEmail}</span> {/* Display user email */}
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout {/* Logout button */}
                </button>
              </div>
              <TaskList /> {/* TaskList component */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
