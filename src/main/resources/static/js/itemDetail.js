document.addEventListener("DOMContentLoaded", async () => {
    // 1. Parse the itemId from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("itemId"); // e.g. "12345"
  
    if (!itemId) {
      alert("No itemId provided in the URL.");
      return;
    }
  
    try {
      // 2. Fetch that item from your backend
      //    e.g. GET /api/items/:itemId or /api/items/{itemId}
      const response = await fetch(`http://localhost:8080/api/items/${encodeURIComponent(itemId)}`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const item = await response.json();
      if (!item) {
        alert("No item data returned.");
        return;
      }
  
      // 3. Populate the page with the item’s details
      document.getElementById("itemId").textContent = item.itemId || "";
      document.getElementById("itemName").textContent = "Item Name: " + item.itemName || "Unknown";
      document.getElementById("itemType").textContent = "Item Type: " + item.itemType || "Unknown";
      document.getElementById("itemStatus").textContent = "Status: " +item.status || "Unknown";
      document.getElementById("itemDescription").textContent = "Description: " + item.description || "Unknown";
      document.getElementById("itemLocation").textContent = "Location: " + item.location || "Unknown";
      document.getElementById("itemDate").textContent = "Reported Date: " + item.dateReported? new Date(item.dateReported).toLocaleDateString(): "Unknown";
    } catch (error) {
      console.error("Error loading item detail:", error);
      alert("Failed to load item detail. Check console for more info.");
    }

    const backButton = document.getElementById("back-btn");
    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevents unwanted event bubbling
            window.location.href = "searchItem.html";
        });
    }

  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const claimButton = document.querySelector(".action-btn");

    claimButton.addEventListener("click", function () {
        const itemId = 1; // Replace with actual item ID dynamically

        fetch(`/api/items/${itemId}/claim`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Item claim failed");
            }
            return response.text();
        })
        .then(data => {
            alert(data); // Show success message
            claimButton.textContent = "Claimed";
            claimButton.disabled = true;
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
    });
});
