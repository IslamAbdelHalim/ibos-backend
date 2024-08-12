const express = require('express');
const { User } = require('../models/User');
const  { groupBySector, market, setupMarket} = require('../functions/fun_investRecommend');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const marketSetup = await setupMarket();
    const minMarket = await market(marketSetup,req.body.filters,req.body.page);
    //console.log(minMarket)
    const { filters, page } = req.body; // Destructure filters and page
  console.log('Filters:', filters);
  console.log('Page:', page);
    res.status(200).json(minMarket);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;