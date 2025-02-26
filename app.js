const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const logFilePath = path.join(__dirname, "logs", "visits.log");
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

app.use(express.static(path.join(__dirname, "public")));

// Middleware to log user visits
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip} - URL: ${req.originalUrl}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error("Failed to write log:", err);
    });
    next();
});

// API endpoint to fetch logs
app.get("/logs", (req, res) => {
    fs.readFile(logFilePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Unable to read logs" });
        res.json({ logs: data.split("\n").filter(Boolean) });
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));