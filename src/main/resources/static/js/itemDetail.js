document.addEventListener("DOMContentLoaded", async () => {
  // ------------------------------------------------------
  // 1. Get itemId from URL and fetch item details
  // ------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("itemId");
  
  if (!itemId) {
    alert("No itemId provided in the URL.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/items/${encodeURIComponent(itemId)}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const item = await response.json();
    if (!item) {
      alert("No item data returned.");
      return;
    }

    // Populate the page with item details
    document.getElementById("itemName").textContent       = "Item Name: " + (item.itemName || "Unknown");
    document.getElementById("itemType").textContent       = "Item Type: " + (item.itemType || "Unknown");
    document.getElementById("itemStatus").textContent     = "Status: " + (item.status || "Unknown");
    document.getElementById("itemDescription").textContent= "Description: " + (item.description || "Unknown");
    document.getElementById("itemLocation").textContent   = "Location: " + (item.location || "Unknown");
    document.getElementById("itemDate").textContent       = "Reported Date: " + 
      (item.dateReported ? new Date(item.dateReported).toLocaleDateString() : "Unknown");

    // If there's an image in the item, show it
    if (item.itemImage) {
      const mainImage = document.querySelector(".main-image");
      mainImage.src = `data:image/jpeg;base64,${item.itemImage}`;
      document.getElementById("backup1").src = `data:image/jpeg;base64,${item.itemImage}`;
      document.getElementById("backup2").src = `data:image/jpeg;base64,${item.itemImage}`;
    }
  } catch (error) {
    console.error("Error loading item detail:", error);
    alert("Failed to load item detail. Check console for more info.");
  }

  // ------------------------------------------------------
  // 2. Back button event
  // ------------------------------------------------------
  const backButton = document.getElementById("back-btn");
  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.stopPropagation(); 
      window.location.href = "searchItem.html";
    });
  }

  // ------------------------------------------------------
  // 3. Claim modal logic
  // ------------------------------------------------------
  const claimButton    = document.querySelector(".action-btn"); // The "Claim Item" button
  const claimModal     = document.getElementById("claimModal");
  const cancelClaimBtn = document.getElementById("cancelClaimBtn");
  const submitClaimBtn = document.getElementById("submitClaimBtn");

  // Show the modal when "Claim Item" is clicked
  claimButton.addEventListener("click", () => {
    claimModal.style.display = "block";
  });

  // Hide the modal on "Cancel"
  cancelClaimBtn.addEventListener("click", () => {
    claimModal.style.display = "none";
  });

  // Submit the claim (description + optional image)
  submitClaimBtn.addEventListener("click", () => {
    // 1. Gather user input
    const description = document.getElementById("claimDescription").value.trim();
    const imageFile   = document.getElementById("claimImage").files[0];

    // 2. Optionally get the logged-in user's ID (claimerId) from localStorage
    const claimerId = localStorage.getItem("userId") || 1; 
    // If you don't have localStorage, you could also hardcode a number or prompt the user.

    // 3. Ensure we have a description
    if (!description) {
      alert("Please provide a brief description before submitting your claim.");
      return;
    }

    // 4. Construct FormData to send text + image + claimerId
    const formData = new FormData();
    formData.append("itemId", itemId);
    formData.append("claimerId", claimerId);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // 5. POST to /api/claims/:itemId/claim
    fetch(`/api/claims/${encodeURIComponent(itemId)}/claim`, {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Item claim failed");
      }
      return response.text();
    })
    .then(data => {
      alert(data); // e.g. "Claim submitted successfully"
      claimModal.style.display = "none";
      
      // Optionally disable or change the "Claim Item" button
      claimButton.textContent = "Claim Submitted";
      claimButton.disabled = true;
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
  });
});
