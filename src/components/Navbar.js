import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from "../assets/Logo/Logo.png";

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

  // Navigation items with their paths
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".products-menu")) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add this new function to handle logo click
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // If already on home page, scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // If on another page, navigate to home
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Updated Logo section */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 focus:outline-none transition-transform duration-300"
          >
            <img
              src={Logo}
              alt="Sankoh Logo"
              className="h-10 md:h-14 w-auto object-contain" // Changed from h-14 to h-10 for mobile, md:h-14 for larger screens
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.name === "Products" ? (
                <div
                  key={item.name}
                  className="relative products-menu"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <button
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
                    <FaChevronDown
                      className={`w-3 h-3 transition-transform duration-300 
      ${isProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Products Dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 
                      transition-all duration-300 ${
                        isProductsOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                  >
                    <div
                      className="bg-white rounded-xl shadow-lg border border-gray-100 
                      overflow-hidden min-w-[200px] py-2"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-6 py-2 hover:bg-gray-50 text-gray-600 
                            hover:text-blue-600 transition-colors duration-200"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
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
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 
                    bg-gradient-to-r from-blue-600 to-blue-400 transform 
                    ${
                      location.pathname === item.path
                        ? "scale-x-100"
                        : "scale-x-0"
                    } 
                    group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                  ></span>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
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
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div
            className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md 
            rounded-2xl mt-2 shadow-lg border border-gray-100"
          >
            {navItems.map((item) =>
              item.name === "Products" ? (
                <div key={item.name} className="space-y-1">
                  <button
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
                    <FaChevronDown
                      className={`w-3 h-3 transition-transform duration-300 
    ${isProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Mobile Products Submenu */}
                  <div
                    className={`transition-all duration-300 space-y-1 pl-4
                    ${
                      isProductsOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 rounded-lg text-gray-500 
                          hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => {
                          setIsOpen(false);
                          setIsProductsOpen(false);
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
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
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
