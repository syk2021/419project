import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostScreen({ route }) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
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
  content: {
    fontSize: 18,
    lineHeight: 28,
    color: '#555555',
    fontFamily: 'Avenir',
  },
});
