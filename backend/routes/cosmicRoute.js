const express = require("express");
const router = express.Router();
const axios = require("axios");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

router.post("/", async (req, res) => {

  try {

    console.log("API HIT");

    const { dob } = req.body;

    // =========================
    // NASA API
    // =========================

    const nasaResponse = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );

    // =========================
    // WEATHER API
    // =========================

    let moonPhase = "Full Moon";
    let moonIllumination = "87";

    try {

      const weatherResponse = await axios.get(
        `http://api.weatherapi.com/v1/astronomy.json?key=${process.env.WEATHER_API_KEY}&q=London&dt=${dob}`
      );

      moonPhase =
        weatherResponse.data.astronomy.astro.moon_phase;

      moonIllumination =
        weatherResponse.data.astronomy.astro.moon_illumination;

    } catch (weatherError) {

      console.log("Weather API Failed");

    }

    // =========================
// GEMINI AI
// =========================

let horoscope = "";

try {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
  A person was born on ${dob}.

  Moon phase: ${moonPhase}
  Moon illumination: ${moonIllumination}%.

  Generate:
  - magical horoscope
  - poetic cosmic destiny
  - Harry Potter vibes
  - emotional mystical style
  - stars and universe references

  Keep it beautiful and cinematic.
  `;

  const result =
    await model.generateContent(prompt);

  const response = result.response;

  horoscope = response.text();

} catch (aiError) {

  console.log("Gemini Failed");

  horoscope = `
  Born beneath the celestial glow of a silver moon,
  your soul carries the energy of dreamers and seekers.

  The universe marked your arrival with cosmic whispers,
  guiding you toward creativity, mystery and destiny.

  Your stars reveal a spirit that shines brightest in darkness,
  like constellations hidden within the midnight sky.
  `;
}

    // =========================
    // FINAL RESPONSE
    // =========================

    res.json({

      nasaImage: nasaResponse.data.url,
      nasaTitle: nasaResponse.data.title,

      moonPhase,
      moonIllumination,

      horoscope,

    });

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Something went wrong",
    });

  }

});

module.exports = router;