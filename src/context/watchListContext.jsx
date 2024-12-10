import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const WatchListContext = createContext();

// Hook to access the context
export const useWatchList = () => useContext(WatchListContext);

// Provider component
const WatchListProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

  // Fetch watchlist data from AsyncStorage
  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      if (jsonValue) {
        setWatchListCoinIds(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error fetching watchlist data:", e);
    }
  };

  // Store a new coin ID in the watchlist
  const storeWatchListCoinId = async (coinId) => {
    try {
      setWatchListCoinIds((prevList) => {
        const newWatchList = [...prevList, coinId];
        AsyncStorage.setItem("@watchlist_coins", JSON.stringify(newWatchList));
        return newWatchList;
      });
    } catch (e) {
      console.error("Error storing coin ID:", e);
    }
  };

  // Remove a coin ID from the watchlist
  const removeWatchListCoinId = async (coinId) => {
    try {
      setWatchListCoinIds((prevList) => {
        const newWatchList = prevList.filter(
          (coinIdValue) => coinIdValue !== coinId
        );
        AsyncStorage.setItem("@watchlist_coins", JSON.stringify(newWatchList));
        return newWatchList;
      });
    } catch (e) {
      console.error("Error removing coin ID:", e);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getWatchListData();
  }, []);

  // Provide context values
  return (
    <WatchListContext.Provider
      value={{
        watchListCoinIds,
        storeWatchListCoinId,
        removeWatchListCoinId,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
