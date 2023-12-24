import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchListCoinIds(jsonValue !== null ? JSON.parse(jsonValue) : []); //because  we can only store strings in AsyncStorage
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWatchListData();
  }, []);

  //function to store values
  const storeWatchListCoinId = async (coinId) => {
    //to know  what coin to store, pass in an id parameter
    try {
      const newWatchList = [...watchListCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };

  //function to remove from watchlist
  const removeWatchListCoinId = async (coinId) => {
    //it needs too know the coin to  remove, that's why coinId is passed in  it
    const newWatchList = watchListCoinIds.filter((coinIdValue) => {
      coinIdValue !== coinId;
    });
    const jsonValue = JSON.stringify(newWatchList);
    await AsyncStorage.setItem("@watchlist_coins", jsonValue);
    setWatchListCoinIds(newWatchList);
  };

  return (
    <WatchListContext.Provider
      value={{ watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
