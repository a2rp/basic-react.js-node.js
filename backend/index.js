require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT === undefined ? 1198 : Number(process.env.PORT);
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
}

app.disable("x-powered-by");

// Log every completed request so the method, URL, status, and timing are visible.
app.use((req, res, next) => {
    const startedAt = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - startedAt;
        console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    });

    next();
});

app.use(cors({
    origin(origin, callback) {
        const isAllowed = !origin || CLIENT_ORIGINS.includes("*") || CLIENT_ORIGINS.includes(origin);
        callback(null, isAllowed);
    },
}));
app.use(express.json({ limit: "16kb" }));

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
    sendResponse(res, 404, req.path, {
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

    const statusCode = error.type === "entity.parse.failed"
        ? 400
        : error.type === "entity.too.large"
            ? 413
            : 500;
    const message = statusCode === 400
        ? "Invalid JSON body"
        : statusCode === 413
            ? "Request body too large"
            : "Internal server error";

    sendResponse(res, statusCode, req.path, {
        success: false,
        message,
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
