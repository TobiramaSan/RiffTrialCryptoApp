import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          backgroundColor: "#121212",
        },
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Navigation />
          {/* <HomeScreen /> */}
          {/* <CoinDetailsScreen /> */}
          <StatusBar style="light" />
        </View>
      </GestureHandlerRootView>
    </NavigationContainer>
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
