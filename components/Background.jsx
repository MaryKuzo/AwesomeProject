import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import background from "../assets/img/registration_bckg.jpg";

export const Background = ({ children }) => {
  return (
    <>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <StatusBar style="auto" />
        {children}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
});