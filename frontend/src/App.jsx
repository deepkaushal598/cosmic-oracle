import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      
      {/* Stars Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-center shadow-2xl"
      >
        <h1 className="text-5xl text-purple-300 font-bold mb-6">
          Cosmic Birthday Oracle ✨
        </h1>

        <p className="text-gray-300 mb-6">
          Discover the sky that welcomed your birth.
        </p>

        <input
          type="date"
          className="px-4 py-3 rounded-xl bg-black/40 text-white border border-purple-500"
        />

        <br />

        <button className="mt-6 px-6 py-3 bg-purple-700 hover:bg-purple-800 rounded-xl text-white transition-all">
          Reveal My Destiny 🌙
        </button>
      </motion.div>
    </div>
  );
}

export default App;