const pool = require("../config/db");

exports.createTheatre = async (req, res) => {
    try {
        const { name, city, address } = req.body;

        const result = await pool.query(
            `INSERT INTO theatres
            (name, city, address)
            VALUES($1,$2,$3)
            RETURNING *`,
            [name, city, address]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.getTheatres = async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM theatres ORDER BY id"
    );

    res.json(result.rows);
};
