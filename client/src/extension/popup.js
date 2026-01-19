document.addEventListener('DOMContentLoaded', function() {
    const dashboardBtn = document.getElementById('dashboard-btn');
    
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', function() {
            // URL where your React Dashboard is running
            // Change port 5173 to 3000 if you are using Create React App
            const dashboardUrl = 'http://localhost:5173/dashboard';
            
            if (typeof chrome !== 'undefined' && chrome.tabs) {
                // Open in new tab (Chrome Extension way)
                chrome.tabs.create({ url: dashboardUrl });
            } else {
                // Fallback for testing outside extension
                window.open(dashboardUrl, '_blank');
            }
        });
    }
});