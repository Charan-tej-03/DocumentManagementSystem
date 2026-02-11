const Document = require("../models/document");

exports.uploadDocument = async(req, res) => {
    try {
        // 1. Check if the file actually exists
        if (!req.file) {
            return res.status(400).json({ error: "Please upload a file" });
        }

        const document = await Document.create({
            title: req.body.title,
            description: req.body.description,
            filePath: req.file.path // Now this is safe to read
        });

        res.json(document);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};