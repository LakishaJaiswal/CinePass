const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);

app.get("/", (req, res) => {
    res.json({
        service: "Movie Service",
        status: "running"
    });
});

module.exports = app;
