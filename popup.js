document.addEventListener("DOMContentLoaded", () => {
  const savedMappingsElement = document.getElementById("savedMappings");
  const saveButton = document.getElementById("saveMapping");

  // Function to fetch and display saved mappings
  const displayMappings = () => {
    chrome.runtime.sendMessage({ type: "GET_MAPPINGS" }, (response) => {
      const mappings = response.mappings || {};
      if (Object.keys(mappings).length === 0) {
        savedMappingsElement.textContent = "No mappings saved yet.";
      } else {
        savedMappingsElement.innerHTML = ""; // Clear previous content
        for (const [key, value] of Object.entries(mappings)) {
          const item = document.createElement("div");
          item.className = "mapping-item";

          const keyElement = document.createElement("span");
          keyElement.className = "key";
          keyElement.textContent = key;

          const valueElement = document.createElement("span");
          valueElement.className = "value";
          valueElement.textContent = value;

          // Create a remove button
          const removeButton = document.createElement("button");
          removeButton.className = "remove-btn";
          removeButton.innerHTML = "&times;";
          removeButton.addEventListener("click", () => {
            removeMapping(key);
          });

          item.appendChild(keyElement);
          item.appendChild(valueElement);
          item.appendChild(removeButton);
          savedMappingsElement.appendChild(item);
        }
      }
    });
  };

  // Function to remove a mapping
  const removeMapping = (key) => {
    chrome.runtime.sendMessage({ type: "REMOVE_MAPPING", key }, (response) => {
      if (response.success) {
        // alert(`Mapping for '${key}' removed successfully!`);
        displayMappings(); // Refresh mappings display
      } else {
        alert("Failed to remove the mapping!");
      }
    });
  };

  // Fetch and display mappings on load
  displayMappings();

  // Save mapping on button click
  saveButton.addEventListener("click", () => {
    const key = document.getElementById("keyInput").value.trim();
    const value = document.getElementById("valueInput").value.trim();

    if (!key || !value) {
      alert("Key and Value are required!");
      return;
    }

    chrome.runtime.sendMessage(
      { type: "SAVE_MAPPING", key, value },
      (response) => {
        if (response.success) {
          alert("Mapping saved successfully!");
          displayMappings(); // Refresh mappings display
        } else {
          alert("Failed to save the mapping!");
        }
      }
    );
  });
});
