import React, { useEffect, useState } from 'react';

export default function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide + 1) % slides.length
    );
  };
  
  return (
    <div style={{
      position: 'relative',
      maxWidth: '1300px',
      margin: '0 auto',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        transition: 'transform 0.5s ease-in-out',
        transform: `translateX(-${currentSlide * 100}%)`,
        height: '400px',
      }}>
        {slides.map((slide, index) => (
          <div key={index} style={{ 
            minWidth: '100%', 
            height: '100%' 
          }}>
            <img 
              src={slide}
              alt={`Slide ${index + 1}`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          cursor: 'pointer',
        }}
      >
        &lt;
      </button>
      <button 
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          cursor: 'pointer',
        }}
      >
        &gt;
      </button>
      
      {/* Indicator dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '10px',
        width: '100%',
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              margin: '0 5px',
              backgroundColor: currentSlide === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}
