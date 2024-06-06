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
