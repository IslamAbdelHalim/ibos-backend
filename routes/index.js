const express = require('express');
const router = express.Router();
const registerRouter = require('./register');
const getUserData = require('./settings')

router.post('/register', registerRouter);
router.get('/settings', getUserData);

module.exports = router;