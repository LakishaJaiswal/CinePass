const pool = require("../config/db");

exports.createMovie = async (req, res) => {
    try {
        const {
            title,
            description,
            duration,
            language,
            genre,
            release_date
        } = req.body;

        const result = await pool.query(
            `INSERT INTO movies
            (title,description,duration,language,genre,release_date)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [
                title,
                description,
                duration,
                language,
                genre,
                release_date
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.getMovies = async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM movies ORDER BY id"
    );

    res.json(result.rows);
};

exports.getMovieById = async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM movies WHERE id=$1",
        [req.params.id]
    );

    res.json(result.rows[0]);
};

exports.deleteMovie = async (req, res) => {
    await pool.query(
        "DELETE FROM movies WHERE id=$1",
        [req.params.id]
    );

    res.json({
        message: "Movie deleted"
    });
};
