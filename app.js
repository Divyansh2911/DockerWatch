const express = require("express");
const si = require("systeminformation");

const app = express();
const PORT = 8000;

app.get("/metrics", async (req, res) => {
    try {
        // Get CPU load
        const cpuLoad = await si.currentLoad();
        // Get memory info
        const mem = await si.mem();

        // Prepare the metrics data
        const metrics = {
            cpuUsage: cpuLoad.currentLoad.toFixed(2) + "%",
            memoryTotal: (mem.total / (1024 * 1024)).toFixed(2) + " MB",
            memoryAvailable: (mem.available / (1024 * 1024)).toFixed(2) + " MB",
        };

        // Send the metrics as JSON response
        res.json(metrics);
    } catch (err) {
        // Handle errors and respond with a 500 status code
        res.status(500).json({ error: "Error fetching metrics" });
    }
});

app.listen(PORT, () => {
    console.log(`Monitoring app running on port ${PORT}`);
});
