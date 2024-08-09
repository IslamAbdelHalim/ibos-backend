// routes/index.js
const express = require('express');
const router = express.Router();
const registerRouter = require('./auth');
const settingsRouter = require('./settings');

router.use('/', registerRouter);
router.use('/settings', settingsRouter);
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = router;
