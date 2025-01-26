import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaIndustry,
  FaTools,
  FaHandshake,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import mission from "../assets/Others/mission.jpg";
import vision from "../assets/Others/vision.jpg";
import industry from "../assets/BackgroundImages/industrial_1.jpg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const NumberCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.min(Math.floor(target * progress), target));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <>{count}+</>;
};

const AboutUsPage = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="bg-white">
      {/* Hero Section with About Us heading */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={industry}
          alt="Our Company"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-300">
              Delivering Reliable Valve and Process Instrument Solutions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Centered Description Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              {[
                "Welcome to SANKOH TECHNICAL SOLUTIONS, established in 2018, is a leading manufacturer of high-quality manual valves and a trusted supplier of manual and automated valves and process instruments. We specialize in providing precision-engineered products that meet the highest standards of reliability and performance for various industries.",
                "In addition to manufacturing and trading, we offer expert repair services for all types of valves and VFDs. Our skilled team ensures cost-effective maintenance solutions to minimize downtime and enhance operational efficiency, making us the ideal partner for your industrial needs.",
                "What sets us apart is our personalized approach to service. We believe in building lasting relationships with our clients through honest advice, quality products, and reliable support. Whether you need help selecting the right valve for your application, technical guidance, or after-sales support, our team is always ready to assist with prompt and professional service.",
                "At Sankoh Technical Solutions, we understand that reliable valve solutions are crucial for the smooth operation of your facilities. That's why we maintain high standards in product quality, technical expertise, and customer service. Our commitment to excellence has helped us build a strong reputation and a growing base of satisfied clients across various industries.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="font-bold"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Numbers Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-4 gap-12"
            >
              {[
                { number: 10, label: "Years Experience" },
                { number: 2000, label: "Valves Delivered" },
                { number: 100, label: "Industries Served" },
                { number: 200, label: "Satisfied Clients" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-3">
                    <NumberCounter target={stat.number} />
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Mission Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <img
                  src={mission}
                  alt="Our Mission"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Our Mission
                  </h3>
                  <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  To deliver exceptional valve solutions that exceed industry
                  standards and customer expectations. We strive to be the most
                  trusted partner in industrial solutions through:
                </p>
                <ul className="space-y-3">
                  {[
                    "Providing high-quality product offerings",
                    "Ensuring excellent technical support",
                    "Long-term client relationships built on trust and integrity",
                    "Delivering innovative industrial solutions",
                  ].map((point, index) => (
                    <motion.li
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <FaCheck className="text-blue-600 flex-shrink-0" />
                      <span className="text-gray-600">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Vision Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <img
                  src={vision}
                  alt="Our Vision"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Our Vision
                  </h3>
                  <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  To be India's leading provider of industrial valve solutions,
                  recognized for our:
                </p>
                <ul className="space-y-3">
                  {[
                    "Technical excellence and innovation",
                    "Customer-centric approach",
                    "Professional expertise",
                    "Commitment to quality",
                  ].map((point, index) => (
                    <motion.li
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <FaIndustry className="text-blue-600 flex-shrink-0" />
                      <span className="text-gray-600">{point}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-gray-600 mt-4"
                >
                  We aspire to set new industry benchmarks and contribute to our
                  clients' success by providing reliable, innovative, and
                  efficient valve solutions.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Are you ready to enhance your operations with reliable valve
              solutions? Our team is here to assist you with expert advice,
              quality products, and responsive support.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <FaPhone className="text-blue-600" />
                <span className="text-gray-600">+91 9888491527</span>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <FaEnvelope className="text-blue-600" />
                <span className="text-gray-600">sankoh.techsol@gmail.com</span>
              </motion.div>
            </div>
            <motion.button
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg 
                hover:bg-blue-700 transition-colors duration-300 
                font-semibold inline-flex items-center gap-2"
            >
              Contact Us
              <FaHandshake className="text-xl" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
