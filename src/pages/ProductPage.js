import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productCategories } from "../data/products";
import { FaHandshake } from "react-icons/fa";
import Fade from "react-reveal/Fade"; // Import Fade for animations
import industrial from "../assets/BackgroundImages/industrial_1.jpg";

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    const subcategoryFromUrl = params.get("subcategory");

    if (
      categoryFromUrl &&
      productCategories.find((cat) => cat.id === categoryFromUrl)
    ) {
      setActiveCategory(categoryFromUrl);

      if (subcategoryFromUrl) {
        const category = productCategories.find(
          (cat) => cat.id === categoryFromUrl
        );
        if (category.subcategories) {
          const subcategory = category.subcategories.find(
            (sub) => sub.id === subcategoryFromUrl
          );
          if (subcategory) {
            setActiveSubcategory(subcategory.id);
          }
        }
      } else {
        setActiveSubcategory(null);
      }
    }
  }, [location]);

  // Get current category object
  const currentCategory = productCategories.find(
    (cat) => cat.id === activeCategory
  );

  // Get products to display based on category and subcategory
  const getDisplayProducts = () => {
    if (!currentCategory.subcategories) {
      return currentCategory.products;
    }
    if (!activeSubcategory) {
      setActiveSubcategory(currentCategory.subcategories[0].id);
      return currentCategory.subcategories[0].products;
    }
    return (
      currentCategory.subcategories.find((sub) => sub.id === activeSubcategory)
        ?.products || []
    );
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={industrial}
          alt="Our Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Fade bottom>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Products
              </h1>
              <p className="text-xl text-gray-300">
                Offering Tailored Industrial Solutions Built for Excellence
              </p>
            </Fade>
          </div>
        </div>
      </div>

      {/* Main Category Navigation */}
      <div className="sticky top-20 bg-white shadow-md z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveSubcategory(null);
                }}
                className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all duration-300
                  ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subcategory Navigation */}
      {currentCategory?.subcategories && (
        <div className="bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
              {currentCategory.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => setActiveSubcategory(subcategory.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all duration-300
                    ${
                      activeSubcategory === subcategory.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {getDisplayProducts().map((product) => (
              <Fade
                bottom
                key={product.id}
                duration={500}
                delay={product.id * 50}
              >
                <div
                  className="group bg-white rounded-xl overflow-hidden 
                  shadow-md hover:shadow-xl transition-all duration-300 
                  transform hover:-translate-y-1
                  flex flex-col h-[360px]"
                >
                  {/* Product Image Container - Changed bg-gray-50 to bg-white */}
                  <div className="relative h-[300px] overflow-hidden bg-white">
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 
                      transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x400?text=${product.name}`;
                      }}
                    />

                    {/* Subtle Gradient Overlay - Updated for white background */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t 
                    from-white/50 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"
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
              </Fade>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <Fade bottom duration={300}>
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Need Technical Assistance?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to help you choose the right products
              for your specific requirements.
            </p>
            <button
              onClick={handleContactClick}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg 
                          hover:bg-blue-700 transition-colors duration-300 
                          font-semibold inline-flex items-center gap-2"
            >
              Contact Us
              <FaHandshake className="text-xl" />
            </button>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default ProductsPage;
