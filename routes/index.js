// routes/index.js
const express = require('express');
const router = express.Router();
const registerRouter = require('./auth');
const settingsRouter = require('./settings');
const investRecommand = require('./invest_recommandetions')
const ai_recommend = require('./Ai_recommendations')
const more_investRecommand = require('./filteredInvestment-recommedations')
const homeRouter = require('./home')
const { verifyToken } = require('../middlewares/verifyToken');



router.use('/', registerRouter);
router.use('/settings', settingsRouter);
router.use('/home', homeRouter);
router.use('/investment-recommedations', investRecommand);
router.use('/ai-recommendations', ai_recommend);
router.use('/filteredInvestment-recommedations', more_investRecommand);
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = router;