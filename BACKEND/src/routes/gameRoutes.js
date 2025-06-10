const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Get all games with associated tags
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                g.game_id,
                g.name,
                g.type AS genre, -- Aliamos 'type' a 'genre' para que coincida con el frontend
                g.rating,
                g.price,
                g.popularity,
                g.release_year,
                g.thumbnail_image, -- Asegúrate de que esta sea la columna correcta para la imagen
                g.developer,
                g.description,
                g.release_date,
                -- Agregamos las etiquetas (tags) como un array JSON
                COALESCE(
                    JSON_AGG(l.label_name) FILTER (WHERE l.label_name IS NOT NULL),
                    '[]'
                ) AS tags
            FROM
                games g
            LEFT JOIN
                game_labels gl ON g.game_id = gl.game_id
            LEFT JOIN
                labels l ON gl.label_id = l.label_id
            GROUP BY
                g.game_id, g.name, g.type, g.rating, g.price, g.popularity, g.release_year,
                g.thumbnail_image, g.developer, g.description, g.release_date
            ORDER BY
                g.game_id;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching games with tags:', err); // Agregamos un log para depuración
        res.status(500).json({ error: 'Error fetching games' });
    }
});

// Get games for a specific user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            `SELECT g.* FROM games g
             JOIN game_owners go ON g.game_id = go.game_id
             WHERE go.user_id = $1`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user games' });
    }
});

// Add a game to a user's library
router.post('/user/:userId/add', async (req, res) => {
    const { userId } = req.params;
    const { game_id } = req.body;
    try {
        await pool.query(
            'INSERT INTO game_owners (game_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [game_id, userId]
        );
        res.json({ message: 'Game added to user library' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding game to user library' });
    }
});

// Remove a game from a user's library
router.post('/user/:userId/remove', async (req, res) => {
    const { userId } = req.params;
    const { game_id } = req.body;
    try {
        await pool.query(
            'DELETE FROM game_owners WHERE game_id = $1 AND user_id = $2',
            [game_id, userId]
        );
        res.json({ message: 'Game removed from user library' });
    } catch (err) {
        res.status(500).json({ error: 'Error removing game from user library' });
    }
});

module.exports = router;