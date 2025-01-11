import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Sankoh Technical Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            Delivering Reliable Valve and Process Instrument Solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-8">
          {/* Text Content */}
          <div className="space-y-6">
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

            {/* CEO Quote */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
              <p className="text-gray-600 italic text-sm mb-3">
                "Our mission is to deliver high-quality valves and instruments
                with unmatched service and reliability, ensuring our clients'
                success."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=S+K&background=0062FF&color=fff"
                  alt="Sanjay Kohli"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900 text-sm">
                    Sanjay Kohli
                  </div>
                  <div className="text-blue-600 text-xs">Founder & CEO</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: "10+", label: "Years Experience" },
                { number: "2000+", label: "Valves Delivered" },
                { number: "100+", label: "Industries Served" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-blue-600 text-white 
                px-5 py-2.5 rounded-lg text-sm font-medium transition-colors 
                duration-200 hover:bg-blue-700"
            >
              Learn More About Us
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 
              transform -rotate-3 rounded-lg opacity-20"
            ></div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/images/industrial1.png"
                alt="Manual and Automated Valves Manufacturing - Sankoh Technical Solutions"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Improved Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent my-12"></div>
      </div>
    </section>
  );
};

export default AboutUs;
