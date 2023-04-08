import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import PostScreen from './screens/PostScreen';
import SettingsScreen from './screens/SettingsScreen';
import EachScreen from './screens/EachScreen';

//Screen names
const homeName = "Home";
const detailsName = "Details";
const postName = "Post";
const settingsName = "Settings";
const eachName = "Each"


const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === postName) {
              iconName = focused ? 'post' : 'post-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0B3D91',
          inactiveTintColor: '#646464',
          labelStyle: { paddingBottom: 5, fontSize: 12, fontWeight: 'bold' },
          style: { backgroundColor: '#FFFFFF', height: 80, borderTopWidth: 1, borderTopColor: '#D4D4D4', paddingTop: 10 }
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        {/* <Tab.Screen name={detailsName} component={DetailsScreen} /> */}
        <Tab.Screen name={postName} component={PostScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />


      </Tab.Navigator>
  );
}

export default MainContainer;