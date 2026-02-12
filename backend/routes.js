const router = require("express").Router();

const documentController = require("./controllers/document_controller");
const authController = require("./controllers/auth_controller");
const role = require("./middleware/role")
const auth = require("./middleware/authentication")

const upload = require("./middleware/upload");

console.log("Controller Check:", documentController.uploadDocument); 
console.log("Upload Middleware Check:", upload.single);

// Document routes
router.post("/documents", auth, role("admin", "editor"), upload.single("file"), documentController.uploadDocument);
router.put("/documents/:id", auth, role("admin", "editor"), upload.single("file"), documentController.updateDocument);
router.get("/", auth, documentController.getDocuments)

// Auth routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

module.exports = router;