var express = require('express');
var router = express.Router();
const auth = require("../controllers/auth/auth.controller");
const logger = require("../common/log");
const access = require("../controllers/user/user.controller");
const pump = require("../controllers/pump/pump.controller");
const booking = require("../controllers/bookings/bookings.controller");

router.post("/login", access.login, logger.setLog);
router.post(
  "/register",
  access.register,
  logger.setLog
);
router.get("/uploadUserPic", auth.authenticate, access.uploadUserPic);

router.post("/addPump", auth.authenticate, pump.addPump);
router.get("/getPumpNearMe", auth.authenticate, pump.getPumpNearMe);

router.post("/addBooking", auth.authenticate, booking.addBooking);
router.post("/addFillingType", auth.authenticate, booking.addFillingType);
router.get("/getFillingType", auth.authenticate, booking.getFillingType);

router.get("/getBookingListforUser", auth.authenticate, booking.getBookingListforUser);
router.get("/getBookingListforPump", auth.authenticate, booking.getBookingListforPump);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
