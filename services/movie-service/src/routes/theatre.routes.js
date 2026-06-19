const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    createTheatre,
    getTheatres
} = require("../controllers/theatre.controller");

router.post(
    "/",
    authMiddleware,
    createTheatre
);

router.get(
    "/",
    getTheatres
);

module.exports = router;
