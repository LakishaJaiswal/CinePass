const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Health Check
app.get("/", (req, res) => {
    res.json({
        service: "Auth Service",
        status: "running"
    });
});

module.exports = app;
