import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
// import crypto from "../../../assets/data/crypto.json";
import CoinDetailsHeader from "./components";
import { AntDesign } from "@expo/vector-icons";
import { LineChart } from "react-native-wagmi-charts";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
} from "../../services/request";

const CoinDetailsScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);

  const [loading, setLoading] = useState(false);

  // const [truePrice, setTruePrice] = useState();

  const arrayOfArraysToObjects = (arrayOfArrays) => {
    return arrayOfArrays.map((arr) => ({ timestamp: arr[0], value: arr[1] }));
  };

  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  console.log(coinId);

  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    const fetchedCoinMarketChart = await getCoinMarketChart(coinId);
    setCoin(fetchedCoinData);
    setCoinMarketData(fetchedCoinMarketChart);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  // make fetch on render
  useEffect(() => {
    fetchCoinData();
  }, []);

  // check to see if the data has been  fetched
  if (loading || !coin || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }

  const changeCoinValue = (value) => {
    setCoinValue(value);
    setUsdValue((parseFloat(value) * current_price.usd).toFixed(2));
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    setCoinValue((parseFloat(value) / current_price.usd).toFixed(2));
  };

  const changeCaret = price_change_percentage_24h < 0 ? "caretdown" : "caretup";

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData;

  const truePrice = arrayOfArraysToObjects(prices);
  const careColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  const chartColor =
    current_price.usd > truePrice[0].value ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width;

  const cuurencyFormat = (value) => {
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value)}`;
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider data={truePrice}>
        <CoinDetailsHeader
          coinId={id}
          small={small}
          symbol={symbol}
          market_cap_rank={market_cap_rank}
        />
        <View style={styles.InnerContainer}>
          <View>
            <Text style={styles.containerTextName}>{name}</Text>
            <LineChart.PriceText
              format={({ value }) => {
                "worklet";
                const formattedPrice = cuurencyFormat(value);
                return `${formattedPrice} `;
              }}
              style={styles.containerTextUsd}
            />
          </View>
          <View
            style={[styles.priceChangeCont, { backgroundColor: careColor }]}
          >
            <AntDesign
              name={changeCaret}
              size={12}
              color="white"
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.containerTextName}>
              {price_change_percentage_24h.toFixed(2)}
            </Text>
          </View>
        </View>

        <LineChart height={screenWidth / 2}>
          <LineChart.Path color={chartColor}>
            <LineChart.Gradient />
          </LineChart.Path>
          <LineChart.CursorCrosshair></LineChart.CursorCrosshair>
        </LineChart>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={styles.textInput}>{symbol.toUpperCase()}</Text>
            <TextInput
              style={styles.input}
              value={coinValue.toString()}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={styles.textInput}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue.toString()}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailsScreen;
