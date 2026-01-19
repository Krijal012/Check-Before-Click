document.addEventListener('DOMContentLoaded', () => {
    const statusBadge = document.getElementById('detection-status');
    const statusText = statusBadge.querySelector('.status-text');
    const startBtn = document.querySelector('.btn-start');
    const stopBtn = document.querySelector('.btn-stop');

    chrome.storage.local.get(['isScanning'], (result) => {
        if (result.isScanning) {
            setUIOn();
        } else {
            setUIOff();
        }
    });

    startBtn.addEventListener('click', () => {
        chrome.storage.local.set({ isScanning: true }, () => {
            setUIOn();
        });
    });

    stopBtn.addEventListener('click', () => {
        chrome.storage.local.set({ isScanning: false }, () => {
            setUIOff();
        });
    });

    function setUIOn() {
        statusBadge.classList.add('is-on');
        statusText.innerText = 'ON';
    }

    function setUIOff() {
        statusBadge.classList.remove('is-on');
        statusText.innerText = 'OFF';
    }
});
