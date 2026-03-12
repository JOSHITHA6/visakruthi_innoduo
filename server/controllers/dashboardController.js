import Artisan from "../models/Artisan.js";
import Booking from "../models/Booking.js";
import Volunteer from "../models/Volunteer.js";
import Visitor from "../models/Visitor.js";
import { artisanSeed, isDemoMode, memoryStore } from "../dataStore.js";

export const getAnalytics = async (_req, res) => {
  try {
    if (isDemoMode()) {
      return res.json({
        totalArtisans: memoryStore.artisans.length || artisanSeed.length,
        totalVolunteers: memoryStore.volunteers.length,
        totalBookings: memoryStore.bookings.length,
        totalVisitors: memoryStore.visitors.length
      });
    }

    const [totalArtisans, totalVolunteers, totalBookings, totalVisitors] = await Promise.all([
      Artisan.countDocuments(),
      Volunteer.countDocuments(),
      Booking.countDocuments(),
      Visitor.countDocuments()
    ]);

    return res.json({ totalArtisans, totalVolunteers, totalBookings, totalVisitors });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
