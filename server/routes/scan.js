import express from "express";
import { ScanSession } from "../model/scanSession.js";
import { analyzeUrl } from "../riskAnalyzer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url, links, sessionId } = req.body;
  if (!url || !Array.isArray(links)) return res.status(400).json({ error: "Invalid payload" });

  try {
    let session;
    if (sessionId) session = await ScanSession.findByPk(sessionId);
    else session = await ScanSession.create({ url, risk_score: 0, status: "safe" });

    const results = await Promise.all(links.map(link => analyzeUrl(link.url)));

    res.json({ sessionId: session.id, url, message: "Scan updated", links: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
