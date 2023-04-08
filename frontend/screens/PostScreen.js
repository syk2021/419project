import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserProvider.js';
import DatePicker from 'react-native-datepicker';

export default function PostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rentRange, setRentRange] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useContext(UserContext);


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

      navigation.navigate('Home');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40, backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0F4D92' }}>
        Create a New Post
      </Text>

      <TextInput
        placeholder="Enter location (full name) + title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#c5c5c5' }}
      />

      <TextInput
        placeholder="Enter your post content"
        value={content}
        onChangeText={setContent}
        multiline={true}
        style={{ height: 150, fontSize: 16, padding: 10, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#c5c5c5', textAlignVertical: 'top' }}
      />

      <TextInput
        placeholder="Enter your rent per month"
        value={rentRange}
        onChangeText={setRentRange}
        style={{ marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#c5c5c5' }}
      />

      {/* <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: 'white', borderStyle: 'solid', borderWidth: 1, borderColor: '#c5c5c5' }}
      /> */}

      <DatePicker
        style={{ marginBottom: 20, width: 200 }}
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
            borderStyle: 'solid',
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
        style={{ marginBottom: 20, width: 200 }}
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
            borderStyle: 'solid',
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


      <TouchableOpacity onPress={handlePost} style={{ backgroundColor: '#0F4D92', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}


