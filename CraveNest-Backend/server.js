require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CraveNest API is running 🍔",
  });
});
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CraveNest API is working",
  });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/foods", require("./routes/foods"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/reservations", require("./routes/reservations"));
app.use("/api/reviews", require("./routes/reviews"));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
      throw new Error("MONGO_URI and JWT_SECRET are required in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`CraveNest API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();