const express = require("express");
const cors = require("cors");
const {
    createProxyMiddleware
} = require("http-proxy-middleware");

require("dotenv").config();

const app = express();

app.use(cors());

/*
|--------------------------------------------------------------------------
| Auth Service
|--------------------------------------------------------------------------
*/

app.use(
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE,
        changeOrigin: true,
        pathFilter: [
            "/api/auth/**",
            "/api/user/**"
        ]
    })
);

/*
|--------------------------------------------------------------------------
| Movie Service
|--------------------------------------------------------------------------
*/

app.use(
    createProxyMiddleware({
        target: process.env.MOVIE_SERVICE,
        changeOrigin: true,
        pathFilter: [
            "/api/movies/**",
            "/api/theatres/**"
        ]
    })
);

/*
|--------------------------------------------------------------------------
| Booking Service
|--------------------------------------------------------------------------
*/

app.use(
    createProxyMiddleware({
        target: process.env.BOOKING_SERVICE,
        changeOrigin: true,
        pathFilter: [
            "/api/bookings/**"
        ]
    })
);

/*
|--------------------------------------------------------------------------
| Recommendation Service (FastAPI)
|--------------------------------------------------------------------------
|
| Gateway:
|   /api/recommendations/popular
|
| FastAPI:
|   /recommendations/popular
|
*/

app.use(
    createProxyMiddleware({
        target:
            process.env.RECOMMENDATION_SERVICE,
        changeOrigin: true,
        pathFilter: [
            "/api/recommendations/**"
        ],
        pathRewrite: {
            "^/api": ""
        }
    })
);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.json({
        service: "API Gateway",
        status: "running"
    });
});

module.exports = app;
