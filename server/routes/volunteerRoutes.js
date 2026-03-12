import express from "express";
import multer from "multer";
import { createVolunteer, getVolunteers } from "../controllers/volunteerController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/volunteers", getVolunteers);
router.post("/student-registration", upload.single("idProof"), createVolunteer);

export default router;
