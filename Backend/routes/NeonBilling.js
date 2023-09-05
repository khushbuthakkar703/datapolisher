const express = require("express");
const router = express();
const Neobilling = require("../controllers/NeonBilling");

router.post("/NeonToken", Neobilling.NeonToken)
router.post("/NeonRefreshToken", Neobilling.NeonRefreshToken)
router.post("/GetAllAccount", Neobilling.GetAllAccount)
router.post("/GetAllInvoice", Neobilling.GetAllInvoice)
router.post("/GetAllPayment", Neobilling.GetAllPayment)
router.post("/GetAllSubscription", Neobilling.GetAllSubscription)
router.post("/GetAllPaymentMethodProfile", Neobilling.GetAllPaymentMethodProfile)

module.exports = router;