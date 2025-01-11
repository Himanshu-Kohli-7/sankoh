import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHandshake } from "react-icons/fa";

const Hero = () => {
  const backgroundImages = [
    "/images/industrial1.png",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
    "/images/industrial1.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000
            ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image})`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
              <span className="block mb-2">Engineering Excellence</span>
              <span className="block"> for Industrial Needs</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              Precision and Durability for Your Industrial Systems
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Explore Products Button */}
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 
      bg-blue-600 text-white font-medium 
      py-3 sm:py-4 px-6 sm:px-8 
      rounded-lg transition-all duration-300 
      hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20
      w-full sm:w-auto min-w-[200px]"
              >
                <span>Explore Our Products</span>
                <FaArrowRight
                  className="text-sm transition-transform group-hover:translate 
      group-hover:translate-x-1"
                />
              </Link>

              {/* Contact Us Button */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 
      bg-blue-600 text-white font-medium 
      py-3 sm:py-4 px-6 sm:px-8 
      rounded-lg transition-all duration-300 
      hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20
      w-full sm:w-auto min-w-[200px]"
              >
                <span>Contact Us</span>
                <FaHandshake
                  className="text-xl transition-transform 
      group-hover:scale-110"
                />
              </Link>
            </div>

            {/* Stats */}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 
                ${
                  index === currentImageIndex
                    ? "w-8 bg-blue-500"
                    : "w-2 bg-white/50 hover:bg-blue-400/50"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
