const express = require('express');
const { User } = require('../models/User');
const  { groupBySector, market, setupMarket} = require('../functions/fun_investRecommend');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const marketSetup = await setupMarket();
    const filters = await groupBySector(marketSetup)
    const minMarket = await market(marketSetup)
    //console.log(minMarket)
    res.status(200).json({filters, minMarket});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;