import Artisan from "../models/Artisan.js";
import { artisanSeed, isDemoMode, memoryStore } from "../dataStore.js";

export const getArtisans = async (_req, res) => {
  try {
    if (isDemoMode()) {
      return res.json(memoryStore.artisans.length ? memoryStore.artisans : artisanSeed);
    }

    const artisans = await Artisan.find().sort({ createdAt: -1 });
    return res.json(artisans);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createArtisan = async (req, res) => {
  try {
    if (isDemoMode()) {
      const artisan = { ...req.body, id: req.body.id || `artisan-${Date.now()}` };
      memoryStore.artisans.unshift(artisan);
      return res.status(201).json(artisan);
    }

    const artisan = await Artisan.create(req.body);
    return res.status(201).json(artisan);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
