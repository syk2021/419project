import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function PostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    // Handle posting logic
    console.log(`Title: ${title}, Content: ${content}`);
    navigation.navigate('Home');
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Create a New Post
      </Text>

      <TextInput
        placeholder="Enter a title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: '#f5f5f5' }}
      />

      <TextInput
        placeholder="Enter your post content"
        value={content}
        onChangeText={setContent}
        multiline={true}
        style={{ height: 200, fontSize: 16, padding: 10, backgroundColor: '#f5f5f5', textAlignVertical: 'top' }}
      />

      <TouchableOpacity onPress={handlePost} style={{ backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}
