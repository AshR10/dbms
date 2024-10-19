// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import About from './pages/About'; // Import the About page
import './App.css'; // Make sure this is included for styles

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Buttons */}
        <nav>
          <div className="nav-buttons">
            <Link to="/" className="button-link">Home</Link>
            <Link to="/booking" className="button-link">Book Appointment</Link>
            <Link to="/admin" className="button-link">Admin</Link>
          </div>
          <Link to="/about" className="button-link">About Us</Link>

        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} /> {/* Route for About Us page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
