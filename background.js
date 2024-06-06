function saveWindowSize() {
    chrome.windows.getCurrent((win) => {
        const size = { width: win.width, height: win.height };
        chrome.storage.local.set({ windowSize: size }, () => {
            console.log('Window size saved!');
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
            console.log('No size saved!');
        }
    });
}

chrome.commands.onCommand.addListener((command) => {
    if (command === 'save-size') {
        saveWindowSize();
    } else if (command === 'resize-to-saved') {
        resizeToSavedSize();
    }
});

chrome.runtime.onInstalled.addListener(() => {
    console.log('Window Resizer Extension Installed');
});
