import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaHandshake } from "react-icons/fa";
import industrial1 from "../assets/BackgroundImages/industrial_1.jpg";
import industrial2 from "../assets/BackgroundImages/industrial_2.jpg";
import industrial3 from "../assets/BackgroundImages/industrial_3.jpg";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: { scale: 0.95 },
};

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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImages[currentImageIndex]})`,
          }}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            {/* Main Heading */}
            <motion.h1
              variants={slideUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white"
            >
              <motion.span variants={slideUp} className="block mb-2">
                Engineering Excellence
              </motion.span>
              <motion.span variants={slideUp} className="block">
                for Industrial Needs
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={slideUp}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light"
            >
              Precision and Durability for Your Industrial Systems
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeIn}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              {/* Explore Products Button */}
              <motion.div variants={buttonVariants}>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-3
                    bg-blue-600 text-white font-semibold 
                    py-4 sm:py-5 px-8 sm:px-10 
                    rounded-lg transition-all duration-300 
                    hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20
                    w-full sm:w-auto min-w-[240px] text-lg"
                >
                  <motion.span>Explore Products</motion.span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaArrowRight className="text-base" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Contact Us Button */}
              <motion.div variants={buttonVariants}>
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
                  <motion.span>Contact Us</motion.span>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaHandshake className="text-xl" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex space-x-2">
          {backgroundImages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
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
      </motion.div>
    </div>
  );
};

export default Hero;
