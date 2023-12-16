import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
// import HomeScreen from "./src/screens/homescreen";
import CoinDetailsScreen from "./src/screens/coinDetailsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <HomeScreen /> */}
        <CoinDetailsScreen />
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    // backgroundColor: "white",
    paddingTop: 50,
  },
});
