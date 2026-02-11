const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    filePath: String,
  }
);

module.exports = mongoose.model("Document", documentSchema);
