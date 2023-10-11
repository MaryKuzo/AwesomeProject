import React from "react";
import { View, StyleSheet, ImageBackground, Text, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../hooks/index.js";
import { AntDesign } from "@expo/vector-icons";
import ButtonLogOut from "../components/ButtonLogOut";
import ProfilePosts from '../components/ProfilePosts.jsx';
import UserPhoto from "../components/UserPhoto.jsx";
import { useNavigation } from '@react-navigation/native';
import {
  deletePhotoUserThunk,
  updateUser,
} from "../redux/auth/authOperations";

const ProfileScreen = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const clearPhotoUser = () => {
    if (user) {
      dispatch(deletePhotoUserThunk())
        .then(() => {
          const updatedUser = { ...user, photoURL: '' };
          dispatch(updateUser(updatedUser));
        })
        .catch((error) => {
          console.error('Error deleting user photo: ', error);
        });
    }
  };

  return  (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/img/registration_bckg.jpg")}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.profileContainer}>
            <UserPhoto />
            <View style={styles.containerLogOut}>
              <ButtonLogOut />
            </View>
            {user && <Text style={styles.name}>{user.displayName}</Text>}
            <ProfilePosts />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 20,
  },
  withoutAvatar: {
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  iconWithPhoto: {
    left: 108,
    top: 76,
    color: "#BDBDBD",
  },
  iconWithoutPhoto: {
    left: 108,
    top: 76,
    color: "#FF6C00",
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 23,
    marginTop:32,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  safeContainer: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    marginTop: 147,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerLogOut: {
    alignSelf: "flex-end",
    top: -102,
  },
  name: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto_Bold",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 33,
    marginTop: -52,
  },
  
});

export default ProfileScreen;