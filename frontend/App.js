import React, {useState} from 'react';
import 'react-native-gesture-handler';
import Login from "./Login.js";
import MainContainer from "./MainContainer.js";
import Registration from "./Registration.js";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { UserProvider } from './UserProvider.js';
import DetailsScreen from './screens/DetailsScreen.js';

const Stack = createNativeStackNavigator();

const YourApp = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="MainPage" component={MainContainer}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

// export default YourApp
export default YourApp;