const express = require('express');
const router = express.Router();
const validateForm = require('../Controllers/validateForm');
const pool = require('../db');
const bcrypt = require('bcrypt');

module.exports.isLogin = async (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user.username });
    } else {
        res.json({ loggedIn: false });
    }
}

module.exports.handleLogin = async(req, res) =>{
    const potentialLogin = await pool.query("SELECT id, username, passhash FROM users u WHERE u.username = $1", [req.body.username]);

    if (potentialLogin.rowCount === 0) {
        res.json({ loggedin: false, status: "Username or password is incorrect" })
    } else {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash);
        if (isSamePass) {
            //login
            req.session.user = {
                username: req.body.username,
                id: potentialLogin.rows[0].id
            };
            return res.json({ loggedIn: true, username: req.body.username });
        } else {
            res.json({ loggedIn: false, status: "Username or password is incorrect" })
        }
    }
}


module.exports.handleRegister = async (req, res) => {
    const existingUser = await pool.query("SELECT username FROM users WHERE username = $1", [req.body.username]);
    if (existingUser.rowCount === 0) {
        //register user
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query("INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING username", [req.body.username, hashedPass]);

        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id
        };
        return res.json({ loggedIn: true, username: req.body.username });
    } else {
        return res.status(400).json({ loggedIn: false, status: "Username already exists" });
    }
}