import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const formatCommentDate = (date) => {

  const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = new Date(date).toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [day, month, year] = formattedDate.split(" ");

  return `${day} ${month}, ${year} | ${formattedTime}`;
};

const CommentsScreen = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const route = useRoute();
  const { imageUri } = route.params || {};
  const navigation = useNavigation();

  const handleAddComment = () => {
    if (newComment) {
      const currentDate = new Date().toISOString();
      const formattedDate = formatCommentDate(currentDate);

      const updatedComments = [
        ...comments,
        { text: newComment, date: formattedDate },
      ];

      setComments(updatedComments);
      setNewComment("");
    }
  };

  const handleTextInputSubmit = () => {
    handleAddComment();
  };

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={-120}
    >
      <View style={styles.headerContainer}>
            <View>
              <Text style={styles.text}>Коментарі</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-arrow-back-outline"
                  size={24}
                  color="#BDBDBD"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.photoContainer}>
  <Image source={{ uri: imageUri }} style={styles.photo} />
</View>

      <ScrollView style={styles.commentsContainer}>
        <ScrollView style={styles.commentsList}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <Image
                source={require("../assets/img/avatar.jpg")}
                style={styles.commentatorPhoto}
              />
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentDate}>{comment.date}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
          value={newComment}
          onChangeText={setNewComment}
          onSubmitEditing={handleTextInputSubmit}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Ionicons
            name="arrow-up-circle"
            size={34}
            style={styles.iconButtonUp}
            color="#FF6C00"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingHorizontal: 10,
    paddingTop:30,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    position: "relative",
  },
  commentsContainer: {
    flex: 1,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    width: "100%",
  },
  commentatorPhoto: {
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    maxWidth: "100%",
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginTop:20
  },
  iconContainer: {
    position: "absolute",
    left: 10,
    top: -36,
  },
  commentText: {
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDate: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "right",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#F6F6F6",
    padding: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    marginBottom:20,

  },
  commentInput: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 7,
    paddingLeft: 8,
 
    
  },
  text: {
    fontFamily: "Roboto_Bold",
    fontSize: 17,
    color: "#212121",
    textAlign: "center",
    paddingBottom: 11,
    
  },

});

export default CommentsScreen;
