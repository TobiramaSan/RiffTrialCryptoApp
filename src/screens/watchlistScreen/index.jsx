import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useWatchList } from "../../context/watchListContext";
import CoinItem from "../../components/coinItem";
import { getWatchlistedCoins } from "../../services/request";

const WatchlistScreen = () => {
  const { watchListCoinIds } = useWatchList(); // Get global data

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () =>
    watchListCoinIds.length ? watchListCoinIds.join("%2C") : "";

  const fetchWatchlistedCoins = async () => {
    if (loading) return;

    if (!watchListCoinIds.length) {
      // If no coins are in the watchlist, clear the state
      setCoins([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const watchListedCoinsData = await getWatchlistedCoins(
        1,
        transformCoinIds()
      );
      setCoins(watchListedCoinsData || []); // Fallback to empty array if API returns undefined
    } catch (error) {
      console.error("Error fetching watchlisted coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlistedCoins();
  }, [watchListCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem coin={item} />}
      keyExtractor={(item) => item.id} // Ensure each item has a unique key
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
