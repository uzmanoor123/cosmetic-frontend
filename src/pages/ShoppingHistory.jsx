import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyOrdersAPI, createReviewAPI } from "../lib/API";
import Swal from "sweetalert2";
const ShoppingHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewedProducts, setReviewedProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getMyOrdersAPI();

        if (result.success) {
          setOrders(result.orders || []);

          const reviewed = [];

          (result.orders || []).forEach((order) => {
            if (order.reviews) {
              order.reviews.forEach((review) => {
                reviewed.push(
                  `${order._id}-${review.product}`
                );
              });
            }
          });

          setReviewedProducts(reviewed);
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

  const getProductId = (item) => {
    return item.product?._id || item.product;
  };

  const isProductReviewed = (orderId, productId) => {
    return reviewedProducts.includes(
      `${orderId}-${productId}`
    );
  };

const handleReviewSubmit = async () => {
  if (!comment.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Review Required",
      text: "Please write a review before submitting.",
      confirmButtonColor: "#ec008c",
    });
    return;
  }
  console.log("Review Data:", {
  productId: reviewProduct?.productId,
  orderId: reviewProduct?.orderId,
  rating,
  comment,
});

  try {
    const result = await createReviewAPI(
      reviewProduct.productId,
      reviewProduct.orderId,
      rating,
      comment
    );

    if (result.success) {
      const reviewKey = `${reviewProduct.orderId}-${reviewProduct.productId}`;

      setReviewedProducts((prev) => [
        ...prev,
        reviewKey,
      ]);

      setReviewProduct(null);
      setRating(5);
      setComment("");

      Swal.fire({
        icon: "success",
        title: "Review Added!",
        text: "Your review has been added successfully.",
        confirmButtonColor: "#ec008c",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Unable to Add Review",
        text: result.message || "Something went wrong.",
        confirmButtonColor: "#ec008c",
      });
    }
  } catch (error) {
    console.log("Review error:", error);

    Swal.fire({
      icon: "error",
      title: "Something Went Wrong",
      text: "Unable to submit your review. Please try again.",
      confirmButtonColor: "#ec008c",
    });
  }
};

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
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold capitalize">
                        Payment: {order.paymentStatus}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-sm font-semibold capitalize">
                        Order: {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, index) => {
                      const productId = getProductId(item);

                      const alreadyReviewed =
                        isProductReviewed(
                          order._id,
                          productId
                        );

                      return (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row md:items-center gap-4 border-b border-gray-100 pb-4"
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
                              Price: $
                              {Number(item.price).toFixed(2)}
                            </p>
                          </div>

                          <p className="font-semibold text-gray-800">
                            $
                            {(
                              item.price * item.quantity
                            ).toFixed(2)}
                          </p>

                          {order.orderStatus ===
                            "delivered" && (
                            alreadyReviewed ? (
                              <button
                                disabled
                                className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
                              >
                                Reviewed
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  setReviewProduct({
                                    productId,
                                    orderId: order._id,
                                  })
                                }
                                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-semibold"
                              >
                                Leave Review
                              </button>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Total
                    </span>

                    <span className="font-bold text-pink-600 text-lg">
                      $
                      {Number(order.totalAmount).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {reviewProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Leave a Review
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Very Poor</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review
              </label>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Write your review..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setReviewProduct(null);
                  setRating(5);
                  setComment("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingHistory;