const fs = require("fs").promises;
const path = require("path");

const Document = require("../models/document");
const Version = require("../models/version")

exports.uploadDocument = async(req, res) => {
    try{
        if(!req.file) return res.status(400).json({ error: "Please upload a file" });

        const document = await Document.create({
            title: req.body.title,
            description: req.body.description,
            filePath: req.file.path,
            uploadedBy: req.user.id,
            permissions: {view: [req.user.id], edit: [req.user.id]}
        });

        res.json(document);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.updateDocument = async (req, res) => {
  try{
    const document = await Document.findById(req.params.id);

    if(!document) return res.status(404).json({ message: "Document not found" });

    const currentPath = document.filePath;
    const versionsDir = path.join("uploads", "older_versions");

    await fs.mkdir(versionsDir, { recursive: true });

    const fileName = path.basename(currentPath);

    const newVersionPath = path.join(
      versionsDir,
      `v${document.version}_${fileName}`
    );

    await fs.rename(currentPath, newVersionPath);

    await Version.create({
      documentId: document._id,
      versionNumber: document.version,
      filePath: newVersionPath,
    });

    document.filePath = req.file.path;
    document.version += 1;

    await document.save();

    res.json(document);
  }catch (error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDocuments = async(req, res) => {
  const search = req.query;

  const query = search
    ? {title: {$regex: search, $options: "i"}}
    : {};

  const documents = await Document.find(query).populate("uploadedBy", "name");
  res.json(documents);
};