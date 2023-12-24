import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CoinItem = ({ coin }) => {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = coin;

  const navigation = useNavigation();

  const careColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1_000_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000_000)} T`;
    }
    if (marketCap > 1_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000)} B`;
    }
    if (marketCap > 1_000_000) {
      return `${Math.floor(marketCap / 1_000_000)} M`;
    }
    if (marketCap > 1_000) {
      return `${Math.floor(marketCap / 1_000)} K`;
    }
    return marketCap;
  };

  const changeCaret = price_change_percentage_24h < 0 ? "caretdown" : "caretup";

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailsScreen", { coinId: id })}
    >
      <Image
        source={{
          uri: image,
        }}
        style={styles.coinImage}
      />
      <View>
        <Text style={styles?.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.ranK}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol?.toUpperCase()}</Text>
          <AntDesign
            name={changeCaret}
            size={12}
            color={careColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: careColor }}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: "white" }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};
export default CoinItem;
