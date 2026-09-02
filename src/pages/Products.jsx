import { useEffect, useState } from "react";
import { FiSearch, FiHeart, FiArrowLeft, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../config/envConfig";
import Navbar from "../components/Navbar";
import { addToCartAPI } from "../lib/API";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [priceRange, setPriceRange] = useState("All Prices");
  const [category, setCategory] = useState("All Categories");
  const [brand, setBrand] = useState("All Brands");
  const [rating, setRating] = useState("Any Rating");
  const [sortBy, setSortBy] = useState("Relevance");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlSearch = searchParams.get("search");

    if (urlCategory) setCategory(urlCategory);
    if (urlSearch) setSearch(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const brands = [
    "All Brands",
    ...new Set(products.map((product) => product.brand).filter(Boolean)),
  ];

  const categories = [
    "All Categories",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" || product.category === category;

    const matchesBrand = brand === "All Brands" || product.brand === brand;

    let matchesPrice = true;
    if (priceRange === "Under $25") {
      matchesPrice = product.price < 25;
    } else if (priceRange === "$25 - $50") {
      matchesPrice = product.price >= 25 && product.price <= 50;
    } else if (priceRange === "$50 - $75") {
      matchesPrice = product.price > 50 && product.price <= 75;
    } else if (priceRange === "Over $75") {
      matchesPrice = product.price > 75;
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  if (sortBy === "Price: Low to High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "Name: A-Z") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const clearAllFilters = () => {
    setPriceRange("All Prices");
    setCategory("All Categories");
    setBrand("All Brands");
    setRating("Any Rating");
    setSortBy("Relevance");
    setSearch("");
    setSearchParams({});
  };

  const hasActiveFilters =
    category !== "All Categories" ||
    brand !== "All Brands" ||
    priceRange !== "All Prices" ||
    search !== "";

const handleAddToCart = async (productId) => {
  try {
    const result = await addToCartAPI(productId);

    if (result.success) {
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8f9fa]">
        <main className="mx-auto px-8 py-8">
          <h1 className="text-2xl font-bold text-pink-600 mb-5">
            Search Products
          </h1>
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-pink-600 text-sm font-medium mb-6 hover:underline cursor-pointer"
          >
            <FiArrowLeft />
            Back to Home
          </button>

          <div className="bg-white border border-gray-200 rounded-xl p-3 flex gap-3 mb-5 shadow-sm">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products, brands, ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-pink-500"
              />
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 rounded-lg text-sm font-semibold cursor-pointer">
              Search
            </button>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs font-semibold text-gray-500">Active Filters:</span>

              {category !== "All Categories" && (
                <span className="inline-flex items-center gap-1 bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium border border-pink-200">
                  Category: {category}
                  <FiX
                    className="cursor-pointer hover:text-pink-800"
                    onClick={() => {
                      setCategory("All Categories");
                      searchParams.delete("category");
                      setSearchParams(searchParams);
                    }}
                  />
                </span>
              )}

              {brand !== "All Brands" && (
                <span className="inline-flex items-center gap-1 bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium border border-pink-200">
                  Brand: {brand}
                  <FiX
                    className="cursor-pointer hover:text-pink-800"
                    onClick={() => setBrand("All Brands")}
                  />
                </span>
              )}

              {priceRange !== "All Prices" && (
                <span className="inline-flex items-center gap-1 bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium border border-pink-200">
                  Price: {priceRange}
                  <FiX
                    className="cursor-pointer hover:text-pink-800"
                    onClick={() => setPriceRange("All Prices")}
                  />
                </span>
              )}

              {search && (
                <span className="inline-flex items-center gap-1 bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium border border-pink-200">
                  Search: "{search}"
                  <FiX
                    className="cursor-pointer hover:text-pink-800"
                    onClick={() => setSearch("")}
                  />
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-xs text-pink-600 hover:underline font-semibold ml-auto cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-5">
            <aside className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-pink-600 text-xs font-medium hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-semibold mb-3">Price Range</h3>
                {[
                  "All Prices",
                  "Under $25",
                  "$25 - $50",
                  "$50 - $75",
                  "Over $75",
                ].map((price) => (
                  <label
                    key={price}
                    className="flex items-center gap-2 text-xs text-gray-600 mb-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === price}
                      onChange={() => setPriceRange(price)}
                    />
                    {price}
                  </label>
                ))}
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-semibold mb-3">Category</h3>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-semibold mb-3">Brand</h3>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none"
                >
                  {brands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-semibold mb-3">Minimum Rating</h3>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none"
                >
                  <option>Any Rating</option>
                  <option>4.5+ Stars</option>
                  <option>3.5+ Stars</option>
                  <option>2.5+ Stars</option>
                </select>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none"
                >
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                  <option>Name: A-Z</option>
                </select>
              </div>
            </aside>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Search Results
                </h2>
                <span className="text-xs text-gray-500">
                  {filteredProducts.length} products found
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                  <p className="text-gray-500 font-medium">No products match your active filters.</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 bg-pink-600 text-white px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm hover:shadow-lg transition"
                    >
                      <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden mb-4 group">
                        {product.badge && (
                          <span
                            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-white text-[10px] font-semibold z-10 ${
                              product.badgeColor === "Pink"
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
                        )}

                        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-lg flex items-center justify-center z-10 shadow-sm">
                          <FiHeart className="text-gray-600 text-sm" />
                        </button>
                        <img
                          onClick={() => navigate(`/product/${product._id}`)}
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:cursor-pointer group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mb-1">
                        {product.brand}
                      </p>
                      <h3
                        className="font-semibold text-gray-800 text-sm mb-2 hover:cursor-pointer hover:text-pink-600"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <FaStar className="text-amber-400 text-xs" />
                        <span className="text-xs text-gray-400">(reviews)</span>
                      </div>
                      <p className="font-bold text-gray-900 mb-3">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg text-xs font-semibold hover:cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Products;