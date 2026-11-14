import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTools,
  FaIndustry,
  FaHandshake,
  FaChartLine,
  FaExchangeAlt,
} from "react-icons/fa";
import industrial from "../assets/BackgroundImages/industrial_1.jpg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const services = [
  {
    id: 1,
    icon: FaIndustry,
    title: "Manual Valve Manufacturing",
    description:
      "Expertly crafted manual valves, tailored to meet the rigorous demands of various industrial applications. Our valves are engineered with precision and built to last, ensuring reliability and performance in every use.",
    features: [
      "Custom Design",
      "High Performance",
      "Quality Control",
      "Precision Engineering",
    ],
  },
  {
    id: 2,
    icon: FaExchangeAlt,
    title: "Valve Trading Solutions",
    description:
      "Comprehensive trading solutions offering a wide range of manual and automated valves from reputable manufacturers. We provide high-quality products that meet your industrial needs, backed by our technical support.",
    features: [
      "Wide Selection",
      "Competitive Pricing",
      "Trusted Brands",
      "Technical Support",
    ],
  },
  {
    id: 3,
    icon: FaTools,
    title: "Valve and VFD Repair Services",
    description:
      "Professional repair and maintenance services for all types of valves and Variable Frequency Drives (VFDs). Our expert team is available 24/7 to ensure minimal downtime and optimal performance.",
    features: [
      "24/7 Support",
      "Expert Team",
      "Quick Response",
      "All Valve Types Repair",
    ],
  },
  {
    id: 4,
    icon: FaChartLine,
    title: "Process Intrunments & Automation",
    description:
      "Specialized consultation services to enhance industrial process efficiency, reduce costs, and improve overall productivity. Our experts analyze data and provide tailored solutions to meet your specific requirements.",
    features: [
      "Data Analysis",
      "Efficiency Improvement",
      "Cost Reduction",
      "Tailored Solutions",
    ],
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={industrial}
          alt="Our Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/80"></div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-300">
              Comprehensive range of services to meet your industrial needs
            </p>
          </div>
        </motion.div>
      </div>

      {/* Services Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="py-12"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl 
                        transition-all duration-300 border border-gray-100 
                        hover:border-blue-100 p-8 relative overflow-hidden"
              >
                {/* Service Header */}
                <div className="flex items-start gap-6 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-br from-blue-600 to-blue-500 
                            p-4 rounded-xl shadow-lg"
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 pl-20">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-0 right-0 w-32 h-32 
                          bg-blue-50 rounded-full -mr-16 -mt-16"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute bottom-0 left-0 w-32 h-32 
                          bg-blue-50 rounded-full -ml-16 -mb-16"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Need Customized Solutions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to assist you with tailored solutions
            that meet your specific requirements.
          </p>
          <motion.button
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
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
