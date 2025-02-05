const axios = require("axios");
require("dotenv").config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL = "stabilityai/stable-diffusion-2"; 

async function generateMonsterImage(prompt) {
  try {
    console.log(`Generating image for: ${prompt}`);

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", 
      }
    );

    return Buffer.from(response.data, "binary");
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    throw new Error("Image generation failed.");
  }
}

module.exports = { generateMonsterImage };
