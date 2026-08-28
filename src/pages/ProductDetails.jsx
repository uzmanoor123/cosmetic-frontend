import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiMinus, FiPlus, FiHeart, FiShoppingCart, } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import Navbar from "../components/Navbar";

import { getProductByIdAPI, addToCartAPI, getProductsAPI } from "../lib/API";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const result = await getProductByIdAPI(id);

        if (result.success) {
          setProduct(result.product);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("Product detail error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const result = await getProductsAPI();

        if (result.success) {
          const products = result.products || [];

          const related = products
            .filter((item) => item._id !== id)
            .slice(0, 4);

          setRelatedProducts(related);
        }
      } catch (error) {
        console.log("Related products error:", error);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      for (let i = 0; i < quantity; i++) {
        const result = await addToCartAPI(product._id);

        if (!result.success) {
          alert(result.message);
          return;
        }
      }

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log("Add to cart error:", error);
      alert("Something went wrong");
    } finally {
      setAdding(false);
    }
  };

  const handleRelatedAddToCart = async (productId) => {
    try {
      const result = await addToCartAPI(productId);

      if (result.success) {
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Related add to cart error:", error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-700">
            Product not found
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="mt-5 bg-[#ec008c] hover:bg-[#c90077] text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Products
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8f8f8] px-5 md:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium mb-6"
          >
            <FiArrowLeft />
            Back to Products
          </button>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="relative">
                <div className="relative w-full h-[400px] bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10 ${product.badgeColor === "Pink"
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

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-pink-600 font-medium mb-2">
                  {product.brand}
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mt-4">
                  <div className="flex gap-1 text-amber-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  <span className="text-sm text-gray-400">(reviews)</span>
                </div>

                <div className="flex items-center gap-3 mt-5">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>

                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}

                  {product.discount && (
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                      Save ${product.discount}
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-5">
                  <p className="text-gray-600 text-sm leading-6">
                    {product.description ||
                      "High-quality beauty product designed to provide excellent results and care for your skin."}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <span className="font-medium text-gray-700">Quantity:</span>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                    >
                      <FiMinus />
                    </button>

                    <span className="w-10 text-center font-semibold">
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="flex-1 bg-[#ec008c] hover:bg-[#c90077] disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart />

                    {adding
                      ? "Adding..."
                      : `Add to Cart - $${(product.price * quantity).toFixed(
                        2,
                      )}`}
                  </button>

                  <button className="w-12 h-12 border border-pink-500 text-pink-500 rounded-xl flex items-center justify-center hover:bg-pink-50 transition">
                    <FiHeart />
                  </button>
                </div>

                <div className="border-t border-gray-300 mt-6 pt-5">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-green-500 text-sm">✓ Free Shipping</p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        Orders over $50
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-green-500 text-sm">✓ 30-Day Returns</p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        Money back guarantee
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-green-500 text-sm">✓ Secure Payment</p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        SSL encrypted
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-300 mt-6 pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-bold text-lg text-gray-800 mb-3">
                        Ingredients
                      </h2>

                      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                        {product.ingredients}
                      </div>
                    </div>

                    <div>
                      <h2 className="font-bold text-lg text-gray-800 mb-3">
                        How to Use
                      </h2>

                      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                        {product.howToUse}
                      </div>
                    </div>

                    <div>
                      <h2 className="font-bold text-lg text-gray-800 mb-3">
                        Benefits
                      </h2>

                      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                        {product.benefits ? (
                          Array.isArray(product.benefits) ? (
                            product.benefits.map((benefit, index) => (
                              <p key={index} className="mb-2">
                                <span className="text-green-500 mr-2">✓</span>
                                {benefit}
                              </p>
                            ))
                          ) : (
                            <p>
                              <span className="text-green-500 mr-2">✓</span>
                              {product.benefits}
                            </p>
                          )
                        ) : (
                          <>
                            <p className="mb-2">
                              <span className="text-green-500 mr-2">✓</span>
                              Moisturizes
                            </p>

                            <p>
                              <span className="text-green-500 mr-2">✓</span>
                              Softens
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                You might also like
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {relatedProducts.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
                  >
                    <div
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="cursor-pointer"
                    >
                      <div className="relative h-40 bg-gray-50 rounded-lg overflow-hidden">
                        {item.badge && (
                          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full z-10">
                            {item.badge}
                          </span>
                        )}

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <p className="text-xs text-gray-400 mt-3">{item.brand}</p>

                      <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>

                      <p className="font-bold text-gray-900 mt-2">
                        ${item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRelatedAddToCart(item._id)}
                      className="w-full mt-3 bg-[#ec008c] hover:bg-[#c90077] text-white py-2 rounded-lg text-sm font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
