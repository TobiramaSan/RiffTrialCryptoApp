import React, { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinItem from "../../components/coinItem";
import { getMarketData } from "../../services/request";
import { debounce } from "lodash";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) return;
    setLoading(true);
    try {
      const coinsData = await getMarketData(pageNumber);
      setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reFetchCoins = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const coinsData = await getMarketData();
      setCoins(coinsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchedCoins = useCallback(
    debounce((pageNumber) => {
      fetchCoins(pageNumber);
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchedCoins.cancel && debouncedFetchedCoins.cancel();
    };
  }, [debouncedFetchedCoins]);

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem coin={item} />}
      onEndReached={() => {
        if (!loading) {
          debouncedFetchedCoins(coins.length / 50 + 1);
        }
      }}
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
