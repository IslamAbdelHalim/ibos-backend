// routes/index.js
const express = require('express');
const router = express.Router();
const registerRouter = require('./auth');
const settingsRouter = require('./settings');
const homeRouter = require('./home')

router.use('/', registerRouter);
router.use('/settings', settingsRouter);
router.use('/home', homeRouter);
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = router;