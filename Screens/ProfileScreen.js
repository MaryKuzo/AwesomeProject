import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  SafeAreaView,
} from "react-native";

import UserPhoto from "../components/UserPhoto";
import { useDispatch } from "react-redux";
import { useUser } from "../hooks/index.js";

import ButtonLogOut from "../components/ButtonLogOut";
import ProfilePosts from '../components/ProfilePosts.jsx'

const ProfileScreen = () => {
  const [update, setUpdate] = useState(false);
  const { user } = useUser();
  const dispatch = useDispatch();

  return (
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
            <ProfilePosts/>
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