import axios from "axios";

const apiKey = process.env.REACT_APP_AV_API_KEY;

export const fetchStockSymbols = async keyword => {
  const symbolSearchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`;
  try {
    
    const response = await axios.get(symbolSearchUrl)
    console.log(response.data.bestMatches)
    return response.data.bestMatches;
  } catch (error) {
    console.error("Error fetching symbols: ", error);
    throw error;
  }
};

export const fetchStockDataIntraDay = async symbol => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
  try {
    const response = await axios.get(url);
    return response.data["Time Series (5min)"];
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error);
    throw error;
  }
};
