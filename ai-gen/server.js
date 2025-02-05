const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Minio = require("minio");
const { pipeline } = require("stream");
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// ✅ Initialize Express app
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ MinIO Client Setup
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT, // ✅ Should be 'localhost'
  port: parseInt(process.env.MINIO_PORT, 10), // ✅ Separate port (9000)
  useSSL: false, // ✅ Change to true if using HTTPS
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// ✅ Ensure MinIO Bucket Exists
const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
async function ensureBucket() {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
      console.log(`✅ Bucket '${BUCKET_NAME}' created.`);
    } else {
      console.log(`✅ Bucket '${BUCKET_NAME}' already exists.`);
    }
  } catch (error) {
    console.error("❌ MinIO Bucket Error:", error);
  }
}

ensureBucket();

app.get("/", (req, res) => {
  res.send(`
    <h1>🦖 AI Monstropedia Server</h1>
    <p>API is active. Use <code>/generate</code> to make a monster.</p>
  `);
});

app.post("/generate", async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description is required." });
    }

    console.log(`🖼 Generating image for: ${description}`);

    const response = await axios({
      method: "POST",
      url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      data: { inputs: description },
      responseType: "stream",
    });

    if (response.status !== 200) {
      throw new Error("Image generation failed.");
    }

    const imageName = `monster_${Date.now()}.png`;
    const imagePath = path.join(__dirname, "images", imageName);
    const writer = fs.createWriteStream(imagePath);
    
    await new Promise((resolve, reject) => {
      pipeline(response.data, writer, (err) => (err ? reject(err) : resolve()));
    });

    console.log(`Image saved locally: ${imagePath}`);

    const minioObjectPath = `images/${imageName}`;
    await minioClient.fPutObject(BUCKET_NAME, minioObjectPath, imagePath);

    console.log(`Image uploaded to MinIO: ${minioObjectPath}`);

    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting local image:", err);
      else console.log(`Local image deleted: ${imagePath}`);
    });

    return res.json({ imageUrl: `http://localhost:9000/${BUCKET_NAME}/${minioObjectPath}` });

  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ error: "Image generation failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
