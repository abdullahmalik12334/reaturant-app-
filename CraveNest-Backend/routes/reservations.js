const express = require("express");
const auth = require("../middleware/auth");
const Reservation = require("../models/Reservation");

const router = express.Router();

router.use(auth);

router.post("/", async (req, res, next) => {
  try {
    const { date, time, guests, notes = "" } = req.body;
    const bookingDate = new Date(date);

    if (
      typeof date !== "string" ||
      Number.isNaN(bookingDate.getTime()) ||
      bookingDate <= new Date() ||
      !Number.isInteger(guests) ||
      guests < 1 ||
      guests > 30 ||
      typeof time !== "string" ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) ||
      typeof notes !== "string" ||
      notes.length > 500
    ) {
      return res.status(400).json({
        message: "Please provide a valid future date, time, guests and notes",
      });
    }

    const reservation = await Reservation.create({
      user: req.userId,
      date: bookingDate,
      time,
      guests,
      notes,
    });

    res.status(201).json({
      message: "Reservation request submitted",
      reservation,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.userId })
      .sort({ date: 1 });

    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/cancel", async (req, res, next) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.status !== "pending") {
      return res.status(400).json({
        message: "Only pending reservations can be cancelled",
      });
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.json({ message: "Reservation cancelled", reservation });
  } catch (error) {
    next(error);
  }
});

module.exports = router;