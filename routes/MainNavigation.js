import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/auth/authSlice";
import { authStateChanged } from "../redux/auth/authOperations";
import Home from "../Screens/Home";
import ButtonGoBack from "../components/ButtonGoBack";


const Stack = createStackNavigator();

export default function MainNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged((user) => {
      if (user) {
        dispatch(updateUser(user));
      } else {
        dispatch(updateUser(null));
      }
    });
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 1,
            boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto_Bold",
            fontSize: 17,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTitleAlign: "center",
          headerLeft: () => <ButtonGoBack />,
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerStyle: {
            backgroundColor: "#FFF",
            borderBottomWidth: 1,
            boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto_Bold",
            fontSize: 17,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTitleAlign: "center",
          headerLeft: () => <ButtonGoBack />,
        }}
      />
    </Stack.Navigator>
  );
}