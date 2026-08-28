import { FaMagic, FaHeart, FaBolt, FaLeaf, FaSpa, FaUser } from "react-icons/fa";
const categories = [
    { name: "Skincare", icon: FaMagic, color: "bg-pink-100 text-pink-600" },
    { name: "Makeup", icon: FaHeart, color: "bg-purple-100 text-purple-600" },
    { name: "Hair Care", icon: FaBolt, color: "bg-blue-100 text-blue-600" },
    { name: "Wellness", icon: FaLeaf, color: "bg-green-100 text-green-600" },
    { name: "Fragrance", icon: FaSpa, color: "bg-rose-100 text-rose-600" },
    { name: "Men's Care", icon: FaUser, color: "bg-gray-100 text-gray-700" },
];
const Categories = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <section className="mx-auto  px-5 py-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
            <p className="text-gray-500 mt-2 mb-8">
                Explore our curated selection of premium beauty and wellness products
            </p>

            <div className="grid grid-cols-6 gap-6">
                {categories.map((cat, index) => {
                    const Icon = cat.icon;
                    return (
                        <div
                            key={index}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`bg-white p-15 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border flex flex-col items-center ${selectedCategory === cat.name
                                    ? "border-pink-500 shadow-lg"
                                    : "border-gray-100"
                                }`}
                        >
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${cat.color}`}
                            >
                                <Icon size={22} />
                            </div>
                            <h3 className="font-semibold text-gray-700 hover:text-pink-600">{cat.name}</h3>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Categories;