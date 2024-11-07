// DoctorCard.jsx
import React from 'react';
import './DoctorCard.css';
function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name}/>
      <h3>{doctor.name}</h3>
      <p><strong>Department:</strong> {doctor.department}</p>
      <p>{doctor.details}</p>
    </div>
  );
}

export default DoctorCard;
