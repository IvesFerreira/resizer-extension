document.getElementById('save').addEventListener('click', () => {
    saveWindowSize();
});

document.getElementById('resize').addEventListener('click', () => {
    resizeToSavedSize();
});

function saveWindowSize() {
    chrome.windows.getCurrent((win) => {
        const size = { width: win.width, height: win.height };
        chrome.storage.local.set({ windowSize: size }, () => {
            document.getElementById('dimensions').textContent = `Saved size: ${size.width}px x ${size.height}px`;
            alert('Window size saved!');
        });
    });
}

function resizeToSavedSize() {
    chrome.storage.local.get('windowSize', (data) => {
        if (data.windowSize) {
            chrome.windows.getCurrent((win) => {
                chrome.windows.update(win.id, {
                    width: data.windowSize.width,
                    height: data.windowSize.height
                });
            });
        } else {
            alert('No size saved!');
        }
    });
}

// Load saved size on popup open
chrome.storage.local.get('windowSize', (data) => {
    if (data.windowSize) {
        document.getElementById('dimensions').textContent = `Saved size: ${data.windowSize.width}px x ${data.windowSize.height}px`;
    }
});
