import mongoose from "mongoose";

let isDemoMode = true;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MongoDB URI missing. Starting server in demo mode.");
    isDemoMode = true;
    return false;
  }

  try {
    await mongoose.connect(uri);
    isDemoMode = false;
    console.log("MongoDB connected.");
    return true;
  } catch (error) {
    console.warn(`MongoDB unavailable. Falling back to demo mode. ${error.message}`);
    isDemoMode = true;
    return false;
  }
};

export const getDemoMode = () => isDemoMode;
