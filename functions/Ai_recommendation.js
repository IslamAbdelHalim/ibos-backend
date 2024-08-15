const dotenv = require('dotenv');
dotenv.config();

const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function Ai(companys) {
  const response = await cohere.chat({
    message: `Your name is 'IBOS'. Your task is to analyze the financial stock data of companies that you will receive, and then recommend the top five companies to invest in. 

    THIS IS THE STACK INFO:
    ${JSON.stringify(companys)}

    Please respond with a valid JSON object that includes the top five investment recommendations. Each recommendation should include:
    - "symbol": The stock symbol.
    - "company": The name of the company.
    - "reasons": An array of reasons for the recommendation.

    Format your response like this:
    {
      "top_5_investment_recommendations": [
        {
          "symbol": "STRING",
          "company": "STRING",
          "reasons": [
            "STRING",
            "STRING",
            "STRING"
          ]
        },
        ...
      ]
    }`,
    "response_format": {
        "type": "json_object"
    },
    model: "command-r-plus",
  });

  // Parse the response text into JSON
  let jsonResponse;
  try {
    jsonResponse = JSON.parse(response.text);
  } catch (error) {
    console.error('Failed to parse AI response as JSON:', error);
    throw new Error('Invalid JSON response from AI');
  }

  return jsonResponse;
};

module.exports = { Ai };
