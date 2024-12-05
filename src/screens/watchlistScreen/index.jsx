import React, { useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useWatchList } from "../../context/watchListContext";
import CoinItem from "../../components/coinItem";
import { getWatchlistedCoins } from "../../services/request";

const WatchlistScreen = () => {
  const { watchListCoinIds } = useWatchList(); //get global data

  const [coins, setcoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchListCoinIds.join("%2C");

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchListedCoinsData = await getWatchlistedCoins(
      1,
      transformCoinIds()
    );
    // setcoins((existingCoins) => [...existingCoins, watchListedCoinsData]);
    setcoins(watchListedCoinsData);
    setLoading(false);
    // console(watchListedCoinsData);
  };

  // useEffect(() => {
  //   fetchWatchlistedCoins();
  // }, []);

  useEffect(() => {
    fetchWatchlistedCoins();
  }, [watchListCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem coin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={fetchWatchlistedCoins}
        />
      }
    />
  );
};

export default WatchlistScreen;
