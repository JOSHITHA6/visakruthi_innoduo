import express from "express";
import { createArtisan, getArtisans } from "../controllers/artisanController.js";

const router = express.Router();

router.get("/", getArtisans);
router.post("/", createArtisan);

export default router;
