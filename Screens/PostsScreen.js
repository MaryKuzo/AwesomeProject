
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,   
  Image,
} from "react-native";
import { usePost, useUser } from "../hooks/index";
import { useDispatch } from "react-redux";
import {
  getAllPostsThunk,
} from "../redux/posts/postOperations";
import { Ionicons } from "@expo/vector-icons";
import PostForm from "../components/PostForm";

const PostsScreen = () => {
  const [update, setUpdate] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { allPosts } = usePost();

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  const fetchAllPosts = async () => {
    setUpdate(true);
    try {
      await dispatch(getAllPostsThunk());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setUpdate(false);
  };


  // const uid = auth.currentUser ? auth.currentUser.uid : null;

  useFocusEffect(
    React.useCallback(() => {
      fetchAllPosts();
    }, [])
  );

  return (
   <>

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
      <View style={styles.userContainer}>
        {user && user.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar}></Image>
        ) : (
          <View style={styles.withoutAvatar}></View>
        )}
        {user && (
          <View>
            <Text style={styles.userName}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        )}
      </View>
      <PostForm/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingHorizontal: 10,
    paddingTop:30,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: -36,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 23,
    marginTop:32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  withoutAvatar: {
    backgroundColor: "#F6F6F6",
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto_Bold",
    color: "#212121",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
  },
  email: {
    fontFamily: "Roboto_Regular",
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "400",
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
  textHeader: {
    fontFamily: "Roboto_Bold",
    fontSize: 17,
    color: "#212121",
    textAlign: "center",
    paddingBottom: 11,
    
  },
  publicationCommentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
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

export default PostsScreen;