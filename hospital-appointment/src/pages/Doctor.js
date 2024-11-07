import React from 'react';
import './Doctor.css'; // Create a CSS file for Doctor component styles

const Doctor = ({ doctor, onSelect }) => {
  return (
    <div className="doctor-card" onClick={() => onSelect(doctor.name)}>
      <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p>Specialization: {doctor.specialization}</p>
      </div>
    </div>
  );
};

export default Doctor; 