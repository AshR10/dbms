import React from 'react';
import './Doctor.css'; // Ensure this CSS file exists and is correctly linked

const Doctor = ({ doctor, onSelect, isSelected }) => {
  return (
    <div 
      className={`doctor-card ${isSelected ? 'selected' : ''}`} 
      onClick={() => onSelect(doctor.name)}
    >
      <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p>Specialization: {doctor.specialization}</p>
      </div>
    </div>
  );
};

export default Doctor; 