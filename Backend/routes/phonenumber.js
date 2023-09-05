const express = require("express");
const router = express();
const phoneontroller = require("../controllers/phonenumber");

router.post("/uploadcsv", phoneontroller.uploadcsv)
router.post("/numberidentity", phoneontroller.numberidentity)
router.post("/totallength", phoneontroller.phnototallength)
router.post("/deleteduplicate", phoneontroller.deleteduplicate)
router.get("/download", phoneontroller.download)


module.exports = router;