const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Updated query to fetch all games from PostgreSQL
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM games');
        res.status(200).json(result.rows); // Use `rows` for PostgreSQL query results
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ message: 'Error fetching games from the database.' });
    }
});

module.exports = router;