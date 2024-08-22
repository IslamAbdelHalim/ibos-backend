const express = require('express');
const { User } = require('../models/User');
const  { groupBySector, market, setupMarket} = require('../functions/fun_investRecommend');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const marketSetup = await setupMarket();
    const minMarket = await market(marketSetup, req.body.filters, req.body.page, req.body.budget);

    // Destructure filters and page
    const { filters, page, budget } = req.body; 
    console.log('Filters:', filters);
    console.log('Page:', page);
    console.log('budget:', budget);

    // Respond with success status, message, and the market data
    res.status(200).json({
      status: "success",
      message: "Market data fetched successfully",
      data: minMarket
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: "error",
      message: 'Internal Server Error'
    });
  }
});



module.exports = router;