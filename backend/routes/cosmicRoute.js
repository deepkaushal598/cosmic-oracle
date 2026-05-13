const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const { dob } = req.body;

    // NASA Image
    const nasaResponse = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.SfVfe0nyG3Vf3Zj3X14PglY2f66tYEHEEdgxXyIH}`
    );

    // Astronomy Data
    const weatherResponse = await axios.get(
      `http://api.weatherapi.com/v1/astronomy.json?key=${process.env.c657b680304d4431958193042261305s}&q=London&dt=${dob}`
    );

    const moonPhase = weatherResponse.data.astronomy.astro.moon_phase;

    res.json({
      image: nasaResponse.data.url,
      title: nasaResponse.data.title,
      explanation: nasaResponse.data.explanation,
      moonPhase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;