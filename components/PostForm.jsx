import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { usePost, useUser } from "../hooks/index";
import { useDispatch } from "react-redux";
import {
  addLikeThunk,
  deleteLikeThunk,
  getAllPostsThunk,
  deletePostThunk,
} from "../redux/posts/postOperations";
import { auth } from "../redux/config";
import { updatePage } from "../helpers/index";


const PostForm = () => {
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

  const addLike = async (id, likes) => {
    const value = (likes += 1);
    dispatch(addLikeThunk({ id, value }));

    updatePage(id, () => {
      dispatch(getAllPostsThunk());
    });
  };

  const deleteLike = async (id, likes) => {
    const value = (likes -= 1);
    dispatch(deleteLikeThunk({ id, value }));

    updatePage(id, () => {
      dispatch(getAllPostsThunk());
    });
  };

  
  const uid = auth.currentUser ? auth.currentUser.uid : null;

  useFocusEffect(
    React.useCallback(() => {
      fetchAllPosts();
    }, [])
  );

  return (
<>
  <FlatList
    refreshControl={
      <RefreshControl refreshing={update} onRefresh={fetchAllPosts} />
    }
    data={allPosts}
    keyExtractor={(item) => (item.id ? item.id.toString() : "")}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <View style={styles.publicationsContainer}>
        <View style={styles.publicationContainer} key={item.name}>
          {item.imageURL && (
            <Image source={{ uri: item.imageURL }} style={styles.photo} />
          )}

          <Text style={styles.publicationName}>{item.name}</Text>
          <View style={styles.publicationDataContainer}>
            <View style={styles.publicationIconContainer}>
              {item.comments.some(
                (commentsItem) => commentsItem.userId === uid
              ) ? (
                <>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comments", {
                        post: item,
                      });
                    }}
                    style={styles.publicationCommentContainer}
                  >
                    <Ionicons
                      name="chatbubble"
                      size={24}
                      style={styles.icon}
                    />
                    <Text style={styles.count}>{item.comments.length}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comments", {
                        post: item,
                      });
                    }}
                    style={styles.publicationCommentContainer}
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={24}
                      style={styles.iconGray}
                    />
                    <Text style={styles.countZero}>
                      {item.comments.length}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {item.liked.some((likedItem) => likedItem.userId === uid) ? (
                <TouchableOpacity
                  onPress={() => deleteLike(item.id, item.likes)}
                  style={styles.publicationLikeContainer}
                >
                  <Feather name="thumbs-up" size={24} style={styles.icon} />
                  <Text style={styles.count}>{item.likes}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => addLike(item.id, item.likes)}
                  style={styles.publicationLikeContainer}
                >
                  <Feather
                    name="thumbs-up"
                    size={24}
                    style={styles.iconGray}
                  />
                  <Text style={[styles.count, styles.countZero]}>
                    {item.likes}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.publicationLocationContainer}
              onPress={() => {
                navigation.navigate("Map");
              }}
            >
              <AntDesign
                name="enviromento"
                size={24}
                style={styles.iconLocation}
              />
              <Text style={styles.location}>
                {item.location}, {item.geolocation}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
  />
</>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingTop: 62,
      paddingHorizontal: 16,
      marginTop: 32,
    },
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 25,
      marginTop: 32,
    },
    publicationDeleteContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 6,
      },
      iconDelete: {
        color: "#FF0000", // Red color for delete icon
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
  


export default PostForm