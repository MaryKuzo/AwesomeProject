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
import { Ionicons } from "@expo/vector-icons";
import RegistrationForm from "../components/RegistrationForm";
import { Background } from "../components/Background";

export default function RegistrationScreen() {
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
              <View style={styles.avatar}>
                <Ionicons
                  name="add-circle-outline"
                  size={35}
                  style={styles.iconAdd}
                />
              </View>
              <Text style={styles.textHeader}>Реєстрація</Text>

              <RegistrationForm />

              <View style={styles.textDiv}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={[styles.textBasic, styles.textDesc]}>
                    Вже є акаунт?
                    <Text style={styles.textReg}> Увійти</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Background>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  iconAdd: {
    color: "#FF6C00",
    position: "absolute",
    bottom: 12,
    right: -18,
  },
  thumb: {
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  textHeader: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    marginTop: 72,
  },
  textBasic: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textDesc: {
    color: "#1B4371",
  },
  textReg: {
    marginLeft: 4,
  },
  textDiv: {
    marginTop: 10,
  },
});