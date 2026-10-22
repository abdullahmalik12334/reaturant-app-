const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = { available: true };

    if (req.query.category) {
      filter.category = String(req.query.category);
    }

    if (req.query.search) {
      const search = String(req.query.search).trim().slice(0, 80);
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: escaped, $options: "i" };
    }

    const foods = await Food.find(filter).sort({ category: 1, name: 1 });
    res.json({ foods });
  } catch (error) {
    next(error);
  }
});

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Food.distinct("category", { available: true });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid food ID" });
    }

    const food = await Food.findOne({
      _id: req.params.id,
      available: true,
    });

    if (!food) return res.status(404).json({ message: "Food not found" });

    res.json({ food });
  } catch (error) {
    next(error);
  }
});

module.exports = router;