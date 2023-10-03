import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";


const PostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const photo = route.params?.photo;
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.textHeader}>Публікації</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={styles.iconContainer}>
            <Ionicons name="ios-exit-outline" size={24} color="#bdbdbd" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.user}>
          <View style={styles.avatar}>
            <Image
              source={require("../assets/img/avatar.jpg")}
              style={{ width: 60, height: 60, borderRadius: 16 }}
            />
          </View>
          <View style={styles.textUserContainer}>
            <Text style={styles.textName}>Natalia Romanova</Text>

            <Text style={styles.textЕmail}>email@example.com</Text>
          </View>
        </View>
        {photo && photo.uri ? (
          <>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: "100%", height: 240 }}
            />
            <Text style={styles.text}>{photo.photoName}</Text>
            <View style={styles.description}>
              <TouchableOpacity onPress={() => navigation.navigate("Comments", { photo })}>
                <View style={styles.iconComments}>
                  <Ionicons
                    name="ios-chatbubble-outline"
                    size={24}
                    color="#bdbdbd"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("locationMap", photo.location);
                  navigation.navigate("Map", { location: photo.location });
                }}
              >
                <View style={styles.location}>
                  <Ionicons
                    name="ios-location-outline"
                    size={24}
                    color="#bdbdbd"
                  />
                  <Text>{photo.location}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.textEmpty}>Ще немає жодного фото</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
              <View style={styles.iconComments}>
                <Ionicons
                  name="ios-chatbubble-outline"
                  size={24}
                  color="#bdbdbd"
                />
              </View>
            </TouchableOpacity> */}
          </>
        )}
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
    paddingTop:30,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  user: {
    paddingBottom: 32,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  avatar: {},
  textName: {
    fontFamily: "Roboto_Bold",
    fontSize: 13,
    color: "#212121",
  },
  textЕmail: {
    fontFamily: "Roboto_Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.80)",
  }, 
  textHeader: {
    fontFamily: "Roboto_Bold",
    fontSize: 17,
    color: "#212121",
    textAlign: "center",
    paddingBottom: 11,
    
  },
  text: {
    fontFamily: "Roboto_Bold",
    fontSize: 16,
    color: "#212121",
    textAlign: "left",
    marginTop: 8,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: -36,
  },
  textEmpty: {
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    color: "#212121",
    textAlign: "center",
    marginTop: 24,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  description: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
});