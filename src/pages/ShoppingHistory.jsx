import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyOrdersAPI } from "../lib/API";

const ShoppingHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     console.log("SHOPPING HISTORY LOADED");
    const fetchOrders = async () => {
      try {
        const result = await getMyOrdersAPI();

        if (result.success) {
          setOrders(result.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.log("Shopping history error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#fff6fa] px-5 md:px-8 py-10">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-10">
            Shopping History
          </h1>

          {loading ? (
            <div className="min-h-[500px]">
              <p className="text-gray-600 text-lg">
                Loading orders...
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="min-h-[500px]">
              <p className="text-gray-600 text-lg">
                No orders found.
              </p>

              <div className="flex justify-center mt-14">
                <p className="text-gray-700 text-lg text-center">
                  For complaints or refund requests, please contact us at{" "}
                  <span className="text-pink-600 font-semibold">
                    support@beautybloom.com
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-pink-100 shadow-sm p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="font-semibold text-gray-800 text-lg">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold capitalize">
                        Payment: {order.paymentStatus}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-sm font-semibold capitalize">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 border-b border-gray-100 pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg bg-gray-50"
                        />

                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            Price: ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <p className="font-semibold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Total
                    </span>

                    <span className="font-bold text-pink-600 text-lg">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingHistory;