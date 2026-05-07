import { Router } from "express";
import scrapeStories from "../controllers/scrapeController.js";

const router = Router();

router.post("/", scrapeStories);

export default router;
