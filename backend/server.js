import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import scrapeHackerNews from "./scraper/hackernewsScraper.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scrapeRoutes);

const startServer = async () => {
  await connectDB();


  await scrapeHackerNews();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
