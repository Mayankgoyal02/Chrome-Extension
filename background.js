chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_MAPPINGS") {
      chrome.storage.sync.get("mappings", (data) => {
        sendResponse({ mappings: data.mappings || {} });
      });
      return true; // Required for async sendResponse
    }
  
    if (message.type === "SAVE_MAPPING") {
      chrome.storage.sync.get("mappings", (data) => {
        const mappings = data.mappings || {};
        mappings[message.key] = message.value; // Save key-value pair
        chrome.storage.sync.set({ mappings }, () => {
          sendResponse({ success: true });
        });
      });
      return true; // Required for async sendResponse
    }
  });
  