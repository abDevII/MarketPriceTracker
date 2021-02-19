///////////////////////////////////
// Requirements to use Finnhub API 
// Finnhub API allows us to get real-time quote data for US stocks
const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// Hide the API key
api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
export const finnhubClient = new finnhub.DefaultApi();