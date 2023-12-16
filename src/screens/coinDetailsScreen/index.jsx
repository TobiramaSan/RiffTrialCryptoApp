import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import styles from "./styles";
import crypto from "../../../assets/data/crypto.json";
import CoinDetailsHeader from "./components";
import { AntDesign } from "@expo/vector-icons";

import { LineChart } from "react-native-wagmi-charts";

const CoinDetailsScreen = () => {
  const {
    image: { small },
    name,
    prices,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      // current_price: { usd },
      price_change_percentage_24h,
    },
  } = crypto;

  const datum = [
    {
      timestamp: 1638399794129,
      value: 57124.866357580555,
    },

    {
      timestamp: 1638403476369,
      value: 57169.37199381056,
    },

    {
      timestamp: 1638407244512,
      value: 56916.55089897206,
    },
    {
      timestamp: 1638410441521,
      value: 57214.082150451875,
    },
    {
      timestamp: 1638414229015,
      value: 57004.22208925368,
    },
    {
      timestamp: 1638417714496,
      value: 56367.42957147236,
    },
    {
      timestamp: 1638421425604,
      value: 56522.443308392365,
    },
    {
      timestamp: 1638425027112,
      value: 56922.76114582327,
    },
    {
      timestamp: 1638428418970,
      value: 56571.45952071818,
    },
    {
      timestamp: 1638432235967,
      value: 56888.684247225356,
    },
    {
      timestamp: 1638435954706,
      value: 57067.47418828491,
    },
    {
      timestamp: 1638439343039,
      value: 56709.0773641982,
    },
    {
      timestamp: 1638442935772,
      value: 56557.24685535338,
    },
    {
      timestamp: 1638446477740,
      value: 56432.72283091287,
    },
    {
      timestamp: 1638450024595,
      value: 56503.19396231729,
    },
    {
      timestamp: 1638453873126,
      value: 56313.93243198974,
    },
    {
      timestamp: 1638457350240,
      value: 57224.482540373145,
    },
    {
      timestamp: 1638461347302,
      value: 56547.475100623175,
    },
    {
      timestamp: 1638464498024,
      value: 56225.08060672014,
    },
    {
      timestamp: 1638468329477,
      value: 56596.33014616169,
    },
    {
      timestamp: 1638472198746,
      value: 56855.254695044176,
    },
    {
      timestamp: 1638475482827,
      value: 56672.25690242264,
    },
    {
      timestamp: 1638478867637,
      value: 57061.173369713586,
    },
    {
      timestamp: 1638482546642,
      value: 56923.10861267683,
    },
    {
      timestamp: 1638484132000,
      value: 56757.67029705151,
    },
  ];
  const screenWidth = Dimensions.get("window").width;
  const changeCaret = price_change_percentage_24h < 0 ? "caretdown" : "caretup";
  const careColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  const chartColor = current_price.usd > datum[0].value ? "#16c784" : "#ea3943";
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState(current_price.usd.toString());

  const cuurencyFormat = (value) => {
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value)}`;
  };

  const changeCoinValue = useCallback(
    (value) => {
      setCoinValue(value);
      const floatValue = parseFloat(value) || 0;
      setUsdValue(floatValue * current_price.usd);
    },
    [current_price.usd]
  );

  const changeUsdValue = useCallback(
    (value) => {
      setUsdValue(value);
      const floatValue = parseFloat(value) || 0;
      setCoinValue(floatValue / current_price.usd);
    },
    [current_price.usd]
  );

  // useEffect(() => {
  //   const floatValue = parseFloat(coinValue) || 0;
  //   setCoinValue(floatValue / current_price.usd);
  // }, [coinValue, current_price.usd]);

  // useEffect(() => {
  //   const floatValue = parseFloat(usdValue) || 0;
  //   setUsdValue(floatValue * current_price.usd);
  // }, [usdValue, current_price.usd]);

  // const changeCoinValue = (value) => {
  //   setCoinValue(value);
  //   const floatValue = parseFloat(value) || 0;
  //   setUsdValue((floatValue * current_price.usd).toString());
  // };

  // const changeUsdValue = (value) => {
  //   setUsdValue(value);
  //   const floatValue = parseFloat(value) || 0;
  //   setCoinValue(floatValue / current_price.usd);
  // };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider data={datum}>
        <CoinDetailsHeader
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
