const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Food = require("../models/Food");
const Review = require("../models/Review");

const router = express.Router();

router.get("/:foodId", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.foodId)) {
      return res.status(400).json({ message: "Invalid food ID" });
    }

    const reviews = await Review.find({ food: req.params.foodId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const averageRating = reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

    res.json({ reviews, averageRating, count: reviews.length });
  } catch (error) {
    next(error);
  }
});

router.post("/:foodId", auth, async (req, res, next) => {
  try {
    const { rating, comment = "" } = req.body;

    if (!mongoose.isValidObjectId(req.params.foodId)) {
      return res.status(400).json({ message: "Invalid food ID" });
    }

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      typeof comment !== "string" ||
      comment.length > 1000
    ) {
      return res.status(400).json({ message: "Invalid rating or comment" });
    }

    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });

    const review = await Review.findOneAndUpdate(
      { user: req.userId, food: food._id },
      {
        $set: {
          rating,
          comment: comment.trim(),
        },
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ message: "Review saved", review });
  } catch (error) {
    next(error);
  }
});

module.exports = router;