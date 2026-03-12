import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    path: { type: String, default: "/" },
    userAgent: String,
    ipAddress: String
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);
