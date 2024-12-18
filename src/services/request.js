import axios from "axios";

export const getDetailedCoinData = async (coinId) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return response.data;
  } catch (e) {
    console.log("getdetailedCoinData", e);
  }
};

export const getCoinMarketChart = async (coinId) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`
    );
    return response.data;
  } catch (e) {
    console.log(e, "getCoinMarketChart");
  }
};

export const getMarketData = async (pageNumber = 1) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h&locale=en`
    );
    return response.data;
  } catch (e) {
    console.log(e, "getMarketData");
  }
};

export const getWatchlistedCoins = async (pageNumber, coinIds) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h&locale=en`
    );
    return response.data;
  } catch (e) {
    console.log(e, "getWatchListCoins");
  }
};
