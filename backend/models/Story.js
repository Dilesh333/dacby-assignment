import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    url: {
      type: String,
      required: [true, "URL is required"],
      unique: true,
      trim: true,
    },

    points: {
      type: Number,
      default: 0,
    },

    author: {
      type: String,
      default: "unknown",
      trim: true,
    },

    postedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
