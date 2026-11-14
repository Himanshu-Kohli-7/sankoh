import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import vardhaman from "../assets/Clients/vardhaman.svg";
import wipro from "../assets/Clients/wipro.svg";
import birla from "../assets/Clients/birla.webp";
import fdc from "../assets/Clients/fdc.svg";
import godrej from "../assets/Clients/godrej.jpg";
import hul from "../assets/Clients/hul.webp";
import indSwift from "../assets/Clients/ind-swift.png";
import pnbChemical from "../assets/Clients/pnb-chemicals.jpg";
import scl from "../assets/Clients/scl.png";
import vvf from "../assets/Clients/vvf.webp";
import wrigley from "../assets/Clients/Wrigley.png";
import mondelez from "../assets/Clients/Mondelez.png";
import nahar from "../assets/Clients/Nahar.jpeg";
import ruchira from "../assets/Clients/Ruchira.jpg";

const clients = [
  { id: 1, name: "Vardhaman", logo: vardhaman },
  { id: 2, name: "Wipro", logo: wipro },
  { id: 3, name: "Birla", logo: birla },
  { id: 4, name: "FDC", logo: fdc },
  { id: 5, name: "Godrej", logo: godrej },
  { id: 6, name: "Ind-Swift", logo: indSwift },
  { id: 7, name: "SCL", logo: scl },
  { id: 8, name: "VVF", logo: vvf },
  { id: 9, name: "PNB Chemical", logo: pnbChemical },
  { id: 10, name: "HUL", logo: hul },
  { id: 11, name: "Wrigley", logo: wrigley },
  { id: 12, name: "Mondelez", logo: mondelez },
  { id: 13, name: "Nahar", logo: nahar },
  { id: 14, name: "Ruchira", logo: ruchira },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Clients = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative py-20 bg-gradient-to-b from-gray-100 to-gray-50"
    >
      {/* Subtle Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our Trusted Partners
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 text-lg">
            Collaborating with industry leaders to deliver excellence
          </motion.p>
        </motion.div>

        {/* Clients Slider */}
        <motion.div variants={staggerContainer} className="relative">
          <Slider {...settings}>
            {clients.map((client) => (
              <motion.div
                key={client.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="h-28 flex items-center justify-center bg-white 
                  rounded-lg p-6 border border-gray-200
                  hover:border-blue-500/30 transition-all duration-300 
                  shadow-sm group relative overflow-hidden mx-2"
                >
                  {/* Hover Effect Background */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-gray-50/0 
                    via-gray-50/50 to-gray-50/0 transition-opacity duration-500"
                  />

                  {/* Client Logo */}
                  <motion.img
                    src={client.logo}
                    alt={client.name}
                    initial={{ opacity: 0.6 }}
                    whileHover={{
                      opacity: 1,
                      scale: 1.1,
                      transition: { duration: 0.3 },
                    }}
                    className="max-h-14 w-auto relative z-10 object-contain"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/150x80?text=${client.name}`;
                    }}
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 transition-opacity duration-700"
                  >
                    <motion.div
                      animate={{
                        x: ["100%", "-100%"],
                        transition: {
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "linear",
                        },
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent 
                      via-blue-50/30 to-transparent"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Clients;
