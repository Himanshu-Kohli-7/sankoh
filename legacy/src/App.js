import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/ProductPage";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";

// ScrollToTop component to handle smooth scrolling to the top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable smooth scrolling temporarily
    document.documentElement.classList.add("scroll-reset");
    window.scrollTo(0, 0);

    // Re-enable smooth scrolling after the scroll
    setTimeout(() => {
      document.documentElement.classList.remove("scroll-reset");
      document.documentElement.classList.add("smooth-scroll");
    }, 100);

    return () => {
      document.documentElement.classList.remove(
        "scroll-reset",
        "smooth-scroll"
      );
    };
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="page-container">
        <Navbar className="fixed-nav" />
        <main className="scroll-reset">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
