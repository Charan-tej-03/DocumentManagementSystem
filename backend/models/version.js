const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    versionNumber: Number,
    filePath: String,
  }
);

module.exports = mongoose.model("Version", versionSchema);
