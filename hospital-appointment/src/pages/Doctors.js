// DoctorsPage.jsx
import React from 'react'; 
import DoctorCard from '../components/DoctorCard';
import './Doctors.css';
const doctors = [
  { id: 1, name: 'Dr. John Doe', department: 'Cardiology', details: 'Expert in heart diseases.',image:'./src/assets/download (1).jpg'},
  { id: 2, name: 'Dr. Jane Smith', department: 'Neurology', details: 'Specialist in neurological disorders.',image:'./src/assets/download (2).jpg'},
  // Add more doctor details here
];

function DoctorsPage() {
  return (
    <div className="doctors-page">
      <h2>Our Doctors</h2>
      <div className="doctor-cards">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default DoctorsPage;
