import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHandshake } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { productCategories } from "../data/products";
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
      staggerChildren: 0.1,
    },
  },
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

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

  const currentCategory = productCategories.find(
    (cat) => cat.id === activeCategory
  );

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

  const params = new URLSearchParams(location.search);
  const categoryFromUrl = params.get("category");
  const subcategoryFromUrl = params.get("subcategory");

  const canonicalUrl = `https://www.sankohtech.com/products${
    categoryFromUrl ? `?category=${categoryFromUrl}` : ""
  }${subcategoryFromUrl ? `&subcategory=${subcategoryFromUrl}` : ""}`;

  return (
    <div className="bg-white">
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={industrial}
          alt="Our Products"
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
              Our Products
            </h1>
            <p className="text-xl text-gray-300">
              Offering Tailored Industrial Solutions Built for Excellence
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-20 bg-white shadow-md z-30"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-2 md:flex md:overflow-x-auto md:space-x-4 md:scrollbar-hide">
            {productCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveSubcategory(null);
                }}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base transition-all duration-300 break-words
                  ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Subcategory Navigation */}
      {currentCategory?.subcategories && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-50 border-t border-b border-gray-200"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="grid grid-cols-2 gap-2 md:flex md:overflow-x-auto md:space-x-4 md:scrollbar-hide">
              {currentCategory.subcategories.map((subcategory) => (
                <motion.button
                  key={subcategory.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSubcategory(subcategory.id)}
                  className={`px-3 py-2 rounded-lg text-xs md:text-sm transition-all duration-300 break-words
                    ${
                      activeSubcategory === subcategory.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {subcategory.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="py-12"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {getDisplayProducts().map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl overflow-hidden 
                shadow-md hover:shadow-xl transition-all duration-300 
                flex flex-col h-[360px]"
              >
                {/* Product Image Container */}
                <div className="relative h-[300px] overflow-hidden bg-white">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x400?text=${product.name}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Name */}
                <div className="h-[60px] flex items-center justify-center px-4 bg-white border-t border-gray-100">
                  <h3 className="text-m font-medium text-gray-900 text-center truncate">
                    {product.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Need Technical Assistance?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you choose the right products
            for your specific requirements.
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

export default ProductsPage;
