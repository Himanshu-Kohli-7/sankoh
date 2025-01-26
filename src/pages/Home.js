import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import LazyLoadSection from "../components/LazyLoadSection";
import products from "../Data";

// Lazy load components
const About = React.lazy(() => import("../components/About"));
const ProductShowcase = React.lazy(() =>
  import("../components/ProductShowcase")
);
const Services = React.lazy(() => import("../components/Services"));
const Reviews = React.lazy(() => import("../components/Reviews"));
const Clients = React.lazy(() => import("../components/Clients"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  return (
    <div>
      {/* Hero Section - Always rendered */}
      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <Hero />
      </motion.div>

      {/* About Section */}
      <LazyLoadSection>
        <Suspense fallback={<LoadingFallback />}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <About />
          </motion.div>
        </Suspense>
      </LazyLoadSection>

      {/* Product Showcase Section */}
      <LazyLoadSection>
        <Suspense fallback={<LoadingFallback />}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <ProductShowcase products={products} />
          </motion.div>
        </Suspense>
      </LazyLoadSection>

      {/* Services Section */}
      <LazyLoadSection>
        <Suspense fallback={<LoadingFallback />}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <Services />
          </motion.div>
        </Suspense>
      </LazyLoadSection>

      {/* Reviews Section */}
      <LazyLoadSection>
        <Suspense fallback={<LoadingFallback />}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <Reviews />
          </motion.div>
        </Suspense>
      </LazyLoadSection>

      {/* Clients Section */}
      <LazyLoadSection>
        <Suspense fallback={<LoadingFallback />}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <Clients />
          </motion.div>
        </Suspense>
      </LazyLoadSection>
    </div>
  );
};

export default Home;
