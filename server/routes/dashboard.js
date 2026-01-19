import express from "express";
import { ScanSession } from "../model/scanSession.js";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const session = await ScanSession.findOne({ order: [["created_at", "DESC"]] });
    if (!session) return res.json({});

    res.json({
      sessionId: session.id,
      url: session.url,
      Links: [], // Optional: if you implement Links model later
      riskScore: session.risk_score
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const total = await ScanSession.count();
    const highRisk = await ScanSession.count({ where: { status: ["risky", "blocked"] } });
    const safe = await ScanSession.count({ where: { status: "safe" } });

    res.json({ total, highRisk, safe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
