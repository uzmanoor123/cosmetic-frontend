import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", { fullName, email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-between text-gray-800">
  
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#ec008c] flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              BeautyBloom
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            Create account
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Join BeautyBloom today
          </p>
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#ec008c] transition placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#edf4ff] border-none text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec008c]/20 transition placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#edf4ff] border-none text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec008c]/20 transition placeholder-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#ec008c] hover:bg-[#c90077] text-white font-semibold text-sm rounded-xl transition shadow-sm mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 font-medium mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#ec008c] font-semibold hover:underline ml-0.5"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;