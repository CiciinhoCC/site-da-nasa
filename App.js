import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from "./screens/Home";
import IssLocationScreen from "./screens/IssLocation";
import MeteorScreen from "./screens/Meteors";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Home" component={HomeScreen}/>
        <Stack.Screen name = "ISS" component={IssLocationScreen}/>
        <Stack.Screen name = "Meteoro" component={MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
