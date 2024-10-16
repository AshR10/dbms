// src/components/Slideshow.js
import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // Keep your styles

const images = [
  { id: 1, src: require('../assets/pn1.jpg'), alt: 'Image 1' },
  { id: 2, src: require('../assets/pn2.jpg'), alt: 'Image 2' },
  { id: 3, src: require('../assets/pn3.jpg'), alt: 'Image 3' },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // State for slide direction

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('next'); // Set the direction for the next slide
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Change to next image
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Optional: Add a function to manually navigate slides if needed
  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className={`slideshow-image ${index === currentIndex ? 'next' : index === (currentIndex - 1 + images.length) % images.length ? 'prev' : 'next-active'}`} // Apply classes based on index
        />
      ))}
      <button className="slide__arrow slide__arrow_left" onClick={handlePrev}>
        {"<"}
      </button>
      <button className="slide__arrow slide__arrow_right" onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
};

export default Slideshow;
