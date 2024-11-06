import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import About from './pages/About';
import User from './pages/User'; // Import the User page
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-buttons">
            <Link to="/" className="button-link">Home</Link>
            <Link to="/booking" className="button-link">Book Appointment</Link>
            <Link to="/admin" className="button-link">Admin</Link>
            <Link to="/user" className="button-link">User</Link> {/* Add User link */}
          </div>
          <Link to="/about" className="button-link">About Us</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} /> {/* Add User route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
