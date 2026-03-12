import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    artisanId: String,
    packageName: { type: String, required: true },
    price: { type: Number, required: true },
    visitorName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    groupSize: { type: Number, required: true },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
