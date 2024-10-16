// src/pages/Admin.js
import React, { useState } from 'react';
import './Admin.css'; // Import CSS styles

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  const handleLogin = () => {
    // Simple check for username and password
    if (username === 'admin' && password === 'password') {
      setAccessGranted(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-background">
      {!accessGranted ? (
        <div className="text-container">
          <h1>Admin Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', margin: '10px 0', width: '100%' }} // Inline styles for simplicity
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '10px 0', width: '100%' }} // Inline styles for simplicity
          />
          <button onClick={handleLogin} className="button-link">Login</button>
        </div>
      ) : (
        <div className="text-container">
          <h1>Admin Dashboard</h1>
          <p>Manage appointments here.</p>
          <div className="nav-buttons">
            <a href="/some-admin-action" className="button-link">Some Admin Action</a>
            <a href="/another-action" className="button-link">Another Action</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
