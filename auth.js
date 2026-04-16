 const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (String(password).length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ message: "Database error" });
            if (results.length > 0) return res.status(400).json({ message: "Email already exists" });

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                    [name, email, hashedPassword], (err) => {
                        if (err) return res.status(500).json({ message: "Error saving user" });
                        res.status(201).json({ message: "Account created!" });
                    });
            } catch (hashError) {
                res.status(500).json({ message: "Server error" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error during login." });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Send back user data so the frontend can greet them
        res.status(200).json({
            message: "Login successful!",
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
});

module.exports = router;