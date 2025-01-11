import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Reviews from "../components/Reviews";
import Clients from "../components/Clients";
import ProductShowcase from "../components/ProductShowcase";
import products from "../Data";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <ProductShowcase products={products} />
      <Services />
      <Reviews />
      <Clients />
    </div>
  );
};

export default Home;
