// src/pages/Booking.js
import React, { useState } from 'react';
import axios from 'axios';
import './Booking.css'; // Ensure you import the CSS for styling

const Booking = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [mobile, setMobile] = useState(''); // New state for mobile number

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/appointments', { name, date, doctor, mobile });
      alert('Appointment booked! ID: ' + response.data._id);
    } catch (error) {
      console.error('Error booking appointment', error);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <h1>Book an Appointment</h1> {/* Moved header inside the form */}
        
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Mobile Number:</label>
        <input 
          type="tel" 
          value={mobile} 
          onChange={(e) => setMobile(e.target.value)} 
          required 
          placeholder="123-456-7890" // Optional: add placeholder for better UX
        />
        
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        
        <label>Doctor:</label>
        <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
        
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default Booking;
