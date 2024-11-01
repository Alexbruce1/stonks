import axios from "axios";

const API_KEY = process.env.REACT_APP_AV_API_KEY;

export const fetchStockData = async (functionType, params) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: functionType,
        ...params,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error);
    throw error;
  }
};
