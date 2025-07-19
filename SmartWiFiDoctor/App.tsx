import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import NetworkScanScreen from './src/screens/NetworkScanScreen';
import DeviceManagerScreen from './src/screens/DeviceManagerScreen';
import DeadZoneFinderScreen from './src/screens/DeadZoneFinderScreen';
import TroubleshootingScreen from './src/screens/TroubleshootingScreen';
import { colors } from './src/constants/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Scan') {
              iconName = focused ? 'wifi' : 'wifi-outline';
            } else if (route.name === 'Devices') {
              iconName = focused ? 'phone-portrait' : 'phone-portrait-outline';
            } else if (route.name === 'Dead Zones') {
              iconName = focused ? 'location' : 'location-outline';
            } else if (route.name === 'Help') {
              iconName = focused ? 'help-circle' : 'help-circle-outline';
            } else {
              iconName = 'home-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.lightGray,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: colors.white,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightGray,
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: colors.dark,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Wi-Fi Doctor' }} />
        <Tab.Screen name="Scan" component={NetworkScanScreen} options={{ title: 'Network Scan' }} />
        <Tab.Screen name="Devices" component={DeviceManagerScreen} options={{ title: 'Devices' }} />
        <Tab.Screen name="Dead Zones" component={DeadZoneFinderScreen} options={{ title: 'Dead Zones' }} />
        <Tab.Screen name="Help" component={TroubleshootingScreen} options={{ title: 'Troubleshooting' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}