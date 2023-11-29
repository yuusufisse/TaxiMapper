import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
