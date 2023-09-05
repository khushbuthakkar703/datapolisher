const express = require("express");
const router = express();
const Notificatiioncontroller = require("../controllers/Notification");

router.post("/Notificationlist", Notificatiioncontroller.Notificationlist)
router.post("/Notificationcreate", Notificatiioncontroller.Notificationcreate)
router.post("/Notificationupdate", Notificatiioncontroller.Notificationupdate)
router.post("/Notificationdelete", Notificatiioncontroller.Notificationdelete)
router.post("/NotificationAggregate", Notificatiioncontroller.NotificationAggregate)




module.exports = router;