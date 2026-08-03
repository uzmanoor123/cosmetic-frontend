import { useState } from "react";
import { loginAPI } from "../lib/API";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await loginAPI(formData);
        console.log(result);

    if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/home");
    }
    };

    return (
        <div className="min-h-screen bg-[#fff6f2] flex items-center justify-center">

            <div className="w-[420px] bg-white rounded-3xl shadow-lg p-8">

                <h1 className="text-3xl font-semibold text-center text-[#3b3b3b]">
                    Login Form
                </h1>

                <p className="text-center text-gray-400 mt-2 text-sm">
                    Login to your account by filling the form below
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#e9a58e]"
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-[#e9a58e]"
                    />

                    <button
                        type="submit"
                        className="w-full mt-3 py-3 rounded-lg bg-[#e9a58e] text-white font-semibold hover:bg-[#df927a] transition"
                    >
                        SIGN IN
                    </button>


                </form>


                <p className="text-center text-sm text-gray-400 mt-5">
                    Don't have an account?
                    <span className="text-[#e9a58e] ml-1 cursor-pointer">
                        <Link
                            to="/register"
                            className="text-[#e9a58e] ml-1 cursor-pointer"
                        >
                            Register
                        </Link>
                    </span>
                </p>

            </div>

        </div>
    );
};

export default Login;