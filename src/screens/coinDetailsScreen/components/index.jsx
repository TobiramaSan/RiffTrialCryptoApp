import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CoinDetailsHeader = ({ small, symbol, market_cap_rank }) => {
  const navigation = useNavigation();

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
      <EvilIcons name="user" size={30} color="white" />
    </View>
  );
};

export default CoinDetailsHeader;
