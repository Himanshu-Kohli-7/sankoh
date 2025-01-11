import React, { useEffect, useState } from "react";
import vardhaman from "../assets/images/Clients/vardhaman.svg";
import wipro from "../assets/images/Clients/wipro.svg";
import birla from "../assets/images/Clients/birla.webp";
import fdc from "../assets/images/Clients/fdc.svg";
import godrej from "../assets/images/Clients/godrej.jpg";
import hul from "../assets/images/Clients/hul.svg";
import indSwift from "../assets/images/Clients/ind-swift.png";
import pnbChemical from "../assets/images/Clients/pnb-chemicals.jpg";
import scl from "../assets/images/Clients/scl.png";
import vvf from "../assets/images/Clients/vvf.webp";
import wrigley from "../assets/images/Clients/Wrigley.png";
import mondelez from "../assets/images/Clients/Mondelez.png";
import nahar from "../assets/images/Clients/Nahar.jpeg";
import ruchira from "../assets/images/Clients/Ruchira.jpg";

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

// Duplicate clients for smooth infinite scroll
const allClients = [...clients, ...clients];

const Clients = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-100 to-gray-50">
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600 text-lg">
            Collaborating with industry leaders to deliver excellence
          </p>
        </div>

        {/* Clients Slider */}
        <div className="relative mt-12">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* Scrolling Container */}
          <div className="overflow-hidden py-4">
            <div className="flex animate-slide">
              {allClients.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 w-52 mx-8"
                >
                  <div
                    className="h-28 flex items-center justify-center bg-white 
                    rounded-lg p-6 border border-gray-200
                    hover:border-blue-500/30 transition-all duration-300 
                    transform hover:-translate-y-1 hover:shadow-lg 
                    shadow-sm group relative overflow-hidden"
                  >
                    {/* Hover Effect Background */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-gray-50/0 
                      via-gray-50/50 to-gray-50/0 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500"
                    ></div>

                    {/* Client Logo */}
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-14 w-auto opacity-60 group-hover:opacity-100 
                      transition-all duration-300 relative z-10 
                      group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150x80?text=${client.name}`;
                      }}
                    />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div
                        className="absolute inset-0 transform -translate-x-full 
                        animate-shimmer bg-gradient-to-r from-transparent 
                        via-blue-50/30 to-transparent"
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
