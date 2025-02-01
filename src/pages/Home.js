import React, { Suspense, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "../components/Hero";
import LazyLoadSection from "../components/LazyLoadSection";
import products from "../Data";

// Lazy load components with prefetch
const About = React.lazy(() => {
  const component = import("../components/About");
  return component;
});
const ProductShowcase = React.lazy(() =>
  import("../components/ProductShowcase")
);
const Services = React.lazy(() => import("../components/Services"));
const Reviews = React.lazy(() => import("../components/Reviews"));
const Clients = React.lazy(() => import("../components/Clients"));

// Enhanced loading fallback
const LoadingFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

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

  // Prefetch components
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
      {[
        { Component: About, id: "about" },
        { Component: ProductShowcase, id: "products", props: { products } },
        { Component: Services, id: "services" },
        { Component: Reviews, id: "reviews" },
        { Component: Clients, id: "clients" },
      ].map(({ Component, id, props = {} }) => (
        <LazyLoadSection key={id}>
          <Suspense fallback={<LoadingFallback />}>
            <motion.section
              initial="hidden"
              whileInView="visible"
              exit="exit"
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              className="relative"
            >
              <Component {...props} />
            </motion.section>
          </Suspense>
        </LazyLoadSection>
      ))}
    </div>
  );
});

export default Home;
