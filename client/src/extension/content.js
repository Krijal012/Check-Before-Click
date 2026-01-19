console.log("Check-Before-Click content script loaded");

let scanning = false;
let sentLinks = new Set();
let sessionId = null;

// Listen to start/stop messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  console.log("Message received:", msg);
  if (msg.action === "START_SCAN") {
    scanning = true;
  }
  if (msg.action === "STOP_SCAN") {
    scanning = false;
  }
});

// Function to collect links dynamically
function getAllLinks() {
  return Array.from(document.querySelectorAll("a"))
    .filter(a => a.href && a.href.startsWith("http"))
    .map(a => ({ url: a.href }));
}

// Use MutationObserver to detect dynamically added links
const observer = new MutationObserver(() => {
  if (scanning) scanLinks();
});
observer.observe(document.body, { childList: true, subtree: true });

async function scanLinks() {
  const allLinks = getAllLinks();
  const newLinks = allLinks.filter(l => !sentLinks.has(l.url));
  if (newLinks.length === 0) return;

  newLinks.forEach(l => sentLinks.add(l.url));

  try {
    const response = await fetch("http://localhost:5000/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: window.location.href, links: newLinks, sessionId })
    });

    const data = await response.json();
    sessionId = data.sessionId; // keep session
    console.log("Scan sent:", data);
  } catch (err) {
    console.error("Scan failed:", err);
  }
}

// Periodically scan every 3 seconds in case links are static
setInterval(() => {
  if (scanning) scanLinks();
}, 3000);
