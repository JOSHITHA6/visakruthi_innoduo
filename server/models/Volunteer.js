import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    college: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interestArea: { type: String, required: true },
    idProofName: String
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", volunteerSchema);
