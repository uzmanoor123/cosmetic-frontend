import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiBanner from "../components/AiBanner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AiBanner />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FeaturedProducts
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Footer />
    </div>
  );
};

export default Home;