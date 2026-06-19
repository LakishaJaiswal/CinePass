import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import Booking from "../pages/Booking";
import Recommendations from "../pages/Recommendations";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/movies"
                    element={<Movies />}
                />

                <Route
                    path="/movies/:id"
                    element={<MovieDetails />}
                />

                <Route
                    path="/booking"
                    element={<Booking />}
                />

                <Route
                    path="/recommendations"
                    element={<Recommendations />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
