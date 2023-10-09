import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import RegistrationForm from "../components/RegistrationForm";


export default function RegistrationScreen() {

  const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);


  const handleRegistrationSuccess = (userData) => {
    navigation.navigate("Posts", { userData });
  };
  
  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={-145}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/img/registration_bckg.jpg")}
      >
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
            <View style={styles.textDiv}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 45,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  
  errorMessage: {
    color: "#FF6C00",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
})