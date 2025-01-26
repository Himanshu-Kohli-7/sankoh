import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from "../assets/Logo/Logo.png";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    {
      name: "Products",
      path: "/products",
      subItems: [
        { name: "Manual Valves", path: "/products?category=manual-valves" },
        {
          name: "Automated Valves",
          path: "/products?category=automated-valves",
        },
        {
          name: "Process Instruments",
          path: "/products?category=process-instruments",
        },
      ],
    },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".products-menu")) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogoClick}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <img
              src={Logo}
              alt="Sankoh Logo"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <motion.div
            variants={navItemVariants}
            className="hidden md:flex items-center space-x-8"
          >
            {navItems.map((item) =>
              item.name === "Products" ? (
                <div
                  key={item.name}
                  className="relative products-menu"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/products")}
                    className={`flex items-center gap-1 ${
                      isScrolled
                        ? location.pathname === item.path
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                        : location.pathname === item.path
                        ? "text-blue-400"
                        : "text-white hover:text-blue-400"
                    } transition-colors duration-300`}
                  >
                    {item.name}
                    <motion.div
                      animate={{ rotate: isProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown className="w-3 h-3" />
                    </motion.div>
                  </motion.button>

                  {/* Products Dropdown */}
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div
                          className="bg-white rounded-xl shadow-lg border border-gray-100 
                          overflow-hidden min-w-[200px] py-2"
                        >
                          {item.subItems.map((subItem) => (
                            <motion.div
                              key={subItem.name}
                              whileHover={{ x: 5, backgroundColor: "#F3F4F6" }}
                            >
                              <Link
                                to={subItem.path}
                                className="block px-6 py-2 text-gray-600 
                                  hover:text-blue-600 transition-colors duration-200"
                                onClick={() => setIsProductsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={item.path}
                    className={`relative group ${
                      isScrolled
                        ? location.pathname === item.path
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                        : location.pathname === item.path
                        ? "text-blue-400"
                        : "text-white hover:text-blue-400"
                    } transition-colors duration-300`}
                  >
                    {item.name}
                    <motion.span
                      initial={{
                        scaleX: location.pathname === item.path ? 1 : 0,
                      }}
                      animate={{
                        scaleX: location.pathname === item.path ? 1 : 0,
                      }}
                      whileHover={{ scaleX: 1 }}
                      className="absolute -bottom-1 left-0 w-full h-0.5 
                        bg-gradient-to-r from-blue-600 to-blue-400"
                      style={{ originX: 0 }}
                    />
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-gray-600" : "text-white"
            }`}
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden"
            >
              <div
                className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md 
                rounded-2xl mt-2 shadow-lg border border-gray-100"
              >
                {navItems.map((item) =>
                  item.name === "Products" ? (
                    <motion.div
                      key={item.name}
                      className="space-y-1"
                      variants={navItemVariants}
                    >
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          navigate("/products");
                          setIsProductsOpen(!isProductsOpen);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl 
                          transition-all duration-300 flex items-center justify-between
                          ${
                            location.pathname === item.path
                              ? "bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-cyan-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {item.name}
                        <motion.div
                          animate={{ rotate: isProductsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaChevronDown className="w-3 h-3" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {isProductsOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="space-y-1 pl-4"
                          >
                            {item.subItems.map((subItem) => (
                              <motion.div
                                key={subItem.name}
                                whileHover={{ x: 5 }}
                              >
                                <Link
                                  to={subItem.path}
                                  className="block px-4 py-2 rounded-lg text-gray-500 
                                    hover:bg-gray-50 hover:text-blue-600 
                                    transition-colors duration-200"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setIsProductsOpen(false);
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.name}
                      variants={navItemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        to={item.path}
                        className={`block px-4 py-3 rounded-xl transition-all duration-300
                          ${
                            location.pathname === item.path
                              ? "bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-cyan-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
