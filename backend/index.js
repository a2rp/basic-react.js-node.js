require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 1198;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.disable("x-powered-by");
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Log every completed request so the method, URL, status, and timing are visible.
app.use((req, res, next) => {
    const startedAt = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - startedAt;
        console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    });

    next();
});

const sendResponse = (res, statusCode, apiUrl, body) => {
    // Keep apiUrl first in every JSON response so clients can identify the endpoint.
    res.status(statusCode).json({ apiUrl, ...body });
};

app.get("/", (req, res) => {
    sendResponse(res, 200, "/", {
        success: true,
        message: "React and Node.js demo API is running",
    });
});

app.get("/health", (req, res) => {
    sendResponse(res, 200, "/health", {
        success: true,
        status: "ok",
    });
});

app.get("/api/a2rp", (req, res) => {
    sendResponse(res, 200, "/api/a2rp", {
        success: true,
        message: "a2rp: an Ashish Ranjan presentation",
    });
});

// Return a consistent JSON response when a client calls an unknown route.
app.use((req, res) => {
    sendResponse(res, 404, req.originalUrl, {
        success: false,
        message: "Route not found",
    });
});

// Keep unexpected errors readable for API clients without exposing internals.
app.use((error, req, res, next) => {
    console.error("[API] Request failed:", error.message);

    if (res.headersSent) {
        return next(error);
    }

    sendResponse(res, 500, req.originalUrl, {
        success: false,
        message: "Internal server error",
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
