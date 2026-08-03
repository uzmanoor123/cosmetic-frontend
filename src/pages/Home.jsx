const Home = () => {
    return (
        <div className="min-h-screen bg-[#fff6f2]">

            {/* Navbar */}
            <nav className="bg-white shadow px-10 py-5 flex justify-between items-center">

                <h1 className="text-2xl font-semibold text-[#3b3b3b]">
                    Beauty And Cosmetics
                </h1>

                <div className="space-x-30 text-gray-600">
                    <span>Home</span>
                    <span>Products</span>
                    <span>About</span>
                    <span>Contact</span>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    className="bg-[#e9a58e] text-white px-5 py-2 rounded-lg"
                >
                    Logout
                </button>

            </nav>

            <section className="flex items-center justify-between px-16 py-20">

                <div className="w-1/2">

                    <h1 className="text-5xl font-semibold text-[#3b3b3b] leading-tight">
                        Discover Your Natural Beauty
                    </h1>

                    <p className="text-gray-500 mt-5 text-lg">
                        Explore our premium skincare and beauty products
                        designed to make you feel confident and glowing.
                    </p>


                    <button
                        className="mt-8 bg-[#e9a58e] text-white px-8 py-3 rounded-lg font-semibold"
                    >
                        Shop Now
                    </button>

                </div>

            </section>

        </div>
    );
};

export default Home;