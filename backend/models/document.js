const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    filePath: String,
    version: {type: Number, default: 1},
  }
);

module.exports = mongoose.model("Document", documentSchema);
