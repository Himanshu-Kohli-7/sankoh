import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productCategories } from "../data/products";

const ProductShowcase = () => {
  const navigate = useNavigate();

  const handleProductClick = (product, category) => {
    const categoryMap = {
      "Manual Valves": "manual-valves",
      "Automated Valves": "automated-valves",
      "Process Instruments": "instruments",
    };

    // If no product is provided, it's a category-only click
    if (!product) {
      navigate(`/products?category=${categoryMap[category]}`);
      return;
    }

    // For product clicks with subcategories
    const baseUrl = `/products?category=${categoryMap[category]}`;
    if (product.subcategory) {
      navigate(`${baseUrl}&subcategory=${product.subcategoryId}`);
    } else {
      navigate(baseUrl);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/75 to-gray-900/80" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Products
          </h2>
          <p className="text-gray-400 text-lg">
            Offering Tailored Industrial Solutions Built for Excellence
          </p>
        </div>

        {/* Product Categories */}
        <div className="space-y-16">
          {/* Manual Valves */}
          <div>
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-2xl font-bold text-white">Manual Valves</h3>
              <button
                onClick={() => handleProductClick(null, "Manual Valves")}
                className="text-blue-400 hover:text-blue-300 transition-colors 
                  duration-300 text-sm flex items-center gap-2"
              >
                View Category <FaArrowRight className="text-xs" />
              </button>
            </div>
            <div className="overflow-hidden">
              <Slider {...sliderSettings}>
                {productCategories[0].products.map((product) => (
                  <div key={product.id} className="px-3">
                    <ProductCard
                      product={product}
                      onClick={() =>
                        handleProductClick(product, "Manual Valves")
                      }
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Automated Valves */}
          <div>
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-2xl font-bold text-white">
                Automated Valves
              </h3>
              <button
                onClick={() => handleProductClick(null, "Automated Valves")}
                className="text-blue-400 hover:text-blue-300 transition-colors 
                  duration-300 text-sm flex items-center gap-2"
              >
                View Category <FaArrowRight className="text-xs" />
              </button>
            </div>
            <div className="overflow-hidden">
              <Slider {...sliderSettings}>
                {productCategories[1].subcategories.flatMap((sub) =>
                  sub.products.map((product) => (
                    <div key={product.id} className="px-3">
                      <ProductCard
                        product={{
                          ...product,
                          subcategory: sub.name,
                          subcategoryId: sub.id,
                        }}
                        onClick={() =>
                          handleProductClick(
                            {
                              ...product,
                              subcategory: sub.name,
                              subcategoryId: sub.id,
                            },
                            "Automated Valves"
                          )
                        }
                      />
                    </div>
                  ))
                )}
              </Slider>
            </div>
          </div>

          {/* Process Instruments */}
          <div>
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-2xl font-bold text-white">
                Process Instruments
              </h3>
              <button
                onClick={() => handleProductClick(null, "Process Instruments")}
                className="text-blue-400 hover:text-blue-300 transition-colors 
                  duration-300 text-sm flex items-center gap-2"
              >
                View Category <FaArrowRight className="text-xs" />
              </button>
            </div>
            <div className="overflow-hidden">
              <Slider {...sliderSettings}>
                {productCategories[2].subcategories.flatMap((sub) =>
                  sub.products.map((product) => (
                    <div key={product.id} className="px-3">
                      <ProductCard
                        product={{ ...product, subcategory: sub.name }}
                        onClick={() =>
                          handleProductClick(
                            { ...product, subcategory: sub.name },
                            "Process Instruments"
                          )
                        }
                      />
                    </div>
                  ))
                )}
              </Slider>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 bg-blue-600/90 text-white 
              px-6 py-3 rounded-lg font-medium transition-all duration-300
              hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20
              backdrop-blur-sm"
          >
            Explore Category
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-white rounded-xl overflow-hidden 
      shadow-md hover:shadow-xl transition-all duration-500 
      transform hover:-translate-y-1
      flex flex-col h-[360px] cursor-pointer"
  >
    {/* Product Image Container */}
    <div className="relative h-[300px] overflow-hidden bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain p-2 
          transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/400x400?text=${product.name}`;
        }}
      />

      {/* Subtle Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t 
        from-white/50 to-transparent opacity-0 
        group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>

    {/* Product Name - Fixed Height Footer */}
    <div
      className="h-[60px] flex items-center justify-center 
      px-4 bg-white border-t border-gray-100"
    >
      <h3
        className="text-m font-medium text-gray-900 
        text-center truncate"
      >
        {product.name}
      </h3>
    </div>
  </div>
);

export default ProductShowcase;
