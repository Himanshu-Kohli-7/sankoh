import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";
import Fade from "react-reveal/Fade"; // Add this import
import industrial from "../assets/BackgroundImages/industrial_1.jpg";

const reviews = [
  {
    id: 1,
    name: "Mr. Ravindra Kumar",
    position: "Mechanical Head",
    company: "Hindustan Unilever Limited",
    image: "https://ui-avatars.com/api/?name=R+K&background=0062FF&color=fff",
    review:
      "Sankoh provides excellent manual valves with great durability. Their products always meet our high standards.",
  },
  {
    id: 2,
    name: "Mr. Ajay Tyagi",
    position: "Instrument Head",
    company: "Wipro Enterprises",
    image: "https://ui-avatars.com/api/?name=A+T&background=0062FF&color=fff",
    review:
      "We rely on Sankoh for automated valves and process instruments. Their products and support are always top-notch.",
  },
  {
    id: 3,
    name: "Mr. Avinash Singh",
    position: "Instrument Head",
    company: "Birla Textiles",
    image: "https://ui-avatars.com/api/?name=A+S&background=0062FF&color=fff",
    review:
      "Sankoh’s automated valves and repair services are very reliable. They’ve helped us minimize downtime at Birla Textiles.",
  },
  {
    id: 4,
    name: "Mr. Shami Sharma",
    position: "Instrument Engineer",
    company: "Godrej Consumers Product Limited",
    image: "https://ui-avatars.com/api/?name=S+S&background=0062FF&color=fff",
    review:
      "The automated valves and process instruments from Sankoh are excellent. They always deliver on time and with great quality.",
  },
  {
    id: 5,
    name: "Mr. Avneesh Sharma",
    position: "Mechanical Engineer",
    company: "Vardhaman Textiles",
    image: "https://ui-avatars.com/api/?name=A+S&background=0062FF&color=fff",
    review:
      "Sankoh’s manual valves and repair services are exceptional. Their quick support has been very helpful for Vardhaman Textiles.",
  },
  {
    id: 6,
    name: "Mr. Manjinder Sandhu",
    position: "Instrument Head",
    company: "Nahar Group",
    image: "https://ui-avatars.com/api/?name=M+J&background=0062FF&color=fff",
    review:
      "Sankoh’s automated valves and process instruments are reliable and efficient. Their support team is always available to help.",
  },
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    // Enable right-to-left sliding
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
          backgroundImage: `url(${industrial})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay Gradient - Lighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/75 to-gray-900/80" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <Fade bottom>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-gray-400 text-lg">
              What our clients say about us
            </p>
          </div>
        </Fade>

        <div className="relative testimonials-slider">
          {/* Removed gradient overlays */}

          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={review.id} className="px-4 py-2">
                <Fade bottom>
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
                        <p className="text-blue-600 text-sm">
                          {review.position}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {review.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
