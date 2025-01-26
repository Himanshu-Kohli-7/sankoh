import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const LazyLoadSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px", // Preload slightly before the element comes into view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {inView && children}
    </motion.div>
  );
};

export default LazyLoadSection;
