import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addProductAPI } from './../lib/API';

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    image: "",
    badge: "",
    badgeColor: "",
    category: "",
    concerns: "",
    description: "",
    ingredients: "",
    howToUse: "",
    benefits: "",
    skinType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        concerns: formData.concerns
          .split(",")
          .map((item) => item.trim()),
        ingredients: formData.ingredients
          .split(",")
          .map((item) => item.trim()),

        benefits: formData.benefits
          .split(",")
          .map((item) => item.trim()),
      };
      const result = await addProductAPI(productData);

      if (result.success) {
        alert("Product Added Successfully");

        navigate("/admin");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar isAdmin={true} />

      <div className="min-h-screen bg-[#f8f8f8] py-10">

        <form
          onSubmit={handleSave}
          className="max-w-xl mx-auto bg-white rounded-2xl shadow border border-gray-200 p-8"
        >
          <h1 className="text-4xl font-bold text-pink-600 mb-10">
            Add Product
          </h1>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm ">Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">Brand</label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Original Price
            </label>

            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Badge
            </label>

            <select
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select</option>
              <option>New</option>
              <option>Best Seller</option>
              <option>Premium</option>
              <option>Top Seller</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Badge Color
            </label>

            <select
              name="badgeColor"
              value={formData.badgeColor}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select</option>
              <option>Pink</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Orange</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select</option>
              <option>Skincare</option>
              <option>Hair Care</option>
              <option>Makeup</option>
              <option>Body Care</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Concerns (comma separated)
            </label>

            <input
              type="text"
              name="concerns"
              value={formData.concerns}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 resize-none"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Ingredients (comma separated)
            </label>

            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              How To Use
            </label>

            <textarea
              rows={3}
              name="howToUse"
              value={formData.howToUse}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 resize-none"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">
              Benefits (comma separated)
            </label>

            <input
              type="text"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 font-medium">
              Skin Type
            </label>

            <input
              type="text"
              name="skinType"
              value={formData.skinType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>


          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-8 py-3 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </>
  );
};

export default AddProduct;