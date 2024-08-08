

const companys = ["AAPL", "MSFT", "AMZN", "META"];
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
  const aaplPrice = {
    name: "GOLD.",
    price: result.price,
    currency:"USD"}
  console.log(`return: ${JSON.stringify(aaplPrice)}`);
  return JSON.stringify(aaplPrice);
}

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
const Market = async (symbol)=>{
  var myHeaders = new Headers();
  myHeaders={'X-Api-Key': 'KDlPtNi0ORK5he0Q8bqW3Q==wBGg31FiAV207HMK'}
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://api.api-ninjas.com/v1/stockprice?ticker=${symbol}`, requestOptions);
  const result = await response.json(); 
  const aaplPrice = {
    name: result.name,
    price: result.price,
    currency:"USD"}
  console.log(`return: ${JSON.stringify(aaplPrice)}`);
  return JSON.stringify(aaplPrice);
}


goldMarket();
Market(companys[3]);