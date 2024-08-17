const express = require('express');
const { Ai } = require('../functions/Ai_recommendation');
const { groupBySector, market, setupMarket } = require('../functions/fun_investRecommend');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Setup the market with a limit of 20
    const marketSetup = await setupMarket(20);

    // Call the AI function with the market setup
    const ai_response = await Ai(marketSetup);

    // Return success response with AI data
    res.status(200).json({
      status: 'success',
      message: 'AI recommendation generated successfully',
      data: ai_response
    });
  } catch (error) {
    console.error('Error:', error);

    // Return error response with status and message
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred. Please try again later.',
      error: error.message
    });
  }
});

module.exports = router;
