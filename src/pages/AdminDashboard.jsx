import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsAPI, deleteProductAPI, updateOrderStatusAPI, } from "../lib/API";
import { FiPlus, FiEdit2, FiTrash2, FiBox, FiGrid, FiSearch, FiCreditCard, FiDollarSign, FiCheckCircle, FiRefreshCcw, FiUser, FiCalendar, FiClock, } from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProductsAPI();

      if (result.success) {
        setProducts(result.products);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === "transactions") {
      fetchTransactions();
    }
  }, [activeTab]);

  const fetchTransactions = async () => {
    try {
      setLoadingTransactions(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/payment/transactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Transactions fetch error:", error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  const handleDelete = (product) => {
    setDeleteProduct(product);
  };

  const confirmDelete = async () => {
    if (!deleteProduct) return;

    try {
      const result = await deleteProductAPI(deleteProduct._id);

      if (result.success) {
        setProducts(
          products.filter(
            (product) => product._id !== deleteProduct._id
          )
        );

        setDeleteProduct(null);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefund = async (orderId) => {
    const confirmRefund = window.confirm(
      "Are you sure you want to refund this transaction?"
    );

    if (!confirmRefund) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/payment/transactions/${orderId}/refund`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Transaction refunded successfully");
        fetchTransactions();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Refund error:", error);
      alert("Something went wrong");
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      const result = await updateOrderStatusAPI(
        orderId,
        newStatus
      );

      if (result.success) {
        setTransactions((prevTransactions) =>
          prevTransactions.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  orderStatus: newStatus,
                }
              : order
          )
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Order status error:", error);
      alert("Something went wrong");
    }
  };

  const totalTransactions = transactions.length;

  const totalRevenue = transactions
    .filter((order) => order.paymentStatus === "paid")
    .reduce(
      (total, order) =>
        total + Number(order.totalAmount || 0),
      0
    );

  const completedTransactions = transactions.filter(
    (order) => order.paymentStatus === "paid"
  ).length;

  const refundedTransactions = transactions.filter(
    (order) => order.paymentStatus === "refunded"
  ).length;

  const filteredTransactions = transactions.filter((order) => {
    const search = searchTerm.toLowerCase();

    const customerName =
      order.user?.name?.toLowerCase() || "";

    const customerEmail =
      order.user?.email?.toLowerCase() || "";

    const orderId =
      order._id?.toLowerCase() || "";

    const productNames =
      order.items
        ?.map((item) => item.name?.toLowerCase())
        .join(" ") || "";

    const matchesSearch =
      customerName.includes(search) ||
      customerEmail.includes(search) ||
      orderId.includes(search) ||
      productNames.includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      order.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
      <Navbar isAdmin={true} />

      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your products and transactions
            </p>
          </div>

          <div className="bg-gray-100/80 p-1.5 rounded-xl border border-gray-200/60 flex items-center gap-1">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === "products"
                  ? "bg-[#ec008c] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiBox className="text-sm" />
              Products
            </button>

            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === "transactions"
                  ? "bg-[#ec008c] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiGrid className="text-sm" />
              Transactions
            </button>
          </div>
        </div>
      </div>

      {activeTab === "products" && (
        <main className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-800">
              Products Management
            </h2>

            <button
              onClick={() => navigate("/admin/add-product")}
              className="flex items-center gap-2 bg-[#ec008c] hover:bg-[#c90077] text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition shadow-sm"
            >
              <FiPlus className="text-sm" />
              Add Product
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6 w-2/5">
                    PRODUCT
                  </th>

                  <th className="py-4 px-6 w-1/5">
                    DETAILS
                  </th>

                  <th className="py-4 px-6 w-1/5">
                    PRICE
                  </th>

                  <th className="py-4 px-6 text-right w-1/5">
                    ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-14 h-14 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                        />

                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {product.title}
                          </p>

                          <p className="text-xs text-gray-400 font-medium mt-0.5">
                            ID: {product._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {product.brand}
                        </p>

                        <p className="text-xs text-gray-400 mt-0.5">
                          {product.category}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-bold text-gray-900 text-sm">
                      ${product.price}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            handleEdit(product._id)
                          }
                          className="flex items-center gap-1.5 text-xs text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                        >
                          <FiEdit2 className="text-xs" />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(product)
                          }
                          className="flex items-center gap-1.5 text-xs text-red-500 font-medium px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition"
                        >
                          <FiTrash2 className="text-xs" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {activeTab === "transactions" && (
        <main className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FiCreditCard className="text-xl text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Total Transactions
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {totalTransactions}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <FiDollarSign className="text-xl text-green-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Total Revenue
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-1">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <FiCheckCircle className="text-xl text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Completed
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {completedTransactions}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                  <FiRefreshCcw className="text-xl text-red-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Refunded
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {refundedTransactions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-pink-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="md:w-48 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option value="all">
                  All Status
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="failed">
                  Failed
                </option>

                <option value="refunded">
                  Refunded
                </option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {loadingTransactions ? (
              <div className="py-20 text-center text-gray-500">
                Loading transactions...
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="py-20 text-center">
                <FiCreditCard className="mx-auto text-4xl text-gray-300 mb-4" />

                <p className="text-gray-500">
                  No transactions found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="py-5 px-5">
                        TRANSACTION
                      </th>

                      <th className="py-5 px-5">
                        CUSTOMER
                      </th>

                      <th className="py-5 px-5">
                        PRODUCT
                      </th>

                      <th className="py-5 px-5">
                        AMOUNT
                      </th>

                      <th className="py-5 px-5">
                        PAYMENT STATUS
                      </th>

                      <th className="py-5 px-5">
                        ORDER STATUS
                      </th>

                      <th className="py-5 px-5">
                        DATE
                      </th>

                      <th className="py-5 px-5 text-right">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredTransactions.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="py-5 px-5">
                          <p className="font-semibold text-gray-800 text-sm">
                            #{order._id.slice(-6)}
                          </p>

                          {order.paymentStatus === "refunded" && (
                            <p className="text-xs text-gray-500 mt-2 break-all">
                              Refund:{" "}
                              {order.refundId || "N/A"}
                            </p>
                          )}
                        </td>

                        <td className="py-5 px-5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                              <FiUser className="text-pink-600 text-sm" />
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {order.user?.name || "User"}
                              </p>

                              <p className="text-xs text-gray-400">
                                {order.user?.email ||
                                  "No email"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-5">
                          <div className="space-y-3">
                            {order.items?.map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                  />

                                  <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                      {item.name}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                      Quantity:{" "}
                                      {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </td>

                        <td className="py-5 px-5">
                          <p className="font-semibold text-gray-900">
                            $
                            {Number(
                              order.totalAmount || 0
                            ).toFixed(2)}
                          </p>

                          <p className="text-xs text-gray-400">
                            USD
                          </p>
                        </td>

                        <td className="py-5 px-5">
                          {order.paymentStatus ===
                          "refunded" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                              <FiRefreshCcw />
                              Refunded
                            </span>
                          ) : order.paymentStatus ===
                            "paid" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                              <FiCheckCircle />
                              Paid
                            </span>
                          ) : order.paymentStatus ===
                            "failed" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                              Failed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                              <FiClock />
                              Pending
                            </span>
                          )}
                        </td>

                        <td className="py-5 px-5">
                          <select
                            value={
                              order.orderStatus ||
                              "processing"
                            }
                            onChange={(e) =>
                              handleOrderStatusChange(
                                order._id,
                                e.target.value
                              )
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 outline-none focus:border-pink-400"
                          >
                            <option value="processing">
                              Processing
                            </option>

                            <option value="shipped">
                              Shipped
                            </option>

                            <option value="delivered">
                              Delivered
                            </option>

                            <option value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        </td>

                        <td className="py-5 px-5">
                          <div className="flex items-start gap-2">
                            <FiCalendar className="text-gray-400 mt-0.5" />

                            <div>
                              <p className="text-sm text-gray-700">
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString()}
                              </p>

                              <p className="text-xs text-gray-400">
                                {new Date(
                                  order.createdAt
                                ).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-5 text-right">
                          {order.paymentStatus === "paid" ? (
                            <button
                              onClick={() =>
                                handleRefund(order._id)
                              }
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition"
                            >
                              <FiRefreshCcw />
                              Refund
                            </button>
                          ) : order.paymentStatus ===
                            "refunded" ? (
                            <span className="text-xs text-gray-400">
                              Refunded
                            </span>
                          ) : (
                            <span className="text-xs text-gray-300">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      )}

      {deleteProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                Delete Product
              </h2>

              <button
                onClick={() => setDeleteProduct(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to delete this product?
              </p>

              <p className="font-semibold text-gray-800 mt-3">
                {deleteProduct.name}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteProduct(null)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;