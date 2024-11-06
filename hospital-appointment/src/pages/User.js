// src/pages/User.js
import React, { useState } from 'react';
import './User.css'; // Import the new CSS file

const User = () => {
  const [mobile, setMobile] = useState('');
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    console.log("Fetching appointments for mobile number:", mobile);
    try {
      const response = await fetch(`https://dbms1-bd7k.onrender.com/api/appointments/${mobile}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Appointments fetched:", data);
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="user-background">
      <div className="text-container">
        <h1>Check Booking Details</h1>
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button onClick={fetchAppointments} className="button-link">Fetch Appointments</button>
        {appointments.length > 0 && (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id}>{appointment.date} - {appointment.doctor}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default User;
