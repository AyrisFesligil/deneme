// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import GiftFormScreen from './screens/GiftFormScreen';
import GiftResultScreen from './screens/GiftResultScreen';
import GiftHistoryScreen from './screens/GiftHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="GiftForm" component={GiftFormScreen} options={{ title: 'Suggest a Gift' }} />
        <Stack.Screen name="GiftResult" component={GiftResultScreen} options={{ title: 'Suggested Gifts' }} />
        <Stack.Screen name="GiftHistory" component={GiftHistoryScreen} options={{ title: 'Gift History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
