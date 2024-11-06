// src/pages/User.js
import React, { useState } from 'react';

const User = () => {
  const [mobile, setMobile] = useState('');
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${mobile}`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div>
      <h1>Check Booking Details</h1>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={fetchAppointments}>Fetch Appointments</button>
      {appointments.length > 0 && (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>{appointment.date} - {appointment.doctor}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
