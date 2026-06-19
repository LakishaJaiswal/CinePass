import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Recommendations = () => {

    const [movies, setMovies] =
        useState([]);

    useEffect(() => {

        const fetchRecommendations =
            async () => {

                try {

                    const response =
                        await api.get(
                            "/api/recommendations/popular"
                        );

                    setMovies(
                        response.data
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                }

            };

        fetchRecommendations();

    }, []);

    return (
        <>
            <Navbar />

            <h1>
                Recommended Movies
            </h1>

            {
                movies.map(
                    (movie) => (
                        <div
                            key={movie.id}
                            style={{
                                border:
                                    "1px solid #ccc",
                                margin:
                                    "10px",
                                padding:
                                    "10px"
                            }}
                        >
                            <h3>
                                {movie.title}
                            </h3>

                            <p>
                                {movie.genre}
                            </p>
                        </div>
                    )
                )
            }
        </>
    );
};

export default Recommendations;
