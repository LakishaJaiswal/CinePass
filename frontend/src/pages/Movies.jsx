import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Movies = () => {

    const [movies, setMovies] =
        useState([]);

    useEffect(() => {

        const fetchMovies =
            async () => {

                try {

                    const response =
                        await api.get(
                            "/api/movies"
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

        fetchMovies();

    }, []);

    return (
        <>
            <Navbar />

            <h1>Movies</h1>

            {
                movies.map(
                    (movie) => (
                        <div
                            key={movie.id}
                            style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "10px",
                                margin:
                                    "10px"
                            }}
                        >
<h3>
    <Link
        to={`/movies/${movie.id}`}
    >
        {movie.title}
    </Link>
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

export default Movies;
