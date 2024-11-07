import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booking.css';
import Doctor from './Doctor'; // Import the Doctor component

const Booking = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://dbms1-bd7k.onrender.com/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dbms1-bd7k.onrender.com/api/appointments', { name, date, doctor, mobile });
      setConfirmationMessage(`Booking Confirmed! Appointment ID: ${response.data._id}`);
      
      setName('');
      setMobile('');
      setDate('');
      setDoctor('');
      
      setTimeout(() => {
        setConfirmationMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error booking appointment', error);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="booking-container">
      {confirmationMessage && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}
      
      <form onSubmit={handleSubmit} className="booking-form">
        <h1>Book an Appointment</h1>
        
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Mobile Number:</label>
        <input 
          type="tel" 
          value={mobile} 
          onChange={(e) => setMobile(e.target.value)} 
          required 
          placeholder="123-456-7890"
        />
        
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        
        <label>Doctor:</label>
        <div className="doctor-selection">
          {doctors.map((doc) => (
            <Doctor key={doc._id} doctor={doc} onSelect={setDoctor} />
          ))}
        </div>
        
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default Booking;
