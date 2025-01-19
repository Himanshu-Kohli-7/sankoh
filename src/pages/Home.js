import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Reviews from "../components/Reviews";
import Clients from "../components/Clients";
import ProductShowcase from "../components/ProductShowcase";
import products from "../Data";
import LazyLoadSection from "../components/LazyLoadSection";

const Home = () => {
  return (
    <div>
      <Hero /> {/* Keep Hero always rendered as it's the first section */}
      <LazyLoadSection>
        <About />
      </LazyLoadSection>
      <LazyLoadSection>
        <ProductShowcase products={products} />
      </LazyLoadSection>
      <LazyLoadSection>
        <Services />
      </LazyLoadSection>
      <LazyLoadSection>
        <Reviews />
      </LazyLoadSection>
      <LazyLoadSection>
        <Clients />
      </LazyLoadSection>
    </div>
  );
};

export default Home;
