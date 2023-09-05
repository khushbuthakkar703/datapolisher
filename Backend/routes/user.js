const express = require("express");
const router = express();
const userController = require("../controllers/user")

router.post("/login", userController.login)
router.post("/register", userController.register)
router.post("/getuser", userController.getuser)
router.post("/forgotpasswordmail", userController.forgotpasswordmail)
router.post("/confrimcode", userController.confirmcode)
router.post("/forgotusermail", userController.forgotUsernamemail)
router.post("/confrimusercode", userController.confirmusercode)
router.post("/changepassword", userController.changepassword)


module.exports = router;