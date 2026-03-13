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

const normalizeCode = (code = "") => code.trim().toUpperCase();

export const verifyArtisanAuthenticityByCode = async (req, res) => {
  try {
    const code = normalizeCode(req.params.code || "");
    if (!code) {
      return res.status(400).json({ valid: false, message: "Code is required" });
    }

    if (isDemoMode()) {
      const list = memoryStore.artisans.length ? memoryStore.artisans : artisanSeed;
      const artisan = list.find((item) => normalizeCode(item.authenticity?.code) === code);
      if (!artisan) {
        return res.json({ valid: false });
      }

      return res.json({
        valid: true,
        artisanId: artisan.id,
        artisanName: artisan.name,
        craftType: artisan.craftType,
        origin: artisan.authenticity?.origin,
        issuedBy: artisan.authenticity?.issuedBy
      });
    }

    const artisans = await Artisan.find({}).lean();
    const artisan = artisans.find((item) => normalizeCode(item.authenticity?.code) === code);
    if (!artisan) {
      const fallback = artisanSeed.find((item) => normalizeCode(item.authenticity?.code) === code);
      if (!fallback) {
        return res.json({ valid: false });
      }

      return res.json({
        valid: true,
        artisanId: fallback.id,
        artisanName: fallback.name,
        craftType: fallback.craftType,
        origin: fallback.authenticity?.origin,
        issuedBy: fallback.authenticity?.issuedBy
      });
    }

    return res.json({
      valid: true,
      artisanId: artisan.id,
      artisanName: artisan.name,
      craftType: artisan.craftType,
      origin: artisan.authenticity?.origin,
      issuedBy: artisan.authenticity?.issuedBy
    });
  } catch (error) {
    return res.status(500).json({ valid: false, message: error.message });
  }
};
