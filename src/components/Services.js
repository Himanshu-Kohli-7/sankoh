import React from "react";
import {
  FaTools,
  FaIndustry,
  FaExchangeAlt,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import industrial from "../assets/BackgroundImages/industrial_1.jpg";

const services = [
  {
    id: 1,
    icon: FaIndustry,
    title: "Manual Valve Manufacturing",
    description:
      "Expertly crafted manual valves, tailored to meet the rigorous demands of various industrial applications.",
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
      "Comprehensive trading solutions offering a wide range of manual and automated valves from reputable manufacturers.",
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
      "Professional repair and maintenance services for all types of valves and Variable Frequency Drives (VFDs), ensuring minimal downtime and optimal performance.",
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
    title: "Process Optimization",
    description:
      "Specialized consultation services to enhance industrial process efficiency, reduce costs, and improve overall productivity.",
    features: [
      "Data Analysis",
      "Efficiency Improvement",
      "Cost Reduction",
      "Tailored Solutions",
    ],
  },
];

const Services = () => {
  return (
    <section className="relative py-20">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${industrial})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay - Adjusted opacity */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-white/80 via-white/75 to-white/80" />

      {/* Content */}
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <Fade bottom>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-gray-700 text-lg">
              Delivering excellence in industrial valve solutions and services
            </p>
          </div>
        </Fade>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service) => (
            <Fade bottom delay={service.id * 200} key={service.id}>
              <div
                className="group relative bg-gray-900/75 backdrop-blur-sm rounded-2xl p-8 
                  transition-all duration-300 hover:shadow-xl hover:scale-105 transform
                  border border-gray-800/50 hover:border-blue-500/30
                  before:absolute before:inset-0 before:z-0 
                  before:rounded-2xl before:transition-colors
                  before:duration-300 overflow-hidden"
              >
                {/* Icon Container */}
                <div className="relative z-10 mb-6">
                  <div
                    className="inline-block p-4 rounded-xl 
                    bg-gradient-to-br from-gray-800 to-gray-900/50
                    group-hover:from-blue-900 group-hover:to-blue-950 
                    transition-colors duration-300"
                  >
                    <service.icon
                      className="w-8 h-8 text-blue-400 
                      transition-transform duration-300 
                      group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className="text-xl font-bold text-white mb-3 
                    group-hover:text-blue-400 transition-colors duration-300"
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-400 text-sm"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full 
                          bg-blue-400 mr-2 group-hover:animate-pulse"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative Elements */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 
                  bg-gradient-to-br from-blue-500/10 to-transparent 
                  rounded-full -mr-16 -mt-16 transition-opacity 
                  duration-300 opacity-0 group-hover:opacity-100"
                />
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 
                  bg-gradient-to-tr from-blue-500/10 to-transparent 
                  rounded-full -ml-16 -mb-16 transition-opacity 
                  duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>
            </Fade>
          ))}
        </div>

        {/* View All Services Button */}
        <Fade bottom delay={services.length * 200 + 200}>
          <div className="flex justify-center">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 bg-blue-600/90 
                text-white font-medium py-4 px-8 rounded-lg
                transition-all duration-200 hover:bg-blue-700
                hover:shadow-lg hover:shadow-blue-500/25
                backdrop-blur-sm"
            >
              View All Services
              <FaArrowRight
                className="transition-transform duration-200 
                group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Services;
