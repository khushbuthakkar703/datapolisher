const express = require("express");
const router = express();
const reassignedController = require("../controllers/reassigned");

router.post("/TelephoneNumber", reassignedController.TelephoneNumber)
module.exports = router;