const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [{
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
    }],
    total: { type: Number, required: true, min: 0 },
    deliveryAddress: { type: String, default: "" },
    paymentMethod: {
      type: String,
      enum: ["cash"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["placed", "confirmed", "preparing", "ready", "delivered", "cancelled"],
      default: "placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);