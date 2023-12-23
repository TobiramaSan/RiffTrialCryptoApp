import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinItem from "../../components/coinItem";
import { getMarketData } from "../../services/request";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
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
      renderItem={({ item }) => (
        <CoinItem
          coin={item}
          refreshControl={
            <RefreshControl refreshing={loading} tintColor="white" />
          }
        />
      )}
    />
  );
};

export default HomeScreen;
