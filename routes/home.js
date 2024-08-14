const express = require('express');
const router = express.Router();
const {User, validateRegister, personalInfoValidate, validateFinancialInfo, validateLoginUser} = require('../models/User');
const { verifyToken } = require('../middlewares/verifyToken');

const companys = ["AAPL", "AMZN", "META"];
/**
 * Fetches the current price of gold from the API Ninjas service.
 *
 * This function sends a GET request to the "https://api.api-ninjas.com/v1/goldprice" endpoint
 * with an API key provided in the headers for authentication. Upon receiving a response,
 * it extracts the gold price from the response data, constructs an object with the gold price,
 * and logs the result.
 *
 * @returns {Promise<string>} A JSON string representing the gold price and currency.
 */
const goldMarket = async () =>{
  var myHeaders = new Headers();
  myHeaders={'X-Api-Key': 'KDlPtNi0ORK5he0Q8bqW3Q==wBGg31FiAV207HMK'}
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const response = await fetch("https://api.api-ninjas.com/v1/goldprice",requestOptions);
  const result = await response.json(); 
  const goldPrice = {
    name: "GOLD.",
    price: result.price,
    currency:"USD"}
  console.log(`return: ${JSON.stringify(goldPrice)}`);
  return (goldPrice);
}


/**
 * Helper function to get a date string in YYYY-MM-DD format.
 * @param {Date} date - The date object to format.
 * @returns {string} - The formatted date string.
 */
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};
/**
 * Fetches the gold price for a specific date from the Metal Price API.
 * @param {string} date - The date in YYYY-MM-DD format.
 * @returns {Promise<Object>} - An object representing the gold price and currency for that date.
 */
/**
 * Fetches the gold price for a specific date from the Metal Price API.
 * @param {string} date - The date in YYYY-MM-DD format.
 * @returns {Promise<Object>} - An object representing the gold price and currency for that date.
 */
const fetchGoldPriceForDate = async (date) => {
  const url = `https://api.metalpriceapi.com/v1/${date}?api_key=3796f9c30ab58bf261c25cdef6df5a09&base=USD&currencies=XAU`;

  const response = await fetch(url);
  const result = await response.json();

  if (result.success === false) {
      throw new Error(result.message || `Failed to fetch gold price for date ${date}`);
  }

  return {
      date,
      price: result.rates.USDXAU,
      currency: "USD"
  };
};


/**
 * Fetches the gold prices for the last 15 days from the Metal Price API.
 * @returns {Promise<Array<Object>>} - An array of objects representing the gold prices and dates.
 */
const goldHistory = async () => {
  const today = new Date();
  const promises = [];

  for (let i = 1; i <= 15; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = formatDate(date);
      promises.push(fetchGoldPriceForDate(formattedDate));
  }

  // Wait for all the fetches to complete
  const results = await Promise.all(promises);
  return results;
};

/**
 * Fetches the current stock price for a given company from the API Ninjas service.
 *
 * This function sends a GET request to the "https://api.api-ninjas.com/v1/stockprice" endpoint
 * with the company's ticker symbol as a query parameter and an API key in the headers for authentication.
 * Upon receiving a response, it extracts the stock price and company name, constructs an object with
 * these details, and logs the result.
 *
 * @param {string} symbol - The stock ticker symbol of the company (e.g., "AAPL" for Apple).
 * @returns {Promise<string>} A JSON string representing the company's name, stock price, and currency.
 */
const Market = async (symbol) => {
  const apiKey = '56d3dea99c42729404922b7ed7c54b19';
  const response = await fetch(`https://fmpcloud.io/api/v3/quote/${symbol}?apikey=${apiKey}`);
  const result = await response.json();

  // Assuming result is an array and the first element contains the needed data
  return {
      name: result[0].name || symbol,
      price: result[0].price,
      currency: "USD"
  };
};

router.get('/',verifyToken, async (req, res) => {
  try {
      //const gold = await goldMarket();
      const aapl = await Market("AAPL");
      const amzn = await Market("AMZN");
      const meta = await Market("META");
      //const goldhistory = await goldHistory();
      const userId = req.user.id;
      console.log(userId);
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      // Construct the response object
      const response = {
          0: {
            name: user.fullName,
              items: {
        //          gold,
                  user: user.name,
                  aapl,
                  amzn,
                  meta
              },
          //    gold_history: goldhistory
          }
      };

      res.json(response);
  } catch (error) {
      console.error('Error fetching market data:', error);
      res.status(500).json({ error: 'Failed to fetch market data' });
  }
});


module.exports = router;