import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserProvider.js';


const DetailsScreen = ({ route }) => {
    const { user } = useContext(UserContext);
    const { post } = route.params;
    console.log(post);
    const navigation = useNavigation();

    // Define state to hold the user's comment and the list of existing comments
    // comment holds one placeholder comment's textfield
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const loadComments = () => {
        // find all comments with the postId
        params = {
            postId: post._id
        };
    
        axios.post('http://localhost:4000/api/allcomments', params)
        .then((response) => {
            console.log('details page');
            console.log(response.data);
            // load all comments
            // loadComments()
            setComments(response.data);
        });
    }

    // only call function at first render
    useEffect(() => {
        loadComments();
    }, [])

    const handleAddComment = () => {
        const newComment = { username: user, text: comment, postId: post._id };
        axios.post('http://localhost:4000/api/postcomment', newComment)
        .then((response) => {
            console.log(response);
            loadComments();
        })
        .catch((error) => {
          console.log(error);
        });
        // setComments([...comments, newComment]);
        setComment('');
        
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>By {post.username}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.rent}>Rent: {post.rentRange}</Text>
      </View>
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>Comments:</Text>
        <ScrollView>
          {comments.map((comment) => (
            <View key={comment._id} style={styles.commentContainer}>
              <Text style={styles.commentAuthor}>{comment.username}: </Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.commentInputContainer}>
        <TextInput 
          style={styles.commentInput} 
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity 
          style={styles.commentButton}
          onPress={handleAddComment}
        >
          <Text style={styles.commentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: '#0c2340',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0c2340',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c5c5c5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0c2340',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#0c2340',
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    color: '#0c2340',
    marginBottom: 20,
  },
  rent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0c2340',
  },
  commentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c5c5c5',
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c2340',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 18,
    color: '#0c2340',
    marginBottom: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#c5c5c5',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#0c2340',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0c2340',
  },
  commentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default DetailsScreen;


