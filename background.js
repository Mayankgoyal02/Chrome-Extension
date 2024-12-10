let mappings = {}; // Store your mappings here (e.g., from local storage)

// Listener for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_MAPPINGS") {
    sendResponse({ mappings });
  } else if (request.type === "SAVE_MAPPING") {
    mappings[request.key] = request.value;
    sendResponse({ success: true });
  } else if (request.type === "REMOVE_MAPPING") {
    if (mappings[request.key]) {
      delete mappings[request.key];
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false });
    }
  }
});
