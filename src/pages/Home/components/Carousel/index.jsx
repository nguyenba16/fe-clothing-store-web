import React, { useEffect, useState } from 'react'

export default function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))
  }

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  return (
    <div className="relative w-screen m-0 overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div
        className="flex h-[500px] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/50 text-white rounded-full w-[50px] h-[50px] text-2xl cursor-pointer z-10"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/50 text-white rounded-full w-[50px] h-[50px] text-2xl cursor-pointer z-10"
      >
        &gt;
      </button>

      {/* Indicator dots */}
      <div className="flex justify-center absolute bottom-5 w-full z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3.5 h-3.5 rounded-full border-none mx-1.5 cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
