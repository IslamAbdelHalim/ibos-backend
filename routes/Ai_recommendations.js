const express = require('express');
const Ai = require('../functions/Ai_recommendation')
const  { groupBySector, market, setupMarket} = require('../functions/fun_investRecommend');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const marketSetup = await setupMarket();
    const ai_response = await Ai(marketSetup);
    //console.log(minMarket)
    res.status(200).json(JSON.stringify(ai_response));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;