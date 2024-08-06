const express = require('express');
const router = express.Router();
const registerRouter = require('./register');


router.post('/register', registerRouter);

module.exports = router;
