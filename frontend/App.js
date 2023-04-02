import React, {useState} from 'react';
import 'react-native-gesture-handler';
import LoginRegistration from "./LoginRegistration.js";
import MainContainer from "./MainContainer.js";
import Registration from "./Registration.js";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { UserProvider } from './UserProvider.js';

const Stack = createNativeStackNavigator();

const YourApp = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrationLogin">
        <Stack.Screen name="RegistrationLogin" component={LoginRegistration}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="MainPage" component={MainContainer}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

// export default YourApp
export default YourApp;