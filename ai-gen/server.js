const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process"); 
const hfClient = require("./utils/hfClient"); 

const app = express();
const PORT = 5000;

try {
  const pid = execSync(`lsof -ti :${PORT}`).toString().trim();
  if (pid) {
    console.log(`Killing process on port ${PORT} (PID: ${pid})`);
    execSync(`kill -9 ${pid}`);
  }
} catch (error) {
  console.log(`No existing process on port ${PORT}, starting fresh.`);
}

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Monstropedia Image Generator API is running! Use POST /generate");
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.post("/generate", async (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: "Missing description" });

  try {
    const imageData = await hfClient.generateMonsterImage(description); 

    const filename = `monster_${Date.now()}.png`;
    const filepath = path.join(__dirname, "images", filename);
    fs.writeFileSync(filepath, imageData);

    console.log(`Image saved: ${filename}`);
    res.json({ imageUrl: `/images/${filename}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
