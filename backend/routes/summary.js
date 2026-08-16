const express = require("express");
const router = express.Router();

const summarizeText = require("../services/summarizeText");

// POST /api/summary
router.post("/", async (req, res) => {
    try {
        const { text } = req.body;

        const summary = await summarizeText(text);

        res.json({
            original: text,
            summary: summary
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
});

module.exports = router;