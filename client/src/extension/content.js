console.log("Check-Before-Click content script loaded");
 
let scanning = false;
 
// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "START_SCAN") scanning = true;
  if (msg.action === "STOP_SCAN") scanning = false;
});
 
// Scan the page every 3 seconds
const scanInterval = setInterval(async () => {
  if (!scanning) return;
 
  const links = Array.from(document.querySelectorAll("a"))
    .filter(a => a.href)
    .map(a => {
      let status = "safe";
 
      // Simple heuristics for demonstration
      if (a.href.includes("@") || a.href.startsWith("http://")) status = "risky";
      if (a.href.includes("login") || a.href.includes("verify")) status = "blocked";
 
      return { url: a.href, status };
    });
 
  if (links.length === 0) return;
 
  try {
    const response = await fetch("http://localhost:5000/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: window.location.href, links })
    });
    const data = await response.json();
    console.log("Scan sent:", data);
  } catch (err) {
    console.error("Scan failed:", err);
  }
}, 3000);
 
 