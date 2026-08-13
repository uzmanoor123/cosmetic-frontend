import { useEffect, useState } from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  getCartAPI,
  increaseCartAPI,
  decreaseCartAPI,
  removeCartItemAPI,
} from "../lib/API";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const result = await getCartAPI();

      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      console.log("Cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (productId) => {
    try {
      const result = await increaseCartAPI(productId);

      if (result.success) {
        setCart(result.cart);

    
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Increase error:", error);
    }
  };


  const handleDecrease = async (productId) => {
    try {
      const result = await decreaseCartAPI(productId);

      if (result.success) {
        setCart(result.cart);

  
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Decrease error:", error);
    }
  };

  const handleRemove = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!confirmDelete) return;

    try {
      const result = await removeCartItemAPI(productId);

      if (result.success) {
        setCart(result.cart);

        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Remove cart error:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
          <p className="text-gray-500">Loading cart...</p>
        </div>
      </>
    );
  }

  const items = cart?.items || [];

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8f8f8] px-10 py-10">

        <div className="mx-auto">

          <div className="flex items-center justify-between mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Shopping Cart
            </h1>

            <div className="flex items-center gap-3">

          
              <button
                onClick={() => navigate("/home")}
                className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                title="Go Back"
              >
                <FiArrowLeft size={20} />
              </button>

             
              <button
                onClick={() => navigate("/home")}
                className="border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition"
              >
                Continue Shopping
              </button>

            </div>

          </div>

          {items.length === 0 ? (

            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">

              <h2 className="text-xl font-semibold text-gray-700">
                Your cart is empty
              </h2>

              <p className="text-gray-400 mt-2">
                Add some products to your cart.
              </p>

              <button
                onClick={() => navigate("/home")}
                className="mt-5 bg-[#ec008c] hover:bg-[#c90077] text-white px-6 py-3 rounded-xl font-semibold"
              >
                Browse Products
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

           
              <div className="lg:col-span-2 space-y-4">

                {items.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-5"
                  >

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <p className="text-sm text-gray-400">
                        {item.product.brand}
                      </p>

                      <h2 className="font-semibold text-gray-800 text-lg">
                        {item.product.name}
                      </h2>

                      <p className="font-bold text-gray-900 mt-2">
                        ${item.product.price}
                      </p>


                      <div className="flex items-center gap-3 mt-3">

                        <button
                          onClick={() =>
                            handleDecrease(item.product._id)
                          }
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <FiMinus />
                        </button>


                        <span className="font-semibold min-w-[20px] text-center">
                          {item.quantity}
                        </span>


                        <button
                          onClick={() =>
                            handleIncrease(item.product._id)
                          }
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <FiPlus />
                        </button>

                      </div>

                    </div>


                    <button
                      onClick={() =>
                        handleRemove(item.product._id)
                      }
                      className="text-red-500 hover:text-red-700 transition"
                      title="Remove product"
                    >
                      <FiTrash2 size={20} />
                    </button>

                  </div>

                ))}

              </div>


              <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

                <h2 className="text-xl font-bold mb-5">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-3 text-gray-600">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>

                <div className="flex justify-between mb-5 text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t pt-5 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

                <button
                  className="w-full mt-6 bg-[#ec008c] hover:bg-[#c90077] text-white py-3 rounded-xl font-semibold transition"
                >
                  Checkout
                </button>

              </div>

            </div>

          )}

        </div>

      </div>
    </>
  );
};

export default Cart;