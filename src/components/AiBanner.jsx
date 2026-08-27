import { RiRobot2Line } from "react-icons/ri";
import { useNavigate} from "react-router-dom"
const AiBanner = () => {
  const navigate = useNavigate();
  return (
    <div className=" mx-auto px-5 my-10">
      <div className="bg-pink-600 text-white rounded-2xl p-8 text-center flex flex-col items-center shadow-lg">
        <div className="  rounded-full mb-4 w-[65px] h-[65px] border border-red-500  flex items-center justify-center bg-pink-800 ">
          <RiRobot2Line className="text-3xl text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">
          Not sure what products are right for you?
        </h2>
        <p className="text-pink-100 max-w-2xl text-lg mb-6">
          Our AI Beauty Consultant analyzes your skin type, concerns, and preferences to recommend the perfect products just for you.
        </p>
        <button 
        onClick={() => navigate("/ai-consultant")}
        className="bg-white text-[#ec008c] font-semibold px-8 py-3 rounded-md hover:bg-pink-50 transition shadow-md flex items-center gap-2">
          <RiRobot2Line className="text-xl" /> Try AI Recommendation
        </button>
      </div>
    </div>
  );
};

export default AiBanner;