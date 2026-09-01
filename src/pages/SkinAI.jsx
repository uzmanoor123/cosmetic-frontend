import { useState } from "react";
import { getAIRecommendationsAPI, chatWithAIAPI,} from "../lib/API";

import Navbar from "../components/Navbar";
import {RiRobot2Line, RiSparkling2Line, RiArrowLeftLine, RiSendPlaneFill,} from "react-icons/ri";

import ReactMarkdown from "react-markdown";

const SkinAI = () => {

  const [skinType, setSkinType] = useState("");
  const [concerns, setConcerns] = useState([]);
  const [ageRange, setAgeRange] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [routine, setRoutine] = useState("");

  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("recommendations");

  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  // =========================
  // OPTIONS
  // =========================

  const skinTypes = [
    "Oily",
    "Dry",
    "Combination",
    "Sensitive",
  ];

  const skinConcerns = [
    "Acne",
    "Dark spots",
    "Wrinkles",
    "Dryness",
    "Dullness",
    "Sensitivity",
    "Large pores",
    "Uneven tone",
    "Fine lines",
  ];

  const ageRanges = [
    "18-25",
    "26-35",
    "36-45",
    "45+",
  ];

  const budgetRanges = [
    "Under $25",
    "$25-$50",
    "$50-$100",
    "$100+",
  ];


  const handleConcern = (concern) => {
    setConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((item) => item !== concern)
        : [...prev, concern]
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!skinType) {
      setError("Please select your skin type.");
      return;
    }

    if (concerns.length === 0) {
      setError("Please select at least one skin concern.");
      return;
    }

    if (!ageRange) {
      setError("Please select your age range.");
      return;
    }

    if (!budget) {
      setError("Please select your budget range.");
      return;
    }

    setLoading(true);
    setError("");
    setRecommendations([]);
    setMessage("");

    // User information that will be sent to backend
    const skinProblem = `
Skin type: ${skinType}

Main skin concerns: ${concerns.join(", ")}

Age range: ${ageRange}

Budget range: ${budget}

Specific preferences: ${preferences || "None"}

Current skincare routine: ${routine || "None"}
    `.trim();

    try {
      const data = await getAIRecommendationsAPI(skinProblem);

      console.log("Recommendation data:", data);

      if (data.success) {
        setRecommendations(data.recommendations || []);
        setMessage(data.message || "");
      } else {
        setError(
          data.message ||
            "Could not generate recommendations."
        );
      }
    } catch (error) {
      console.error(
        "Recommendation frontend error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (!chatMessage.trim() || chatLoading) {
      return;
    }

    const userMessage = chatMessage.trim();

    // Clear input
    setChatMessage("");

    // Add user's message to chat
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setChatLoading(true);

    try {
      console.log("Sending chatbot message:", userMessage);

      const data = await chatWithAIAPI(userMessage);

      console.log("Chatbot response:", data);

      if (data.success) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.reply,
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              data.message ||
              "Sorry, I couldn't respond.",
          },
        ]);
      }
    } catch (error) {
      console.error(
        "Chatbot frontend error:",
        error
      );

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <Navbar />

      <main className="px-5 pb-16 pt-8">

        <div className="mx-auto max-w-6xl">


          <button
            onClick={() => window.history.back()}
            className="mb-8 flex cursor-pointer items-center gap-2 text-sm font-medium text-pink-600 transition hover:text-pink-700"
          >
            <RiArrowLeftLine size={18} />

            Back to Store
          </button>
         

          <div className="mb-7 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-600 text-white">

              <RiRobot2Line size={27} />

            </div>

            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              AI Beauty Consultant
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-slate-600">
              Tell us about your skin and beauty goals,
              and our AI will recommend the perfect
              products for you
            </p>

          </div>


          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">


            <div className="grid grid-cols-2 border-b border-gray-200">


              <button
                onClick={() =>
                  setActiveTab("recommendations")
                }
                className={`flex cursor-pointer items-center justify-center gap-2 border-b-2 py-4 text-sm font-medium transition ${
                  activeTab === "recommendations"
                    ? "border-pink-500 bg-pink-50 text-pink-600"
                    : "border-transparent text-slate-600 hover:bg-gray-50"
                }`}
              >
                <RiSparkling2Line size={18} />

                Recommendations
              </button>


              <button
                onClick={() =>
                  setActiveTab("chatbot")
                }
                className={`flex cursor-pointer items-center justify-center gap-2 border-b-2 py-4 text-sm font-medium transition ${
                  activeTab === "chatbot"
                    ? "border-pink-500 bg-pink-50 text-pink-600"
                    : "border-transparent text-slate-600 hover:bg-gray-50"
                }`}
              >
                <RiRobot2Line size={18} />

                Chatbot
              </button>

            </div>
            {activeTab === "recommendations" && (

              <div className="p-6 sm:p-7">

                <form onSubmit={handleSubmit}>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      What's your skin type?
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                      {skinTypes.map((type) => (

                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setSkinType(type)
                          }
                          className={`rounded-lg border px-3 py-2.5 text-sm transition ${
                            skinType === type
                              ? "border-pink-500 bg-pink-50 font-semibold text-pink-600"
                              : "border-gray-200 bg-white text-slate-700 hover:border-pink-300"
                          }`}
                        >
                          {type}
                        </button>

                      ))}

                    </div>

                  </div>

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      What are your main skin concerns?
                      (Select all that apply)
                    </label>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">

                      {skinConcerns.map((concern) => (

                        <button
                          key={concern}
                          type="button"
                          onClick={() =>
                            handleConcern(concern)
                          }
                          className={`rounded-lg border px-3 py-2.5 text-sm transition ${
                            concerns.includes(concern)
                              ? "border-pink-500 bg-pink-50 font-semibold text-pink-600"
                              : "border-gray-200 bg-white text-slate-700 hover:border-pink-300"
                          }`}
                        >
                          {concern}
                        </button>

                      ))}

                    </div>

                  </div>

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      What's your age range?
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                      {ageRanges.map((age) => (

                        <button
                          key={age}
                          type="button"
                          onClick={() =>
                            setAgeRange(age)
                          }
                          className={`rounded-lg border px-3 py-2.5 text-sm transition ${
                            ageRange === age
                              ? "border-pink-500 bg-pink-50 font-semibold text-pink-600"
                              : "border-gray-200 bg-white text-slate-700 hover:border-pink-300"
                          }`}
                        >
                          {age}
                        </button>

                      ))}

                    </div>

                  </div>

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      What's your budget range?
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                      {budgetRanges.map((range) => (

                        <button
                          key={range}
                          type="button"
                          onClick={() =>
                            setBudget(range)
                          }
                          className={`rounded-lg border px-3 py-2.5 text-sm transition ${
                            budget === range
                              ? "border-pink-500 bg-pink-50 font-semibold text-pink-600"
                              : "border-gray-200 bg-white text-slate-700 hover:border-pink-300"
                          }`}
                        >
                          {range}
                        </button>

                      ))}

                    </div>

                  </div>

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      Any specific preferences?
                    </label>

                    <textarea
                      value={preferences}
                      onChange={(e) =>
                        setPreferences(e.target.value)
                      }
                      rows={3}
                      placeholder="e.g. I prefer natural ingredients, I'm allergic to fragrance, I want cruelty-free products..."
                      className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-slate-700 outline-none placeholder:text-gray-400 focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                    />

                  </div>

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      What's your current skincare routine?
                    </label>

                    <textarea
                      value={routine}
                      onChange={(e) =>
                        setRoutine(e.target.value)
                      }
                      rows={3}
                      placeholder="e.g. I wash my face twice daily, I use a moisturizer, I don't have a routine yet..."
                      className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-slate-700 outline-none placeholder:text-gray-400 focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                    />

                  </div>

                  {error && (

                    <p className="mt-3 text-sm text-red-500">
                      {error}
                    </p>

                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-pink-600 py-3.5 text-sm font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <RiSparkling2Line size={17} />

                    {loading
                      ? "Finding Products..."
                      : "Get My Personalized Recommendations"}

                  </button>

                </form>

                {message && (

                  <div className="mt-6 rounded-lg bg-pink-50 p-4">

                    <p className="text-sm leading-relaxed text-slate-700">
                      {message}
                    </p>

                  </div>

                )}

              </div>

            )}


            {activeTab === "chatbot" && (

              <div className="p-6 sm:p-7">

                <div className="h-[340px] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">

                  {chatMessages.length === 0 ? (

                    <div className="flex h-full items-center justify-center">

                      <div className="text-center">

                        <RiSparkling2Line
                          size={32}
                          className="mx-auto mb-4 text-pink-500"
                        />

                        <p className="text-sm text-slate-600">
                          Ask me anything about skincare,
                          health, or beauty routines!
                        </p>

                      </div>

                    </div>

                  ) : (

                    <div className="space-y-4">

                      {chatMessages.map(
                        (chat, index) => (

                          <div
                            key={index}
                            className={`flex ${
                              chat.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >

                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                                chat.sender === "user"
                                  ? "bg-pink-600 text-white"
                                  : "bg-white text-slate-700 shadow-sm"
                              }`}
                            >

                              {chat.sender === "user" ? (

                                <p className="whitespace-pre-wrap">
                                  {chat.text}
                                </p>

                              ) : (

                                /* AI MESSAGE */

                                <ReactMarkdown
                                  components={{

                                    h1: ({ children }) => (
                                      <h1 className="mb-3 text-lg font-bold text-slate-900">
                                        {children}
                                      </h1>
                                    ),

                                    h2: ({ children }) => (
                                      <h2 className="mb-2 mt-4 text-base font-bold text-slate-900">
                                        {children}
                                      </h2>
                                    ),

                                    h3: ({ children }) => (
                                      <h3 className="mb-2 mt-3 text-sm font-bold text-slate-900">
                                        {children}
                                      </h3>
                                    ),

                                    p: ({ children }) => (
                                      <p className="mb-3 leading-relaxed last:mb-0">
                                        {children}
                                      </p>
                                    ),

                                    strong: ({ children }) => (
                                      <strong className="font-bold text-slate-900">
                                        {children}
                                      </strong>
                                    ),

                                    ul: ({ children }) => (
                                      <ul className="mb-3 ml-5 list-disc space-y-1">
                                        {children}
                                      </ul>
                                    ),

                                    ol: ({ children }) => (
                                      <ol className="mb-3 ml-5 list-decimal space-y-1">
                                        {children}
                                      </ol>
                                    ),

                                    li: ({ children }) => (
                                      <li className="leading-relaxed">
                                        {children}
                                      </li>
                                    ),

                                    code: ({ children }) => (
                                      <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">
                                        {children}
                                      </code>
                                    ),

                                    blockquote: ({ children }) => (
                                      <blockquote className="my-3 border-l-4 border-pink-400 pl-3 italic text-slate-600">
                                        {children}
                                      </blockquote>
                                    ),
                                  }}
                                >
                                  {chat.text}
                                </ReactMarkdown>

                              )}

                            </div>

                          </div>

                        )
                      )}


                      {chatLoading && (

                        <div className="flex justify-start">

                          <div className="rounded-lg bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">

                            Thinking...

                          </div>

                        </div>

                      )}

                    </div>

                  )}

                </div>

                <form
                  onSubmit={handleChatSubmit}
                  className="mt-3 flex gap-2"
                >

                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) =>
                      setChatMessage(e.target.value)
                    }
                    placeholder="Type your question..."
                    disabled={chatLoading}
                    className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 disabled:bg-gray-100"
                  />

                  <button
                    type="submit"
                    disabled={
                      chatLoading ||
                      !chatMessage.trim()
                    }
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <RiSendPlaneFill size={16} />

                    {chatLoading
                      ? "Sending..."
                      : "Send"}

                  </button>

                </form>

              </div>

            )}

          </div>

          {recommendations.length > 0 && (

            <section className="mt-12">

              <h2 className="mb-7 text-center text-2xl font-bold text-slate-900">
                Recommended For You
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {recommendations.map((product) => (

                  <div
                    key={product._id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-64 w-full object-cover"
                    />

                    <div className="p-5">

                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        {product.brand}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-slate-900">
                        {product.name}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {product.description}
                      </p>

                      <div className="mt-4 rounded-lg bg-pink-50 p-3">

                        <p className="text-xs font-semibold text-pink-700">
                          Why we recommend it
                        </p>

                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          {product.reason}
                        </p>

                      </div>

                      {/* PRICE + MATCH */}

                      <div className="mt-4 flex items-center justify-between">

                        <span className="text-sm font-semibold text-pink-600">
                          Match: {product.matchScore}%
                        </span>

                        <span className="text-lg font-bold text-slate-900">
                          Rs. {product.price}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>

          )}

        </div>

      </main>

    </div>
  );
};

export default SkinAI;