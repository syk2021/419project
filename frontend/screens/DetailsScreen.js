import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>By {post.author}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.rent}>Rent: {post.rent}</Text>
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
});

export default DetailsScreen;


