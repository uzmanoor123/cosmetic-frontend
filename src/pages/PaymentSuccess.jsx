import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fff0f5] flex items-center justify-center px-5">
      <div className="bg-white rounded-[24px] shadow-[0_10px_35px_rgba(236,0,140,0.15)] px-12 py-10 text-center max-w-[670px] w-full">
        <h1 className="text-3xl md:text-[34px] font-bold text-[#e32b6e] tracking-tight">
          Payment Successful!
        </h1>

        <p className="text-[#e32b6e] text-base md:text-[17px] mt-4 font-normal leading-relaxed">
          Thank you for your purchase. Your payment was processed successfully.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="mt-6 bg-[#e32b6e] hover:bg-[#c9205c] text-white px-7 py-3 rounded-xl font-semibold text-base transition duration-200 shadow-sm"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;