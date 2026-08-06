import Navbar from "../components/Navbar";
import { useState , useEffect} from "react";
import {useNavigate } from "react-router-dom";
import { getProductsAPI, deleteProductAPI } from "../lib/API";
import {  FiPlus, FiEdit2,  FiTrash2,  FiBox,  FiGrid 
} from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result  = await getProductsAPI();
      if(result.success){
        setProducts(result.products);
      }
    };

    fetchProducts();
  }, []);
  const handleEdit = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmDelete) return;
  try {
    const result = await deleteProductAPI(id);
    if (result.success) {
      alert("Product deleted successfully");
      setProducts(products.filter((product) => product._id !== id));
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
      <Navbar isAdmin={true} />

      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
              <FiBox className="text-sm" /> Products
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === "transactions"
                  ? "bg-[#ec008c] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiGrid className="text-sm" /> Transactions
            </button>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">
            Products Management
          </h2>
          <button  onClick={() => navigate("/admin/add-product")} className="flex items-center gap-2 bg-[#ec008c] hover:bg-[#c90077] text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition shadow-sm">
            <FiPlus className="text-sm" /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6 w-2/5">PRODUCT</th>
                <th className="py-4 px-6 w-1/5">DETAILS</th>
                <th className="py-4 px-6 w-1/5">PRICE</th>
                <th className="py-4 px-6 text-right w-1/5">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
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
                    {product.price}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={()=> handleEdit(product._id)}
                      className="flex items-center gap-1.5 text-xs text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                        <FiEdit2 className="text-xs" /> Edit
                      </button>
                      <button onClick={()=> handleDelete(product._id)}
                      className="flex items-center gap-1.5 text-xs text-red-500 font-medium px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition">
                        <FiTrash2 className="text-xs" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;