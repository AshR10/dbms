// src/pages/Home.js
import React from 'react';
import Slideshow from '../components/Slideshow'; // Import the Slideshow component
import './Home.css'; // Ensure your styles are here

// Import the logo image
import logo from '../assets/logoh.png'; // Adjust the path based on your directory structure

const Home = () => {
  return (
    <div>
      {/* Add the logo in the center */}
      <img src={logo} alt="Logo" className="logo" />

      {/* Wrapper for the welcome text with a background */}
      <div className="welcome-container">
        <h1 className="welcome-text">Welcome to the Hospital Appointment System</h1>
        <p className="welcome-subtext">Book your appointment with ease.</p>
      </div>
      
      {/* Add the Slideshow component */}
      <Slideshow />
    </div>
  );
};

export default Home;
