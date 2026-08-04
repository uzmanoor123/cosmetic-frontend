import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#0b132a] text-gray-300 pt-16 pb-8">
      {/* Container aligned with main sections */}
      <div className="max-w-7xl mx-auto px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

          <div className="md:col-span-5 pr-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#ec008c] flex items-center justify-center text-white shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                BeautyBloom
              </h2>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Your trusted partner in beauty and wellness, bringing you the finest products for your natural glow. We believe everyone deserves to feel confident and beautiful in their own skin.
            </p>

            <div className="flex gap-3 mt-6">
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition cursor-pointer">
                <FiInstagram className="text-lg" />
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition cursor-pointer">
                <FiFacebook className="text-lg" />
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition cursor-pointer">
                <FiTwitter className="text-lg" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-base">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-pink-500 cursor-pointer transition">About Us</li>
              <li className="hover:text-pink-500 cursor-pointer transition">Our Story</li>
              <li className="hover:text-pink-500 cursor-pointer transition">Blogs</li>
              <li className="hover:text-pink-500 cursor-pointer transition">Contact</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-semibold text-white mb-4 text-base">Customer Service</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-pink-500 cursor-pointer transition">Contact Us</li>
              <li className="hover:text-pink-500 cursor-pointer transition">Shipping Info</li>
              <li className="hover:text-pink-500 cursor-pointer transition">Returns</li>
              <li className="hover:text-pink-500 cursor-pointer transition">FAQ</li>
            </ul>
          </div>

          {/* Legal (Spans 2 Columns) */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-base">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-pink-500 cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-pink-500 cursor-pointer transition">Terms of Service</li>
              <li className="hover:text-pink-500 cursor-pointer transition">Cookie Policy</li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-800/60 pt-6 text-center text-xs text-gray-500">
          © 2026 BeautyBloom. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;