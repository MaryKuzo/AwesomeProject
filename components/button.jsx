import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Button({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons
        name={icon}
        size={28}
        color={color ? color : "#ffffff"}
        titleStyle={{ color: "#bdbdbd" }}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f1f1f1",
    marginLeft: 10,
  },
});