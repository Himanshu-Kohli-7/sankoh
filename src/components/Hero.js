import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHandshake } from "react-icons/fa";
import industrial1 from "../assets/BackgroundImages/industrial_1.jpg";
import industrial2 from "../assets/BackgroundImages/industrial_2.jpg";
import industrial3 from "../assets/BackgroundImages/industrial_3.jpg";
import Fade from "react-reveal/Fade";

const Hero = () => {
  const backgroundImages = [industrial3, industrial1, industrial2];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

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
            <Fade bottom>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
                <span className="block mb-2">Engineering Excellence</span>
                <span className="block"> for Industrial Needs</span>
              </h1>
            </Fade>

            {/* Subheading */}
            <Fade bottom delay={500}>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
                Precision and Durability for Your Industrial Systems
              </p>
            </Fade>

            {/* CTA Buttons */}
            <Fade bottom delay={1000}>
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Explore Products Button */}
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-3
                    bg-blue-600 text-white font-semibold 
                    py-4 sm:py-5 px-8 sm:px-10 
                    rounded-lg transition-all duration-300 
                    hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20
                    w-full sm:w-auto min-w-[240px] text-lg"
                >
                  <span>Explore Products</span>
                  <FaArrowRight
                    className="text-base transition-transform 
                      group-hover:translate-x-1"
                  />
                </Link>

                {/* Contact Us Button */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3
                    bg-white/10 backdrop-blur-sm text-white font-semibold
                    py-4 sm:py-5 px-8 sm:px-10 
                    rounded-lg transition-all duration-300 
                    hover:bg-white/20 hover:shadow-lg
                    border border-white/20
                    w-full sm:w-auto min-w-[240px] text-lg"
                >
                  <span>Contact Us</span>
                  <FaHandshake
                    className="text-xl transition-transform 
                      group-hover:scale-110"
                  />
                </Link>
              </div>
            </Fade>
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
