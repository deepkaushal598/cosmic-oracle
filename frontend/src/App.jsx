import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [dob, setDob] = useState("");
  const [data, setData] = useState(null);

  const fetchCosmicData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cosmic",
        { dob }
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center p-10">

      {/* Stars Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

      <div className="relative z-10 max-w-4xl w-full">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-purple-300 mb-4">
            Cosmic Birthday Oracle lala✨
          </h1>

          <p className="text-gray-400 mb-10">
            Discover the universe that welcomed your birth.
          </p>
        </motion.div>

        {/* Input Section */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-center">

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/40 text-white border border-purple-500"
          />

          <br />

          <button
            onClick={fetchCosmicData}
            className="mt-6 px-6 py-3 bg-purple-700 hover:bg-purple-800 rounded-xl transition-all"
          >
            Reveal My Destiny 🌙
          </button>

          {/* RESULT */}
          {data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10"
            >

              {/* NASA IMAGE */}
              <img
                src={data.nasaImage}
                alt="space"
                className="w-full rounded-2xl shadow-2xl"
              />

              <h2 className="text-3xl mt-6 text-purple-300">
                {data.nasaTitle}
              </h2>

              {/* MOON INFO */}
              <div className="mt-6 space-y-2 text-lg">
                <p>
                  🌙 Moon Phase:{" "}
                  <span className="text-purple-300">
                    {data.moonPhase}
                  </span>
                </p>

                <p>
                  ✨ Moon Illumination:{" "}
                  <span className="text-purple-300">
                    {data.moonIllumination}%
                  </span>
                </p>
              </div>

              {/* HOROSCOPE */}
              <div className="mt-8 bg-black/40 p-6 rounded-2xl border border-purple-500">
                <h3 className="text-2xl mb-4 text-purple-300">
                  Your Cosmic Destiny 🔮
                </h3>

                <p className="text-gray-300 leading-8 whitespace-pre-line">
                  {data.horoscope}
                </p>
              </div>

            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;