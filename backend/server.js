import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

const app = express();

const allowedOrigins = [
  process.env.DEV_CLIENT_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
  
      if (!origin) return callback(null, true);
   
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.startsWith("http://localhost")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    mongo: !!process.env.MONGO_URI,
    mongoState: mongoose.connection.readyState,
    env: process.env.NODE_ENV,
  });
});

// Serverless-safe DB connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
};

app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(503).json({ message: "Database unavailable", error: err.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scrapeRoutes);

// Local dev only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
