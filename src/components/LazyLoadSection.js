import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const LazyLoadSection = ({ children, threshold = 0.1 }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold,
    rootMargin: "100px 0px", // Increased preload margin for smoother transitions
  });

  // Add a small delay before rendering to ensure smooth transitions
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div ref={ref} className="min-h-[100px]">
      <AnimatePresence mode="wait">
        {shouldRender && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
            exit={{ opacity: 0 }}
            className="will-change-transform"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LazyLoadSection;
