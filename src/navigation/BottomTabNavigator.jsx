import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "../screens/homescreen/index";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Watchlist from "../screens/watchlistScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home" //to show the first route
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "#181818",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Watchlist"
        component={Watchlist}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="md-star" size={focused ? 30 : 24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
