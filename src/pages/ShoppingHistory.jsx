import Navbar from "../components/Navbar";

const History = () => {
  const orders = [];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#fff6fa] px-5 md:px-8 py-10">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-10">
            Shopping History
          </h1>

          {orders.length === 0 ? (
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
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-pink-100 shadow-sm p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        Order #{order._id}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-green-600">
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between border-b border-gray-100 pb-3"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.product?.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-gray-800">
                          ${item.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-5 pt-4 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Total
                    </span>

                    <span className="font-bold text-pink-600">
                      ${order.totalAmount}
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

export default History;