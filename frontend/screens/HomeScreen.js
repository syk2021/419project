import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Post 1',
      content: 'This is the first post.',
      author: 'User A',
      rent: '$1000',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'This is the second post.',
      author: 'User B',
      rent: '$1000',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'This is the third post.',
      author: 'User A',
      rent: '$1000',
    },
  ]);
  const [search, setSearch] = useState('');
  const [currentUserPosts, setCurrentUserPosts] = useState(false);

  const handlePress = (post) => {
    navigation.navigate('Details', { post });
  };

  const renderPost = ({ item }) => {
    return (
      <TouchableOpacity style={styles.post} onPress={() => handlePress(item)}>
        <View style={styles.rentContainer}>
          <Text style={styles.rent}>{item.rent}</Text>
        </View>
        <View style={styles.postDetails}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postContent}>{item.content}</Text>
          <Text style={styles.postAuthor}>Posted by: {item.author}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  const filteredPosts = currentUserPosts
    ? posts.filter((post) => post.author === 'User A') // replace with actual user id
    : posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <TextInput
        placeholder="Search by title"
        style={styles.searchInput}
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setCurrentUserPosts(!currentUserPosts)}
      >
        <Text style={styles.filterButtonText}>
          {currentUserPosts ? 'Show all posts' : 'Show my posts'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={filteredPosts}
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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#0F4D92',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between', // add this to align rent to right
    alignItems: 'center', // add this to center vertically
  },
  postDetails: {
    flex: 1,
  },
  postRent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F4D92',
    fontFamily: 'Avenir',
    marginRight: 10,
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
  rentContainer: {
    backgroundColor: '#0F4D92',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  rent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
});


