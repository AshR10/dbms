import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Import CSS styles

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [appointments, setAppointments] = useState([]); // State to store fetched appointments

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setAccessGranted(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    if (accessGranted) {
      fetchAppointments();
    }
  }, [accessGranted]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://dbms1-bd7k.onrender.com/api/appointments');
      console.log('Fetched appointments:', response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`https://dbms1-bd7k.onrender.com/api/appointments/${id}`);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const deleteAllAppointments = async () => {
    try {
      await axios.delete('https://dbms1-bd7k.onrender.com/api/appointments'); // Delete from database
      setAppointments([]); // Clear appointments from state
    } catch (error) {
      console.error('Error deleting all appointments:', error);
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
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
          />
          <button onClick={handleLogin} className="button-link">Login</button>
        </div>
      ) : (
        <div className="text-container">
          <h1>Admin Dashboard</h1>
          <p>Manage appointments here.</p>
          <button onClick={deleteAllAppointments} className="button-link">Delete All Appointments</button>
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.name}</td>
                    <td>{appointment.mobile}</td>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.doctor}</td>
                    <td>
                      <button onClick={() => deleteAppointment(appointment._id)} className="button-link">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
