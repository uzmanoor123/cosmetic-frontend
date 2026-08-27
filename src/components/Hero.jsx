import { RiRobot2Line } from "react-icons/ri";
import { useNavigate} from "react-router-dom"
const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-[#ffd2e6]">
            <div className=" mx-auto px-3 py-10">

                <div className="grid grid-cols-2 items-center gap-18">
                    <div className="mt-24">
                        <h1 className=" text-6xl font-bold leading-tight text-[#1f2937]">
                            Discover Your

                            <span className="text-[#ec008c] block">
                                Natural Glow
                            </span>
                        </h1>

                        <p className="mt-8 text-xl leading-10 text-gray-600 max-w-xl">
                            Premium beauty and wellness products crafted
                            with natural ingredients for your radiant skin
                            and healthy lifestyle.
                        </p>

                        <div className="flex gap-5 mt-10">

                            <button 
                            onClick={() => navigate("/products")}
                            className="bg-[#ec008c] text-white px-12  rounded-xl font-semibold">
                                Shop Now
                            </button>

                            <button 
                            onClick={() => navigate("/ai-consultant")}
                            className="border border-pink-400 text-pink-600 px-5 py-2 rounded-xl flex items-center gap-3 font-semibold hover:bg-white hover:text-black">
                                <RiRobot2Line />
                                Get AI Recommendations
                            </button>

                        </div>

                    </div>
                    <div className="flex justify-end">

                        <img
                            src="https://domf5oio6qrcr.cloudfront.net/medialibrary/7544/conversions/724cf5e2-e067-445d-9665-2eb9a0a12c86-thumb.jpg"
                            alt=""
                            className="w-[820px] h-auto object-cover rounded-2xl shadow-2xl mt-10"
                        />

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;