import "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { Provider} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import MainNavigator from "./routes/MainNavigation";


import { store } from "./redux/store";
import { persistor } from "./redux/store";

//Qwerty12

export default function App() {


  const [fontsLoaded] = useFonts({
    Roboto_Bold: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto_Regular: require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}