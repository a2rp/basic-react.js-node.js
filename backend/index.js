require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

app.get("/api/a2rp", async (req, res) => {
    try {
        res.json({ success: true, message: "a2rp: an Ashish Ranjan presentation" });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, console.log(`server listening http://localhost:${PORT}`));

