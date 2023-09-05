const express = require("express");
const router = express();
const companyController = require("../controllers/company");

router.post("/createcompany", companyController.Createcompany)
router.post("/getcountry", companyController.Country)
router.post("/getstate", companyController.state)
router.post("/getcity", companyController.city)




module.exports = router;