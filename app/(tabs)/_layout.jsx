import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Shop from "./shop";
import Explore from "./explore";
import Cart from "./cart";
import Account from "./account";
import Favorite from "./favorite";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 50,
          height: 80,
          shadowColor: "#000", // Shadow color
          shadowOffset: { width: 0, height: -5 }, // Shadow offset (top shadow)
          shadowOpacity: 0.1, // Shadow opacity
          shadowRadius: 5, // Shadow blur radius
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Shop":
              iconName = focused ? "storefront" : "storefront-outline";
              break;
            case "Explore":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Cart":
              iconName = focused ? "cart" : "cart-outline";
              break;
            case "Account":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Favorite":
              iconName = focused ? "heart" : "heart-outline";
              break;
            default:
              iconName = "circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#53B175", // Active tab color
        tabBarInactiveTintColor: "#181725", // Inactive tab color
      })}
    >
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
