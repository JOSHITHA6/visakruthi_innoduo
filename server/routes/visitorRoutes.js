import express from "express";
import { getVisitors, trackVisitor } from "../controllers/visitorController.js";

const router = express.Router();

router.get("/", getVisitors);
router.post("/track", trackVisitor);

export default router;
