document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const dashboardBtn = document.getElementById("dashboard-btn");

  startBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Sending START_SCAN to tab", tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, { action: "START_SCAN" });
    });
  });

  stopBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Sending STOP_SCAN to tab", tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, { action: "STOP_SCAN" });
      alert("Check-Before-Click is now offline");
    });
  });

  dashboardBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:5173/dashboard" });
  });
});
