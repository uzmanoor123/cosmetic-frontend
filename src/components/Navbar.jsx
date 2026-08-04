import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-6 h-6 text-white" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                </div>

                <h1 className="text-2xl font-bold text-pink-600">
                    BeautyBloom
                </h1>
            </div>
            <div className="relative w-[420px]">

                <FiSearch className="absolute left-3 top-3 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search products,brands..."
                    className="w-full border border-gray-200 px-3 py-2 pl-10 pr-4 outline-none focus:border-pink-500 bg-transparent shadow-xs rounded-md"
                />
            </div>

            <div className="flex items-center gap-6 text-xl">

                <FiUser className="cursor-pointer hover:text-pink-600" />

                <RiRobot2Line className="cursor-pointer hover:text-pink-600" />

                <FiShoppingCart className="cursor-pointer hover:text-pink-600" />

            </div>

        </nav>
    );
};

export default Navbar;