import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Post 1',
      content: 'This is the first post.',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'This is the second post.',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'This is the third post.',
    },
  ]);

  const handlePress = (post) => {
    navigation.navigate('Post', { post });
  };

  const renderPost = ({ item }) => {
    return (
      <TouchableOpacity style={styles.post} onPress={() => handlePress(item)}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F2EEE4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0F4D92',
    fontFamily: 'Avenir',
  },
  list: {
    flex: 1,
  },
  post: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0F4D92',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0F4D92',
    fontFamily: 'Avenir',
  },
  postContent: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'Avenir',
  },
});