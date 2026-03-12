import mongoose from "mongoose";

const artisanSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    craftType: { type: String, required: true },
    location: { type: String, required: true },
    shortBio: { type: String, required: true },
    bio: { type: String, required: true },
    story: { type: String, required: true },
    gallery: [{ type: String }],
    reels: [
      {
        title: String,
        url: String
      }
    ],
    featured: { type: Boolean, default: false },
    experienceTag: String,
    coords: {
      lat: Number,
      lng: Number
    },
    contact: {
      phone: String,
      email: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Artisan", artisanSchema);
