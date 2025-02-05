const Minio = require("minio");
require("dotenv").config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT.replace("http://", "").replace("https://", ""),
  useSSL: process.env.MINIO_ENDPOINT.startsWith("https"),
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET_NAME;
const MAX_AGE_MINUTES = 15; // ✅ Delete images older than 15 minutes

async function cleanupOldImages() {
  try {
    const objectsStream = minioClient.listObjects(bucketName, "", true);
    const now = Date.now();

    objectsStream.on("data", async (obj) => {
      try {
        const stat = await minioClient.statObject(bucketName, obj.name);
        const ageMinutes = (now - new Date(stat.lastModified).getTime()) / (1000 * 60);

        if (ageMinutes > MAX_AGE_MINUTES) {
          await minioClient.removeObject(bucketName, obj.name);
          console.log(`🗑 Deleted old image: ${obj.name}`);
        }
      } catch (err) {
        console.error("❌ Error checking/deleting image:", err);
      }
    });

    objectsStream.on("end", () => {
      console.log("✅ MinIO image cleanup completed.");
    });
  } catch (err) {
    console.error("❌ Error listing objects in MinIO:", err);
  }
}

// ✅ Run cleanup every 15 minutes
setInterval(cleanupOldImages, 15 * 60 * 1000);
console.log("🛠 MinIO image cleanup script is running...");

// Run cleanup on start
cleanupOldImages();
