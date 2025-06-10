const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Get all games
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (err) {
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