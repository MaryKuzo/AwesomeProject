import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.text}>Публікації</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={styles.iconContainer}>
            <Ionicons name="ios-exit-outline" size={24} color="#bdbdbd" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingHorizontal: 10,
  },

  text: {
    fontFamily: "Roboto_Bold",
    fontSize: 17,
    color: "#212121",
    textAlign: "center",
    paddingBottom: 11,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: -36,
  },
});