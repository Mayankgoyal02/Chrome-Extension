document.addEventListener("keydown", (event) => {
    const target = event.target;
  
    // Only process text inputs or textareas
    if ((target.tagName === "INPUT" || target.tagName === "TEXTAREA") && event.key === "Tab") {
      // Prevent the default tab action (moving focus) for now
      event.preventDefault();
  
      const inputValue = target.value.trim();
  
      // Send a message to get saved mappings
      chrome.runtime.sendMessage({ type: "GET_MAPPINGS" }, (response) => {
        const mappings = response.mappings || {};
  
        // Check if the input value matches any key
        if (mappings[inputValue]) {
          // Replace the text with the mapped value
          target.value = target.value.replace(inputValue, mappings[inputValue]);
        }
  
        // Now allow the tab key's default behavior (move focus to the next input)
        setTimeout(() => {
          target.blur();  // Remove focus from the current element
          target.focus();  // Restore focus, allowing tab to shift focus
        }, 0);
      });
    }
  });
  