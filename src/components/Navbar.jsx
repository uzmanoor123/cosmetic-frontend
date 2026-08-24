import { FiShoppingCart, FiLogOut, FiSearch } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { PiUserPlusLight } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartAPI } from "../lib/API";
const Navbar =() => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("role") === "admin";
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchValue = params.get("search");
    setSearch(searchValue || "");

  }, [location.search]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(search.trim())}`
      );
    } else {
      navigate("/products");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
useEffect(() => {
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const result = await getCartAPI();

      if (result.success) {
        const items = result.cart?.items || [];

        const count = items.reduce(
          (total, item) => total + item.quantity,
          0
        );

        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.log("Cart count error:", error);
      setCartCount(0);
    }
  };

  fetchCartCount();

  window.addEventListener("cartUpdated", fetchCartCount);

  return () => {
    window.removeEventListener("cartUpdated", fetchCartCount);
  };
}, []);



  return (

    <nav className="bg-white shadow-sm px-10 py-4 flex items-center justify-between sticky top-0 z-50">

      <div className="flex items-center gap-2">

        <div className="w-9 h-9 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">



          <svg

            xmlns="http://www.w3.org/2000/svg"

            width="24"

            height="24"

            viewBox="0 0 24 24"

            fill="none"

            stroke="currentColor"

            strokeWidth="2"

            strokeLinecap="round"

            strokeLinejoin="round"

            className="w-6 h-6 text-white"

          >

            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />



            <path d="M20 3v4" />

            <path d="M22 5h-4" />

            <path d="M4 17v2" />

            <path d="M5 18H3" />

          </svg>



        </div>



        <h1

          className="text-2xl font-bold text-pink-600 cursor-pointer"

          onClick={() => navigate("/home")}

        >

          BeautyBloom

        </h1>



      </div>



      <form

        onSubmit={handleSearch}

        className="relative w-[420px]"

      >
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search products, brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 py-2 pl-10 pr-4 rounded-md outline-none focus:border-pink-500"
        />
      </form>
      <div className="flex items-center gap-6 text-[22px]">

        {isAdmin ? (
          <>

            <div className="relative cursor-pointer">
              <PiUserPlusLight

                className="text-[22px] hover:text-pink-600 transition"

              />
              <IoCheckmarkCircle
                className="absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full"
                size={14}
              />

            </div>
            <RiRobot2Line

              className="cursor-pointer hover:text-pink-600 transition"

              title="AI Consultant"

            />

            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FiShoppingCart
                className="hover:text-pink-600 transition"
                title="Cart"
              />

              {cartCount > 0 && (
                <span
                  className="absolute -top-3 -right-3 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </span>

              )}
            </div>

            <MdHistory
              className="cursor-pointer hover:text-pink-600 transition"
              title="Shopping History"

            />
            <FiLogOut
              onClick={handleLogout}
              className="cursor-pointer hover:text-pink-600 transition"
              title="Logout"

            />
          </>

        ) : (

          <>
            <PiUserPlusLight
              onClick={() => navigate("/home")}
              className="cursor-pointer hover:text-pink-600 transition"
            />
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FiShoppingCart
                className="hover:text-pink-600 transition"
                title="Cart"
              />

              {cartCount > 0 && (
                <span

                  className="absolute -top-3 -right-3 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </span>

              )}

            </div>
            <FiLogOut
              onClick={handleLogout}
              className="cursor-pointer hover:text-pink-600 transition"
              title="Logout"
            />
          </>

        )}

      </div>
    </nav>

  );
};

export default Navbar;

