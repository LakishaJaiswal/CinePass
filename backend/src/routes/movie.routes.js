const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    createMovie,
    getMovies,
    getMovieById,
    deleteMovie
} = require("../controllers/movie.controller");

router.post("/", authMiddleware, createMovie);

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.delete("/:id",
    authMiddleware,
    deleteMovie
);

module.exports = router;
