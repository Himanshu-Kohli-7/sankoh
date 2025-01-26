import React, { Suspense } from "react";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../assets/Others/sankoh_owner.JPG";
import { useState, useEffect } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const useImageLoader = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError("Error loading image");

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, error };
};

const AboutUs = () => {
  const { isLoaded } = useImageLoader(profile);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Sankoh Technical Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            Delivering Reliable Valve and Process Instrument Solutions
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10 items-start mb-8">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            transition={{ duration: 0.8 }}
            className="space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                SANKOH TECHNICAL SOLUTIONS, established in 2018, is a leading
                manufacturer of high-quality manual valves and a trusted
                supplier of manual and automated valves and process instruments.
                We specialize in providing precision-engineered products that
                meet the highest standards of reliability and performance for
                various industries.
              </p>
              <p className="text-gray-600">
                In addition to manufacturing and trading, we offer expert repair
                services for all types of valves and VFDs. Our skilled team
                ensures cost-effective maintenance solutions to minimize
                downtime and enhance operational efficiency, making us the ideal
                partner for your industrial needs.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: "10+", label: "Years Experience" },
                { number: "2000+", label: "Valves Delivered" },
                { number: "100+", label: "Industries Served" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-blue-600 text-white 
                  px-5 py-2.5 rounded-lg text-sm font-medium transition-colors 
                  duration-200 hover:bg-blue-700"
              >
                Learn More About Us
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* CEO Quote and Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            transition={{ duration: 0.8 }}
            className="relative h-full flex items-center justify-center"
          >
            {/* Decorative Background Elements */}
            <div className="absolute -top-3 -right-3 w-40 h-40 bg-blue-100 rounded-full opacity-20 z-0"></div>
            <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-blue-200 rounded-full opacity-20 z-0"></div>

            {/* Main Image Container */}
            <div className="relative w-full max-w-lg mx-auto bg-white p-4 rounded-xl shadow-2xl z-10">
              {/* Image Frame with lazy loading */}
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Suspense
                  fallback={
                    <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
                  }
                >
                  <motion.img
                    src={profile}
                    alt="Sanjay Kohli - Founder & CEO"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: isLoaded ? 1 : 0,
                      scale: isLoaded ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                </Suspense>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Quote Box */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <FaQuoteLeft className="text-blue-400 text-xl mb-2" />
                  <p className="text-sm italic mb-3 font-light leading-relaxed">
                    "Our mission is to deliver high-quality valves and
                    instruments with unmatched service and reliability, ensuring
                    our clients' success."
                  </p>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <h3 className="text-lg font-bold text-white">
                      Sanjay Kohli
                    </h3>
                    <p className="text-xs text-blue-200">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500 -translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500 translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500 -translate-x-1 translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500 translate-x-1 translate-y-1"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
