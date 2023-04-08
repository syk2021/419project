import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserProvider.js';

export default function PostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useContext(UserContext);
  const [rentRange, setRentRange] = useState('')

  const handlePost = () => {
    // Handle posting logic
    console.log(`Title: ${title}, Content: ${content}`);
    
    params = {
      title: title,
      content: content,
      username: user,
      rentRange: rentRange
    };

    axios.post('http://localhost:4000/api/newpost', params)
    .then((response) => {
      console.log("new post success!");
      console.log(response.data.title);
      console.log(response.data.content);
      console.log(response.data.username);

      navigation.navigate('Home');
    })
    .catch((error) => {
      console.log(error);
    })
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

      <TextInput
      placeholder="Rent Range"
      value={rentRange}
      onChangeText={setRentRange}
      style={{ height: 200, fontSize: 16, padding: 10, backgroundColor: '#f5f5f5', textAlignVertical: 'top' }}
      />

      <TouchableOpacity onPress={handlePost} style={{ backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}
