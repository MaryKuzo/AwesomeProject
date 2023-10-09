import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UserPhoto from "../components/UserPhoto";
import { useDispatch } from "react-redux";
import { usePost, useUser } from "../hooks/index.js";
import {
  addLikeThunk,
  deleteLikeThunk,
  getMyPostThunk,
} from "../redux/posts/postOperations";
import { auth } from "../redux/config";
import { updatePage } from "../helpers/index";
import ButtonLogOut from "../components/ButtonLogOut";
import PostForm from "../components/PostForm";

const ProfileScreen = () => {
  const [update, setUpdate] = useState(false);
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { myPosts } = usePost();

  useEffect(() => {
    dispatch(getMyPostThunk());
  }, [dispatch]);

  const fetchMyPosts = async () => {
    setUpdate(true);
    try {
      await dispatch(getMyPostThunk());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setUpdate(false);
  };

  const addLike = async (id, likes) => {
    const value = (likes += 1);
    dispatch(addLikeThunk({ id, value }));

    updatePage(id, () => {
      dispatch(getMyPostThunk());
    });
  };

  const deleteLike = async (id, likes) => {
    const value = (likes -= 1);
    dispatch(deleteLikeThunk({ id, value }));

    updatePage(id, () => {
      dispatch(getMyPostThunk());
    });
  };

  const uid = auth.currentUser ? auth.currentUser.uid : null;

  useFocusEffect(
    React.useCallback(() => {
      fetchMyPosts();
    }, [])
  );

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
            <PostForm/>
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
  publicationsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  publicationContainer: {
    width: "100%",
    marginBottom: 23,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 10,
  },
  publicationName: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    marginBottom: 10,
  },
  publicationDataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 35,
  },
  publicationIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 24,
  },
  publicationCommentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
    alignItems: "center",
  },
  count: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  iconGray: {
    color: "#BDBDBD",
  },
  countZero: {
    color: "#BDBDBD",
  },
  publicationLikeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
    alignItems: "center",
  },
  icon: {
    color: "#FF6C00",
  },
  likeCount: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  publicationLocationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexShrink: 1,
    alignItems: "center",
  },
  iconLocation: {
    color: "#BDBDBD",
  },
  location: {
    color: "#212121",
    textAlign: "right",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textDecorationLine: "underline",
    flexShrink: 1,
  },
});

export default ProfileScreen;