import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/api/scan", (req, res) => {
  const { url, links, sessionId } = req.body;

  console.log("SCAN REQUEST");
  console.log("PAGE:", url);
  console.log("LINK COUNT:", links.length);

  res.json({
    sessionId: sessionId ?? Date.now(),
    scanned: links.length,
    status: "ok"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
