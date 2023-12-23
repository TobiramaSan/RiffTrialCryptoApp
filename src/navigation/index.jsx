import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetailsScreen from "../screens/coinDetailsScreen";
// import HomeScreen from "../screens/homescreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={"Root"} component={BottomTabNavigator} />
      <Stack.Screen name={"CoinDetailsScreen"} component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
