const express = require('express');
const router = express.Router();
// const User = require('../models/User'); // Not using DB for admin login in this prototype to avoid complexity if DB is down

// POST /api/users/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple hardcoded check for prototype
    // In production, this should check against the database with hashed passwords
    if (username === 'admin' && password === 'admin123') {
        res.json({
            _id: '1',
            username: 'admin',
            isAdmin: true,
            token: 'dummy-jwt-token-for-prototype'
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = router;
