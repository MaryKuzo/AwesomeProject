import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LoginForm from "../components/LoginForm";
import { Background } from "../components/Background";

export default function LoginScreen() {
  const navigation = useNavigation();

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
       <Background>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
          >
            <View style={styles.thumb}>
              <Text style={styles.textHeader}>Увійти</Text>

              <LoginForm />

              <View style={styles.textDiv}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={[styles.textBasic, styles.textDesc]}>
                    Немає акаунту?
                    <Text style={styles.textReg}> Зареєструватися</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
          </Background>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontFamily: "Roboto_Bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 22,
  },
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
  textDiv: {
    marginTop: 10,
  },
});