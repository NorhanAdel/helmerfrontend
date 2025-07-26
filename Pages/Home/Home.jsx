import React from "react";
import About from "../../Components/About/About";
import Hero from "../../Components/Hero/Hero";
import HomeDelivery from "../../Components/HomeDelivery/HomeDelivery";

import ProductListSwiper from "../../Components/ProductListSwiper/ProductListSwiper";
import Testimonials from "../../Components/Testmonial/Testmonial";
import WhyHelmer from "../../Components/Why/Why";

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <WhyHelmer />
      <ProductListSwiper />

      <Testimonials />
      <HomeDelivery />
    </div>
  );
}

export default Home;
