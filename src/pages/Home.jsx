import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiBanner from "../components/AiBanner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/FeaturedProducts";
const Home = () => {
  return (
    <>
    <div className=" min-h-screen">
      <Navbar/>
      <Hero/>
      <AiBanner/>
      <Categories/>
      <FeaturedProducts />
      <Footer/>
      </div>
    </>
  );
};
export default Home;