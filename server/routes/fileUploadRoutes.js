const express = require("express");
const router = express.Router();
const fileUploadController = require("../controller/common/fileUploadController");

router.post("/file-upload", (req, res) => {
  fileUploadController.fileUpload(req, res);
});

module.exports = router;
