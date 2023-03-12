import React, {useState} from 'react';
import 'react-native-gesture-handler';
import LoginRegistration from "./LoginRegistration.js";
import MainContainer from "./MainContainer.js";
// import { NativeRouter, Routes, Route} from 'react-router-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const YourApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrationLogin">
        <Stack.Screen name="RegistrationLogin" component={LoginRegistration}/>
        <Stack.Screen name="Home" component={MainContainer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default YourApp;