document.addEventListener("DOMContentLoaded", async function () {
    // 1. Check if the user is logged in
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
        // If no user is logged in, redirect 
        window.location.href = "signup.html";
        return;
    }

    // 2. Fetch user data to get userId
    let user;
    try {
        const userRes = await fetch(`http://localhost:8080/api/users/${username}`);
        if (!userRes.ok) {
            throw new Error("User not found");
        }
        user = await userRes.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
        return;
    }

    // 3. Use the userId to fetch the dashboard data
    try {
        const dashboardRes = await fetch(`http://localhost:8080/api/items/dashboard?userId=${user.userId}`);
        if (!dashboardRes.ok) {
            throw new Error("Dashboard data fetch failed");
        }
        const dashboardData = await dashboardRes.json();

        // 4. Update the welcome text
        document.getElementById("title_card").textContent = 
            "Welcome Back, " + (dashboardData.fullName || "");

        // 5. Update the counts 
        //    (If you have <div> id="lostCountNumber">, etc.)
        document.getElementById("lostCount").previousElementSibling.textContent   = dashboardData.lostCount;
        document.getElementById("foundCount").previousElementSibling.textContent  = dashboardData.foundCount;
        document.getElementById("claimedCount").previousElementSibling.textContent= dashboardData.claimedCount;

        // 6. Populate the recent activity table
        const recentTableBody = document.getElementById("recentTableBody");
        recentTableBody.innerHTML = ""; // Clear old rows

        (dashboardData.recentItems || []).forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.itemName}</td>
                <td>${item.itemType}</td>
                <td>${item.dateReported || ""}</td>
                <td>${item.status}</td>
                <td>${item.location || ""}</td>
            `;
            recentTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to load dashboard data.");
    }

    // 7. Logout event
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "signup.html";
    });
});
