import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserProvider.js';
import DatePicker from 'react-native-datepicker';

export default function PostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rentRange, setRentRange] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useContext(UserContext);

const reset = () => {
  setTitle('');
  setContent('');
  setRentRange('');
  setDate('');
  setEndDate('');
}

  const handlePost = () => {
    // Handle posting logic
    console.log(`Title: ${title}, Content: ${content}`);
    
    params = {
      title: title,
      content: content,
      username: user,
      rentRange: rentRange,
      startDate: date,
      endDate: endDate
    };

    axios.post('http://localhost:4000/api/newpost', params)
    .then((response) => {
      console.log("new post success!");
      console.log(response.data.title);
      console.log(response.data.content);
      console.log(response.data.username);
      reset(); // reset all input boxes
      navigation.navigate('Home');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 130, backgroundColor: '#f0f0f0', borderWidth: 2, borderColor: '#ddd', borderRadius: 10 }}>
      <Text style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 20, color: '#00356B' }}>
        Create a New Post
      </Text>
  
      <TextInput
        placeholder="Enter location (full name) + title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#c5c5c5', borderRadius: 5 }}
      />
  
      <TextInput
        placeholder="Enter your post content"
        value={content}
        onChangeText={setContent}
        multiline={true}
        style={{ height: 150, fontSize: 16, padding: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#c5c5c5', borderRadius: 5, textAlignVertical: 'top' }}
      />
  
      <TextInput
        placeholder="Enter your rent per month"
        value={rentRange}
        onChangeText={setRentRange}
        style={{ marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#c5c5c5', borderRadius: 5 }}
      />
  
      <DatePicker
        style={{ marginBottom: 20, width: '100%' }}
        date={date}
        mode="date"
        placeholder="Select start date"
        format="YYYY-MM-DD"
        minDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#c5c5c5',
            borderRadius: 5,
            alignItems: 'flex-start',
            paddingLeft: 10
          },
          placeholderText: {
            fontSize: 16,
            color: '#c5c5c5'
          }
        }}
        onDateChange={(startDate) => setDate(startDate)}
      />
  
      <DatePicker
        style={{ marginBottom: 20, width: '100%' }}
        date={endDate}
        mode="date"
        placeholder="Select end date"
        format="YYYY-MM-DD"
        minDate={new Date(date)}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#c5c5c5',
            borderRadius: 5,
            alignItems: 'flex-start',
            paddingLeft: 10,
          },
          placeholderText: {
            fontSize: 16,
            color: '#c5c5c5'
          }
        }}
        onDateChange={(endDate) => setEndDate(endDate)}
      />
  
      <TouchableOpacity onPress={handlePost} style={{ backgroundColor: '#00356B', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
  

  
}


