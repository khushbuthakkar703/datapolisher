const express = require("express");
const router = express();
const fileuploadcontroller = require("../controllers/fileupload");
const multer = require("multer");
const uploadset = require("../multerfile")
router.post("/createfile", fileuploadcontroller.createfilepath)
router.post("/fileuplaodset", fileuploadcontroller.fileuplaodset)
router.post("/listallfile", fileuploadcontroller.listallfile)
router.post("/deletefile", fileuploadcontroller.deletefile)
router.post("/downloadcontent", fileuploadcontroller.downloadcontent)
router.post('/fileuploadqueue', uploadset.single('image'), fileuploadcontroller.fileuploaddetails);
router.post('/reassignedgenerateupload', fileuploadcontroller.reassignedgenerateupload)

module.exports = router;