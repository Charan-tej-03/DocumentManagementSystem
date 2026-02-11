const fs = require("fs").promises;
const path = require("path");

const Document = require("../models/document");
const Version = require("../models/version")

exports.uploadDocument = async(req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({ error: "Please upload a file" });
        }

        const document = await Document.create({
            title: req.body.title,
            description: req.body.description,
            filePath: req.file.path
        });

        res.json(document);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document)
      return res.status(404).json({ message: "Document not found" });

    const currentPath = document.filePath;
    const versionsDir = path.join("uploads", "older_versions");

    // Ensure versions folder exists
    await fs.mkdir(versionsDir, { recursive: true });

    const fileName = path.basename(currentPath);

    const newVersionPath = path.join(
      versionsDir,
      `v${document.version}_${fileName}`
    );

    // Move old file safely
    await fs.rename(currentPath, newVersionPath);

    // Save metadata
    await Version.create({
      documentId: document._id,
      versionNumber: document.version,
      filePath: newVersionPath,
    });

    // Update to new file (already saved in /current by multer)
    document.filePath = req.file.path;
    document.version += 1;

    await document.save();

    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
