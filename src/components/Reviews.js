import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa"; // Add this import

const reviews = [
  {
    id: 1,
    name: "John Smith",
    position: "Operations Manager",
    company: "Industrial Corp",
    image: "/path/to/client1.jpg",
    review:
      "Exceptional service and quality products. The team at Sankoh Technical Solutions has consistently delivered beyond our expectations.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Technical Director",
    company: "Global Manufacturing",
    image: "/path/to/client2.jpg",
    review:
      "Their expertise in industrial valves is unmatched. We've seen significant improvements in our operations since partnering with them.",
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Plant Manager",
    company: "Asian Industries",
    image: "/path/to/client3.jpg",
    review:
      "Reliable, professional, and innovative solutions. They've helped us optimize our processes and reduce downtime significantly.",
  },
  {
    id: 4,
    name: "Emma Williams",
    position: "Quality Control Head",
    company: "Premier Solutions",
    image: "/path/to/client4.jpg",
    review:
      "The quality of their products and technical support is outstanding. A trusted partner for all our industrial needs.",
  },
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
    responsive: [
      {
        breakpoint: 1024,
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
    <section className="relative py-20 bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/industrial1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay Gradient - Lighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/75 to-gray-900/80" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client Testimonials
          </h2>
          <p className="text-gray-400 text-lg">What our clients say about us</p>
        </div>

        <div className="relative testimonials-slider">
          {/* Removed gradient overlays */}

          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-4 py-2">
                <div
                  className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 
                  hover:border-blue-500/30 transition-all duration-300 overflow-hidden 
                  group h-[300px] flex flex-col p-6 hover:shadow-xl shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <FaQuoteLeft className="text-blue-600/50 text-3xl mb-4" />
                  </div>

                  <p className="text-gray-600 mb-6 flex-grow overflow-y-auto">
                    {review.review}
                  </p>

                  <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-gray-100 overflow-hidden">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://ui-avatars.com/api/?name=John+Smith&background=2563EB&color=fff";
                          }}
                        />
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full 
                        border-2 border-white flex items-center justify-center"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">
                        {review.name}
                      </h3>
                      <p className="text-blue-600 text-sm">{review.position}</p>
                      <p className="text-gray-500 text-xs">{review.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
