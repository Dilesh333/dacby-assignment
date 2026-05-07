import Story from "../models/Story.js";
import User from "../models/User.js";


export const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Story.countDocuments();
    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      stories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;

    
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    
    const user = await User.findById(req.user.id);

    const alreadyBookmarked = user.bookmarks.includes(storyId);

    if (alreadyBookmarked) {
      
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      
      user.bookmarks.push(storyId);
    }

    await user.save();

    
    const updatedUser = await User.findById(req.user.id).populate("bookmarks");

    res.status(200).json({
      message: alreadyBookmarked ? "Bookmark removed" : "Bookmark added",
      bookmarks: updatedUser.bookmarks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
