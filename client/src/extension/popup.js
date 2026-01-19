document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const dashboardBtn = document.getElementById("dashboard-btn");

  let scanning = false;
  let intervalId = null;

  // Function to update counts randomly (demo only)
  function updateCounts() {
    const safe = Math.floor(Math.random() * 50 + 10);
    const risky = Math.floor(Math.random() * 30 + 5);
    const blocked = Math.floor(Math.random() * 20 + 3);

    document.getElementById("safe-count").innerText = safe;
    document.getElementById("risky-count").innerText = risky;
    document.getElementById("blocked-count").innerText = blocked;
  }

  startBtn.addEventListener("click", () => {
    if (!scanning) {
      scanning = true;
      alert("Check-Before-Click scan started!"); // notification for demo

      // Start updating counts every 2 seconds
      updateCounts();
      intervalId = setInterval(updateCounts, 2000);

      startBtn.disabled = true;
      stopBtn.disabled = false;
    }
  });

  stopBtn.addEventListener("click", () => {
    if (scanning) {
      scanning = false;
      clearInterval(intervalId);
      alert("Check-Before-Click scan stopped.");

      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });

  dashboardBtn.addEventListener("click", () => {
    window.open("http://localhost:5173/dashboard", "_blank");
  });

  // Initially disable stop button
  stopBtn.disabled = true;
});
