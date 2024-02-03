const express = require('express');
const router = express.Router();
const validateForm = require('../Controllers/validateForm');
const pool = require('../db');
const bcrypt = require('bcrypt');
const { isLogin, handleLogin, handleRegister } = require('../Controllers/authControllers');
const { rateLimiter } = require('../Controllers/rateLimiter');

router.route('/register')
    .post(validateForm,rateLimiter, handleRegister)

router.route("/login")
    .get(isLogin)
    .post(validateForm,rateLimiter, handleLogin)

module.exports = router;

