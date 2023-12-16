import react from "react";
import { FlatList } from "react-native";
import CoinItem from "../../components/coinItem";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";

const HomeScreen = () => {
  return (
    <FlatList
      data={cryptocurrencies}
      renderItem={({ item }) => <CoinItem coin={item} />}
    />
  );
};

export default HomeScreen;
