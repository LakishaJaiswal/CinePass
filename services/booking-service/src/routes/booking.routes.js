const express = require("express");

const router =
    express.Router();

const {
    lockSeat,
    confirmBooking,
    cancelBooking,
    getBookings
} =
require(
    "../controllers/booking.controller"
);

router.get(
    "/",
    getBookings
);

router.post(
    "/lock-seat",
    lockSeat
);

router.post(
    "/confirm",
    confirmBooking
);

router.post(
    "/cancel/:id",
    cancelBooking
);

module.exports = router;
