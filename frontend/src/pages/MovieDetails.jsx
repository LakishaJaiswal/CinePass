import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    Link
} from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

const MovieDetails = () => {

    const { id } =
        useParams();

    const [movie, setMovie] =
        useState(null);

    useEffect(() => {

        const fetchMovie =
            async () => {

                try {

                    const response =
                        await api.get(
                            `/api/movies/${id}`
                        );

                    setMovie(
                        response.data
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                }

            };

        fetchMovie();

    }, [id]);

    if (!movie) {

        return (
            <>
                <Navbar />
                <h2>Loading...</h2>
            </>
        );

    }

    return (
        <>
            <Navbar />

            <h1>
                {movie.title}
            </h1>

            <p>
                <strong>
                    Description:
                </strong>{" "}
                {movie.description}
            </p>

            <p>
                <strong>
                    Genre:
                </strong>{" "}
                {movie.genre}
            </p>

            <p>
                <strong>
                    Duration:
                </strong>{" "}
                {movie.duration} mins
            </p>

            <p>
                <strong>
                    Language:
                </strong>{" "}
                {movie.language}
            </p>

            <p>
                <strong>
                    Release Date:
                </strong>{" "}
                {movie.release_date}
            </p>

            <Link to="/booking">
                <button>
                    Book Now
                </button>
            </Link>

        </>
    );
};

export default MovieDetails;
