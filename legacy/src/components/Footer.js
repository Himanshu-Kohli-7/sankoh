import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
  FaWhatsapp,
} from "react-icons/fa";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const Footer = () => {
  // Company's exact coordinates
  const coordinates = {
    lat: 30.584349,
    lng: 76.890364,
    address:
      "69, Ground floor, Hansa Industrial Park, Barwala Road, Derabassi, Distt. SAS Nagar (PB)-140507",
  };

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDM1JzAzLjUiTiA3NsKwNTMnMjQuNyJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin&zoom=15`;

  const handleGetDirections = (e) => {
    e.preventDefault();
    const location = `${coordinates.lat},${coordinates.lng}`;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${location}`,
      "_blank"
    );
  };

  const handleViewMap = () => {
    const location = `${coordinates.lat},${coordinates.lng}`;
    window.open(`https://www.google.com/maps?q=${location}`, "_blank");
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Map Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative h-[400px] overflow-hidden group"
      >
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 cursor-pointer"
          title="Sankoh Technical Solutions Location"
          onClick={handleViewMap}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900" />

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewMap}
          className="absolute top-4 right-4 bg-white/95 text-gray-900 px-4 py-2.5 
            rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 
            opacity-0 group-hover:opacity-100 hover:bg-white"
        >
          <FaMapMarkerAlt className="text-blue-600" />
          <span className="font-medium">View Map</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetDirections}
          className="absolute bottom-8 right-8 bg-blue-600 text-white px-6 py-3.5 
            rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 
            flex items-center gap-3 hover:shadow-blue-500/20 hover:shadow-xl 
            cursor-pointer z-10"
        >
          <FaMapMarkerAlt className="text-lg" />
          <span className="font-medium">Get Directions</span>
        </motion.button>
      </motion.div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        {/* Company Info & Quick Links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 py-20 border-b border-gray-800/50"
        >
          {/* Company Info */}
          <motion.div
            variants={fadeInUp}
            className="sm:col-span-2 lg:col-span-2 space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-white mb-3">
                Sankoh Technical Solutions
              </h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 leading-relaxed text-[15px]"
            >
              Established in 2018, Sankoh Technical Solutions specializes in
              manufacturing high-quality manual valves, supplying automated
              valves and process instruments, and providing expert repair
              services for all types of valves and VFDs.
            </motion.p>

            {/* Social Links */}
            <motion.div variants={staggerContainer} className="flex gap-4 pt-2">
              {[
                {
                  icon: FaLinkedin,
                  link: "https://www.linkedin.com/in/sankoh-technical-solutions-46b499346/",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: FaWhatsapp,
                  link: "https://wa.me/919888491527",
                  color: "hover:bg-green-600",
                },
                {
                  icon: FaFacebook,
                  link: "https://www.facebook.com/profile.php?id=61572282953214",
                  color: "hover:bg-blue-700",
                },
                {
                  icon: FaInstagram,
                  link: "https://www.instagram.com/sankoh.techsol/",
                  color: "hover:bg-pink-600",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg transition-all duration-300 
                bg-gray-800/80 ${social.color} hover:text-white
                shadow-lg hover:shadow-xl`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4
              className="text-lg font-semibold text-white relative pb-4
            after:content-[''] after:absolute after:bottom-0 after:left-0 
            after:w-12 after:h-0.5 after:bg-blue-600"
            >
              Quick Links
            </h4>
            <motion.ul variants={staggerContainer} className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Products", path: "/products" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <motion.li key={link.name} variants={fadeInUp}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 
                    flex items-center gap-2 group"
                  >
                    <FaChevronRight
                      className="text-xs text-blue-500 transition-transform 
                    duration-300 group-hover:translate-x-1"
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Product Categories */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4
              className="text-lg font-semibold text-white relative pb-4
            after:content-[''] after:absolute after:bottom-0 after:left-0 
            after:w-12 after:h-0.5 after:bg-blue-600"
            >
              Product Categories
            </h4>
            <motion.ul variants={staggerContainer} className="space-y-3">
              {[
                {
                  name: "Manual Valves",
                  path: "/products?category=manual-valves",
                },
                {
                  name: "Automated Valves",
                  path: "/products?category=automated-valves",
                },
                {
                  name: "Process Instruments",
                  path: "/products?category=process-instruments",
                },
              ].map((category) => (
                <motion.li key={category.name} variants={fadeInUp}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 
                    flex items-center gap-2 group"
                  >
                    <FaChevronRight
                      className="text-xs text-blue-500 transition-transform 
                    duration-300 group-hover:translate-x-1"
                    />
                    {category.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4
              className="text-lg font-semibold text-white relative pb-4
              after:content-[''] after:absolute after:bottom-0 after:left-0 
              after:w-12 after:h-0.5 after:bg-blue-600"
            >
              Contact Info
            </h4>
            <motion.ul variants={staggerContainer} className="space-y-4">
              <motion.li variants={fadeInUp}>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handleGetDirections}
                  className="flex items-start gap-3 text-gray-400 hover:text-white 
                    transition-colors duration-300 group text-left"
                >
                  <FaMapMarkerAlt className="mt-1 text-blue-500 group-hover:text-blue-400 flex-shrink-0 text-base" />
                  <span className="text-sm">
                    69, Ground floor, Hansa Industrial Park,
                    <br />
                    Barwala Road, Derabassi,
                    <br />
                    Punjab - 140507
                  </span>
                </motion.button>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="tel:+919888491527"
                  className="flex items-center gap-3 text-gray-400 hover:text-white 
                    transition-colors duration-300 group"
                >
                  <FaPhoneAlt className="text-blue-500 group-hover:text-blue-400 text-base flex-shrink-0" />
                  <span className="text-sm">+91 9888491527</span>
                </motion.a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="mailto:sankoh.techsol@gmail.com"
                  className="flex items-center gap-4 text-gray-400 hover:text-white 
                    transition-colors duration-300 group"
                >
                  <FaEnvelope className="text-blue-500 group-hover:text-blue-400 text-base flex-shrink-0" />
                  <span className="text-sm">sankoh.techsol@gmail.com</span>
                </motion.a>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Business Hours */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4
              className="text-lg font-semibold text-white relative pb-3
              after:content-[''] after:absolute after:bottom-0 after:left-0 
              after:w-12 after:h-0.5 after:bg-blue-600"
            >
              Business Hours
            </h4>
            <motion.ul variants={fadeInUp} className="space-y-3">
              <motion.li
                whileHover={{ x: 5 }}
                className="text-gray-400 pb-2 border-b border-gray-800/30"
              >
                <span className="flex items-center space-x-4">
                  <span>Mon - Sat:</span>
                  <span className="ml-1">9AM - 6PM</span>
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Copyright Section with Designer Credit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-8 border-t border-gray-800/50 mt-8"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <motion.p variants={fadeInUp} className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Sankoh Technical Solutions.
                All rights reserved.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-2"
              >
                <p className="text-gray-500 text-sm">
                  Designed by{" "}
                  <motion.a
                    whileHover={{ color: "#60A5FA" }}
                    href="https://www.linkedin.com/in/himanshu-kohli-a4626221b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 transition-colors duration-300"
                  >
                    Himanshu Kohli
                  </motion.a>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
