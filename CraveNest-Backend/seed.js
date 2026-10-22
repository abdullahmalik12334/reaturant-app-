require("dotenv").config();

const mongoose = require("mongoose");
const Food = require("./models/Food");

const foods = [
  {
    name: "Classic Burger",
    category: "Fast Food",
    price: 650,
    description: "Juicy burger with fresh vegetables and sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 1250,
    description: "Cheesy pizza topped with pepperoni",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
  },
  {
    name: "Creamy Pasta",
    category: "Pasta",
    price: 850,
    description: "Creamy pasta with herbs and parmesan",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
  },
  {
    name: "Chicken Biryani",
    category: "Desi",
    price: 550,
    description: "Spiced rice served with tender chicken",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600",
  },
  {
    name: "Chocolate Cake",
    category: "Desserts",
    price: 500,
    description: "Rich chocolate cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
  },
  {
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 250,
    description: "Refreshing fresh lemonade",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=600",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Adds sample foods without deleting existing records.
    for (const item of foods) {
      await Food.updateOne(
        { name: item.name, category: item.category },
        { $setOnInsert: item },
        { upsert: true }
      );
    }

    console.log("Sample menu inserted successfully");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();