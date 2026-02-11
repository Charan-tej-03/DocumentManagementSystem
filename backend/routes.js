const router = require("express").Router();

const documentController = require("./controllers/document_controller");

const upload = require("./middleware/upload");

console.log("Controller Check:", documentController.uploadDocument); 
console.log("Upload Middleware Check:", upload.single);

router.post("/documents", upload.single("file"), documentController.uploadDocument);
router.put("/documents/:id", upload.single("file"), documentController.updateDocument);

module.exports = router;