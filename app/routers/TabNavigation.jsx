import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FavoriteScreen,
  HomeScreen,
  PaymentScreen,
  QRCodeScreen,
} from "../screens";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="scan"
        component={QRCodeScreen}
        options={{
          tabBarLabel: "Scan",
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorite",
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
