import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinItem from "../../components/coinItem";
import { getMarketData } from "../../services/request";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]); //adding  the  to the array of existingCoins and coinData.
    setLoading(false);
  };

  const reFetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem coin={item} />}
      onEndReached={() => fetchCoins(coins.length / 50 + 1)}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={reFetchCoins}
        />
      }
    />
  );
};

export default HomeScreen;
