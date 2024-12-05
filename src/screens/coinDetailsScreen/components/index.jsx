import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../context/watchListContext";

const CoinDetailsHeader = (props) => {
  const { coinId, small, symbol, market_cap_rank } = props;
  const navigation = useNavigation();

  // console.log(watchListCoinIds);

  const { watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId } =
    useWatchList();

  //check to see if our coin is listed
  const checkToSeeIfCoinIsWatchListed = () => {
    return watchListCoinIds.some((coinIdValue) => coinIdValue === coinId);
  };

  //handling the onPress event on the star icon
  const handleWatchListCoin = () => {
    if (checkToSeeIfCoinIsWatchListed()) {
      return removeWatchListCoinId(coinId);
    }
    return storeWatchListCoinId(coinId);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        <Image source={{ uri: small }} style={styles.image} />
        <Text style={styles.name}>{symbol.toUpperCase()}</Text>
        <View style={styles.rank}>
          <Text style={styles.tile}>#{market_cap_rank}</Text>
        </View>
      </View>
      <AntDesign
        name={checkToSeeIfCoinIsWatchListed() ? "star" : "staro"}
        size={24}
        color={checkToSeeIfCoinIsWatchListed() ? "#d4af37" : "white"}
        onPress={handleWatchListCoin}
      />
    </View>
  );
};

export default CoinDetailsHeader;
