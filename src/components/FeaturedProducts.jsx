import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    brand: "Glow Beauty",
    title: "Hydrating Face Cream",
    rating: "4.8",
    price: "$19.99",
    tag: "Best Seller",
    tagBg: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
  },
  {
    id: 2,
    brand: "Radiant Skin",
    title: "Vitamin C Serum",
    rating: "4.9",
    price: "$25.00",
    tag: "New",
    tagBg: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
  },
  {
    id: 3,
    brand: "Youth Renew",
    title: "Anti-Aging Night Cream",
    rating: "4.7",
    price: "$35.50",
    tag: "Premium",
    tagBg: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500",
  },
  {
    id: 4,
    brand: "SunShield",
    title: "Sunscreen SPF 50",
    rating: "4.6",
    price: "$18.00",
    tag: "Organic",
    tagBg: "bg-rose-400",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500",
  },
  {
    id: 5,
    brand: "Pure Roots",
    title: "Clay Hair Mask",
    rating: "4.5",
    price: "$17.49",
    tag: "Organic",
    tagBg: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500",
  },
  {
    id: 6,
    brand: "Nature Pure",
    title: "Aloe Vera Gel",
    rating: "4.8",
    price: "$10.00",
    tag: "Sale",
    tagBg: "bg-emerald-500",
    image: "https://byohhealthcare.com/wp-content/uploads/2025/01/Byoh-Aloevera-Gel-1.png",
  },
  {
    id: 7,
    brand: "Pure Glow",
    title: "Brightening Serum",
    rating: "4.9",
    price: "$16.75",
    tag: "New",
    tagBg: "bg-lime-500",
    image: "https://sukooon.com/cdn/shop/files/whb_Product_View_887d2bb1-eba8-4bd0-9b1b-9040b701038b.png?v=1775113453&width=1946",
  },
  {
    id: 8,
    brand: "Fresh Skin",
    title: "Gentle Cleanser",
    rating: "4.7",
    price: "$14.99",
    tag: "Popular",
    tagBg: "bg-pink-500",
    image: "https://sachetcare.com/cdn/shop/files/hyaluronic_face_wash_8.webp?v=1778131000&width=500",
  },
  {
    id: 9,
    brand: "Glow Spa",
    title: "Peel-Off Mask",
    rating: "4.6",
    price: "$14.00",
    tag: "Popular",
    tagBg: "bg-pink-500",
    image: "https://www.urbanbeauty.pk/cdn/shop/products/DermaShinePeelOffMask_1200x.jpg?v=1665501613",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="mx-auto px-5 py-10">
      {/* Section Header */}
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
            key={product.id}
            className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-xl  transition-all duration-300 group cursor-pointer"
          >

            <div className="relative w-full h-56 bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
              <span
                className={`absolute top-3 left-3 ${product.tagBg} text-white text-[11px] font-semibold px-2.5 py-1 rounded-full z-10`}
              >
                {product.tag}
              </span>

              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white shadow-sm transition z-10">
                <FiHeart className="text-sm" />
              </button>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="px-1 text-left">
              <p className="text-xs font-medium text-gray-400 mb-1">
                {product.brand}
              </p>
              <h3 className="font-semibold text-gray-800 text-base mb-1.5 line-clamp-1">
                {product.title}
              </h3>

              <div className="flex items-center gap-1 mb-3">
                <FaStar className="text-amber-400 text-sm" />
                <span className="text-xs font-semibold text-gray-700">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-400">(120)</span>
              </div>

              <p className="font-bold text-gray-900 text-lg mb-3">
                {product.price}
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