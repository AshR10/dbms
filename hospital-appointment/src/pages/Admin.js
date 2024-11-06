import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Import CSS styles

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [image, setImage] = useState(null);

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
      fetchDoctors();
    }
  }, [accessGranted]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://dbms1-bd7k.onrender.com/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://dbms1-bd7k.onrender.com/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`https://dbms1-bd7k.onrender.com/api/appointments/${id}`);
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const deleteAllAppointments = async () => {
    try {
      await axios.delete('https://dbms1-bd7k.onrender.com/api/appointments');
      setAppointments([]);
    } catch (error) {
      console.error('Error deleting all appointments:', error);
    }
  };

  const addDoctor = async () => {
    const formData = new FormData();
    formData.append('name', doctorName);
    formData.append('specialization', specialization);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://dbms1-bd7k.onrender.com/api/doctors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDoctors([...doctors, response.data]);
      setDoctorName('');
      setSpecialization('');
      setImage(null);
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`https://dbms1-bd7k.onrender.com/api/doctors/${id}`);
      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
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
          <p>Manage appointments and doctors here.</p>
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

          <h2>Manage Doctors</h2>
          <div>
            <input
              type="text"
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              style={{ padding: '10px', margin: '10px 0', width: '45%' }}
            />
                       <input
              type="text"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              style={{ padding: '10px', margin: '10px 0', width: '45%' }}
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ padding: '10px', margin: '10px 0', width: '45%' }}
            />
            <button onClick={addDoctor} className="button-link">Add Doctor</button>
          </div>

          <div>
            <h3>Doctor List</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length > 0 ? (
                  doctors.map(doctor => (
                    <tr key={doctor._id}>
                      <td>{doctor.name}</td>
                      <td>{doctor.specialization}</td>
                      <td>
                        <button onClick={() => deleteDoctor(doctor._id)} className="button-link">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No doctors found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
