const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Food = require("../models/Food");
const Order = require("../models/Order");

const router = express.Router();

router.use(auth);

router.post("/", async (req, res, next) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (
      !Array.isArray(items) ||
      items.length < 1 ||
      items.length > 50
    ) {
      return res.status(400).json({ message: "Invalid order items" });
    }

    if (
      typeof deliveryAddress !== "string" ||
      deliveryAddress.trim().length < 5 ||
      deliveryAddress.length > 300
    ) {
      return res.status(400).json({ message: "Enter a valid delivery address" });
    }

    if (paymentMethod && paymentMethod !== "cash") {
      return res.status(400).json({
        message: "Only cash on delivery is currently supported",
      });
    }

    const quantities = new Map();

    for (const item of items) {
      if (
        !item ||
        typeof item.foodId !== "string" ||
        !mongoose.isValidObjectId(item.foodId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 50
      ) {
        return res.status(400).json({ message: "Invalid item or quantity" });
      }

      const id = item.foodId;
      quantities.set(id, (quantities.get(id) || 0) + item.quantity);

      if (quantities.get(id) > 50) {
        return res.status(400).json({ message: "Maximum 50 per food item" });
      }
    }

    const foods = await Food.find({
      _id: { $in: [...quantities.keys()] },
      available: true,
    });

    if (foods.length !== quantities.size) {
      return res.status(400).json({
        message: "One or more foods are unavailable",
      });
    }

    const orderItems = foods.map((food) => ({
      food: food._id,
      name: food.name,
      price: food.price,
      quantity: quantities.get(food._id.toString()),
    }));

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      total,
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod: "cash",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ order });
  } catch (error) {
    next(error);
  }
});

module.exports = router;