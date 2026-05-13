import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

function App() {
  const [dob, setDob] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCosmicData = async () => {
    try {
      setLoading(true);

      console.log(dob);
      const response = await axios.post(
        "http://localhost:5000/api/cosmic",
        { dob }
      );

      setData(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40"></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 rounded-full blur-[150px] opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-[150px] opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-bold text-center text-purple-300"
        >
          Cosmic Birthday Oracle ✨
        </motion.h1>

        {/* Typing Animation */}
        <div className="mt-6 text-gray-300 text-center text-lg max-w-2xl">
          <TypeAnimation
            sequence={[
              "Discover the universe that welcomed your birth...",
              2000,
              "Reveal your cosmic destiny Srishti...",
              2000,
              "Unlock the secrets written in the stars...",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-2xl shadow-2xl"
        >

          <div className="flex flex-col items-center">

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="px-5 py-4 rounded-2xl bg-white/40 border border-purple-500 text-white w-full"
            />

            <button
              onClick={fetchCosmicData}
              className="mt-6 bg-purple-700 hover:bg-purple-800 transition-all px-8 py-4 rounded-2xl text-lg"
            >
              Reveal My Destiny 🌙
            </button>

          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 text-purple-300 text-xl animate-pulse">
            Reading the stars...
          </div>
        )}

        {/* Results */}
        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 max-w-4xl w-full"
          >

            {/* NASA Image */}
            <img
              src={data.nasaImage}
              alt="space"
              className="rounded-3xl w-full shadow-2xl border border-purple-500"
            />

            {/* NASA Title */}
            <h2 className="text-4xl mt-8 text-purple-300 font-bold text-center">
              {data.nasaTitle}
            </h2>

            {/* Moon Info */}
            <div className="mt-10 grid md:grid-cols-2 gap-6">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-purple-500">
                <h3 className="text-2xl text-purple-300 mb-3">
                  🌙 Moon Phase
                </h3>

                <p className="text-xl text-gray-300">
                  {data.moonPhase}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-purple-500">
                <h3 className="text-2xl text-purple-300 mb-3">
                  ✨ Moon Illumination
                </h3>

                <p className="text-xl text-gray-300">
                  {data.moonIllumination}%
                </p>
              </div>

            </div>

            {/* Horoscope */}
            <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500 shadow-2xl">

              <h2 className="text-4xl text-center text-purple-300 mb-8">
                Your Cosmic Destiny 🔮
              </h2>

              <p className="text-lg text-gray-300 leading-9 whitespace-pre-line">
                {data.horoscope}
              </p>

            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}

export default App;