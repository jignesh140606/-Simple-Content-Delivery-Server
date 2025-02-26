document.getElementById("fetchLogs").addEventListener("click", async () => {
    try {
        const response = await fetch("/logs");
        const data = await response.json();
        document.getElementById("logOutput").textContent = data.logs.join("\n");
    } catch (error) {
        document.getElementById("logOutput").textContent = "Failed to load logs.";
    }
});