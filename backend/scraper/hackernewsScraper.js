import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const scrapeHackerNews = async () => {
  const { data } = await axios.get("https://news.ycombinator.com");
  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").slice(0, 10).each((_, el) => {
    const row = $(el);
    const subRow = row.next();

    const title = row.find(".titleline > a").first().text().trim();
    const url = row.find(".titleline > a").first().attr("href");
    const points = parseInt(subRow.find(".score").text()) || 0;
    const author = subRow.find(".hnuser").text().trim() || "unknown";

    
    const ageTitle = subRow.find(".age").attr("title");
    const parsed = new Date(ageTitle);
    const postedAt = ageTitle && !isNaN(parsed.getTime()) ? parsed : new Date();

    if (title && url) {
      stories.push({ title, url, points, author, postedAt });
    }
  });

  for (const story of stories) {
    await Story.findOneAndUpdate(
      { url: story.url },
      story,
      { upsert: true, returnDocument: "after" }
    );
  }

  console.log(`Scraped and saved ${stories.length} stories`);
  return stories.length;
};

export default scrapeHackerNews;
