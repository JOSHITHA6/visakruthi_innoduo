import Visitor from "../models/Visitor.js";
import { isDemoMode, memoryStore } from "../dataStore.js";

export const getVisitors = async (_req, res) => {
  try {
    if (isDemoMode()) {
      return res.json(memoryStore.visitors);
    }

    const visitors = await Visitor.find().sort({ createdAt: -1 });
    return res.json(visitors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const trackVisitor = async (req, res) => {
  try {
    const payload = {
      sessionId: req.body.sessionId || `session-${Date.now()}`,
      path: req.body.path || "/",
      userAgent: req.headers["user-agent"] || "",
      ipAddress: req.ip
    };

    if (isDemoMode()) {
      const visitor = {
        ...payload,
        id: memoryStore.nextIds.visitor++,
        createdAt: new Date().toISOString()
      };
      memoryStore.visitors.unshift(visitor);
      return res.status(201).json(visitor);
    }

    const visitor = await Visitor.create(payload);
    return res.status(201).json(visitor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
