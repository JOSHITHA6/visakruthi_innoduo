import Volunteer from "../models/Volunteer.js";
import { isDemoMode, memoryStore } from "../dataStore.js";

export const getVolunteers = async (_req, res) => {
  try {
    if (isDemoMode()) {
      return res.json(memoryStore.volunteers);
    }

    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    return res.json(volunteers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createVolunteer = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      idProofName: req.file?.originalname || req.body.idProofName || ""
    };

    if (isDemoMode()) {
      const volunteer = {
        ...payload,
        id: memoryStore.nextIds.volunteer++,
        createdAt: new Date().toISOString()
      };
      memoryStore.volunteers.unshift(volunteer);
      return res.status(201).json(volunteer);
    }

    const volunteer = await Volunteer.create(payload);
    return res.status(201).json(volunteer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
