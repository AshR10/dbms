// src/pages/Home.js
import React from 'react';
import Slideshow from '../components/Slideshow'; // Import the Slideshow component
import './Home.css'; // Ensure your styles are here

const Home = () => {
  return (
    <div>
      <div className='text-container'>
      <h1>Welcome to the Hospital Appointment System</h1>
      <p>Book your appointment with ease.</p>
      </div>
      
      {/* Add the Slideshow component */}
      <Slideshow />
    </div>
  );
};

export default Home;
