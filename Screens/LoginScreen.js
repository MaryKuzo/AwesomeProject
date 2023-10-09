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
import LoginForm from "../components/LoginForm";



export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const navigation = useNavigation();


  
  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={styles.container}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/img/registration_bckg.jpg")}
        >
          <View style={styles.formContainer}>
              <LoginForm />
              <View style={styles.textDiv}>
                <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                  <Text style={styles.textInfoLink}>
                    Немає акаунту?
                    <Text style={styles.textInfoLink}> Зареєструватися</Text>
                  </Text>
                </TouchableOpacity>
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
    paddingTop: 32,
    paddingBottom: 111,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
  },  
  thumb: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  textHeader: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto_Bold",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 33,}
    ,
  textBasic: {
    fontFamily: "Roboto_Regular",
    fontSize: 16,
  },
  inputFirst: {
    marginTop: 0,
  },
  textDesc: {
    color: "#1B4371",
  },
  textReg: {
    textDecorationLine: "underline",
    marginLeft: 10,
  },
  textInfoLink: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textDecorationLine: "underline",
    textDecorationColor: "#1B4371",
  },
  textDiv: {
    marginTop: 10,
  },
});