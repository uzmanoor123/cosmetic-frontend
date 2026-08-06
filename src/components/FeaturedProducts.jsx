import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import {BASE_URL} from "../config/envConfig";
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="mx-auto px-5 py-10">

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1f2937]">
          Featured Products
        </h2>
        <p className="text-gray-500 mt-3 text-base">
          Discover our top-rated products, carefully selected for their quality and effectiveness
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-xl  transition-all duration-300 group cursor-pointer"
          >

            <div className="relative w-full h-56 bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
              <span
                className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[11px] font-semibold ${product.badgeColor === "Pink"
                  ? "bg-pink-500"
                  : product.badgeColor === "Green"
                    ? "bg-green-500"
                    : product.badgeColor === "Blue"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                  }`}
              >
                {product.badge}
              </span>

              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white shadow-sm transition z-10">
                <FiHeart className="text-sm" />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="px-1 text-left">
              <p className="text-xs font-medium text-gray-400 mb-1">
                {product.brand}
              </p>
              <h3 className="font-semibold text-gray-800 text-base mb-1.5 line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mb-3">
                <FaStar className="text-amber-400 text-sm" />
                <span className="text-xs text-gray-400">(reviews)</span>
              </div>

              <p className="font-bold text-gray-900 text-lg mb-3">
                ${product.price}
              </p>

              <button className="w-full bg-[#ec008c] hover:bg-[#c90077] text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 text-sm shadow-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-[#ec008c] hover:bg-[#c90077] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 shadow-md">
          See All Products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;