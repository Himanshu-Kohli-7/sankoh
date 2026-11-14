import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import ProductShowcase from "../components/ProductShowcase";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import Clients from "../components/Clients";
import products from "../Data";

// Optimized animation variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Home = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Prefetch components (optional)
  useEffect(() => {
    const prefetchComponents = async () => {
      const components = [
        import("../components/About"),
        import("../components/ProductShowcase"),
        import("../components/Services"),
        import("../components/Reviews"),
        import("../components/Clients"),
      ];
      await Promise.all(components);
    };

    // Prefetch after initial render
    const timeoutId = setTimeout(prefetchComponents, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 transform-origin-0"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative z-10"
      >
        <Hero />
      </motion.div>

      {/* Content Sections */}
      <motion.section
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        className="relative"
      >
        <About />
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        className="relative"
      >
        <ProductShowcase products={products} />
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        className="relative"
      >
        <Services />
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        className="relative"
      >
        <Reviews />
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        className="relative"
      >
        <Clients />
      </motion.section>
    </div>
  );
});

export default Home;
