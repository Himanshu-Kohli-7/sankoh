import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Fade from "react-reveal/Fade"; // Import Fade for animations
import industrial from "../assets/BackgroundImages/industrial_1.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    setSuccessMessage("");
    setErrorMessage("");
  };

  const validateForm = () => {
    // Name validation
    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    // Phone validation
    const phoneRegex = /^[\d\s+-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number");
      return false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      setErrorMessage("Subject is required");
      return false;
    }

    // Message validation
    if (!formData.message.trim()) {
      setErrorMessage("Message is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      const data = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success
      setSuccessMessage(
        "Thank you for your message. We'll get back to you soon!"
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      setErrorMessage(
        "Unable to send message. Please try again or email us directly at sankoh.techsol@gmail.com"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={industrial}
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Fade bottom>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-gray-300">
                Get in touch with our team of experts
              </p>
            </Fade>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Info */}
              <Fade bottom>
                <div className="md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Contact Info
                    </h2>

                    <div className="space-y-6">
                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <FaPhone className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            Phone
                          </h3>
                          <p className="text-gray-600">
                            <a
                              href="tel:+919888491527"
                              className="hover:text-blue-600 transition-colors"
                            >
                              +91 9888491527
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <FaEnvelope className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            Email
                          </h3>
                          <p className="text-gray-600">
                            <a
                              href="mailto:sankoh.techsol@gmail.com"
                              className="hover:text-blue-600 transition-colors"
                            >
                              sankoh.techsol@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <FaMapMarkerAlt className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            Address
                          </h3>
                          <p className="text-gray-600">
                            69, Ground floor, Hansa Industrial Park, Barwala
                            Road, Derabassi
                            <br />
                            Punjab - 140507
                          </p>
                        </div>
                      </div>

                      {/* Business Hours */}
                      <div className="pt-6 mt-6 border-t border-gray-100">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                          Business Hours
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-gray-600">
                            <span>Monday - Saturday</span>
                            <span>9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Sunday</span>
                            <span>Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>

              {/* Contact Form */}
              <Fade bottom delay={200}>
                <div className="md:col-span-2">
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Send us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                            focus:border-blue-500 transition-colors"
                            placeholder="Your Name"
                          />
                        </div>

                        {/* Email Input */}
                        <div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                            focus:border-blue-500 transition-colors"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                            focus:border-blue-500 transition-colors"
                          placeholder="Phone Number"
                        />
                      </div>

                      {/* Subject Input */}
                      <div>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                            focus:border-blue-500 transition-colors"
                          placeholder="Subject"
                        />
                      </div>

                      {/* Message Input */}
                      <div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="6"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                            focus:border-blue-500 transition-colors resize-none"
                          placeholder="Write your message here..."
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      {/* Update the Submit Button and Messages section */}
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center py-3 px-6 rounded-lg 
      transition-all duration-300 font-medium
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } 
      text-white`}
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>

                      {/* Status Messages */}
                      {successMessage && (
                        <div className="mt-4 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
                          <p className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {successMessage}
                          </p>
                        </div>
                      )}

                      {errorMessage && (
                        <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
                          <p className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errorMessage}
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
