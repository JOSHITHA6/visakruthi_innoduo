import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import artisanRoutes from "./routes/artisanRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    name: "VISAKRUTHI API",
    status: "ok",
    message: "Cultural technology platform backend is running."
  });
});

app.use("/api/artisans", artisanRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api", volunteerRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tts", ttsRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`VISAKRUTHI server listening on port ${PORT}`);
  });
});
