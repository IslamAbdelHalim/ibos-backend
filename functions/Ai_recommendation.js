
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


async function Ai(companys) {
  const prompt = `Your name is 'IBOS'.Your task is to analyze the financial \
  stock data of companies that you will receive, and then recommend the \
  top seven companies to invest in.\
  this is the informasion:
  ${JSON.stringify(companys)}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return(text)
}


module.exports = Ai