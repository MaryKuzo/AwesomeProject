import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import  LoginScreen  from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import Home from './Screens/Home'; 
import PostsScreen from './Screens/PostsScreen';

const Stack = createStackNavigator();


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); 

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto_Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto_Bold': require('./assets/fonts/Roboto-Medium.ttf'),
      });
      setFontsLoaded(true); 
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Posts" component={PostsScreen} />
       
    </Stack.Navigator>
  </NavigationContainer>
  );
}
