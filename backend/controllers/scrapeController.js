import scrapeHackerNews from "../scraper/hackernewsScraper.js";

const scrapeStories = async (req, res) => {
  try {
    const count = await scrapeHackerNews();
    res.status(200).json({ success: true, message: `${count} stories scraped and saved` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default scrapeStories;
