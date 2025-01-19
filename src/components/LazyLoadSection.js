import React from "react";
import { useInView } from "react-intersection-observer";

const LazyLoadSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return <div ref={ref}>{inView && children}</div>;
};

export default LazyLoadSection;
