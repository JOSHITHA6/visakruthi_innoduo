import Booking from "../models/Booking.js";
import { isDemoMode, memoryStore } from "../dataStore.js";

export const getBookings = async (_req, res) => {
  try {
    if (isDemoMode()) {
      return res.json(memoryStore.bookings);
    }

    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    if (isDemoMode()) {
      const booking = {
        ...req.body,
        id: memoryStore.nextIds.booking++,
        createdAt: new Date().toISOString()
      };
      memoryStore.bookings.unshift(booking);
      return res.status(201).json(booking);
    }

    const booking = await Booking.create(req.body);
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
