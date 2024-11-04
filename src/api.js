import axios from "axios";

const stocksApiKey = process.env.REACT_APP_AV_API_KEY;
const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

export const fetchStockSymbols = async (keyword, retries = 1, delay = 5000) => {
  const symbolSearchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${stocksApiKey}`;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(symbolSearchUrl);
      
      if (response.data && response.data.bestMatches) {
        return response.data.bestMatches;
      }
      
      console.warn(`Attempt ${attempt} failed: No data received. Retrying...`);
      
    } catch (error) {
      console.error(`Error fetching symbols on attempt ${attempt}:`, error);
      
      if (attempt === retries) {
        throw new Error("Max retries reached. Failed to fetch stock symbols.");
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

export const fetchStockDataIntraDay = async symbol => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${stocksApiKey}`
  try {
    const response = await axios.get(url);
    return response.data["Time Series (5min)"];
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error);
    throw error;
  }
};

export const fetchNews = async symbol => {
  const url = `https://gnews.io/api/v4/search?q=stock%20Market%20${symbol}&lang=en&country=us&max=10&apikey=51698e0737cce86daa18284ab4228ba9`;
  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    console.error("Couldn't get news results", error)
    throw error;
  }
}