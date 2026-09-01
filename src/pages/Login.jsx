import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Sparkles } from "lucide-react";
import { loginAPI } from "../lib/API.js";
import Swal from "sweetalert2";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginAPI({
        email,
        password,
      });
      if (result.success) {

        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.user.role);
        window.dispatchEvent(new Event("authUpdated"));

        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result.message,
          confirmButtonColor: "#ec008c",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to login. Please try again.",
        confirmButtonColor: "#ec008c",
      });
    }
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
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Sign in to your account
          </p>
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#edf4ff] border-none text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec008c]/20 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#edf4ff] border-none text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec008c]/20 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#ec008c] hover:bg-[#c90077] text-white font-semibold text-sm rounded-xl transition shadow-sm mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 font-medium mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#ec008c] font-semibold hover:underline ml-0.5"
            >
              Register
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-[#ec008c] hover:underline mt-8"
        >
          <FiArrowLeft className="text-sm" /> Back to Store
        </Link>
      </main>
    </div>
  );
};

export default Login;