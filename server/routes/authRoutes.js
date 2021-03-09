const express = require('express');
const USER = require('../controllers/authController');

const router = express.Router();

router.post('/register', USER.register);
router.post('/login', USER.login);
router.post('/logout', USER.logout);
router.post('/refresh_token', USER.generateAccessToken);

module.exports = router;
