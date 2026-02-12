const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    filePath: String,
    version: {type: Number, default: 1},
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    permissions: {
      view: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
      edit: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
    }
  }
);

module.exports = mongoose.model("Document", documentSchema);
