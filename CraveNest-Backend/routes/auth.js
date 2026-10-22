const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Food = require("../models/Food");
const auth = require("../middleware/auth");

const router = express.Router();

function createToken(user) {
  return jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    favoriteFoods: user.favoriteFoods,
  };
}

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== "string" ||
      password.length < 8 || password.length > 72
    ) {
      return res.status(400).json({
        message: "Enter a valid name and email; password must be 8–72 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: typeof phone === "string" ? phone.trim() : "",
    });

    res.status(201).json({
      message: "Account created successfully",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate("favoriteFoods");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.get("/favorites", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate("favoriteFoods");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ favorites: user.favoriteFoods });
  } catch (error) {
    next(error);
  }
});

router.post("/favorites/:foodId", auth, async (req, res, next) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.foodId)) {
      return res.status(400).json({ message: "Invalid food ID" });
    }

    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { favoriteFoods: food._id } },
      { new: true }
    ).populate("favoriteFoods");

    res.json({ favorites: user.favoriteFoods });
  } catch (error) {
    next(error);
  }
});

router.delete("/favorites/:foodId", auth, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { favoriteFoods: req.params.foodId } },
      { new: true }
    ).populate("favoriteFoods");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ favorites: user.favoriteFoods });
  } catch (error) {
    next(error);
  }
});

module.exports = router;