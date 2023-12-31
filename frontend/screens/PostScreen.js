import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserProvider.js';
import DatePicker from 'react-native-datepicker';
import {launchImageLibrary} from 'react-native-image-picker';

export default function PostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rentRange, setRentRange] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);

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
 const handleChoosePhoto = () => {
  launchImageLibrary({ 
        mediaType: 'photo', 
        includeBase64: false, 
        maxHeight: 200, 
        maxWidth: 200},
        (response) => {
          console.log(response);
        });
 }
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 130, backgroundColor: '#f0f0f0', borderWidth: 2, borderColor: '#ddd', borderRadius: 10 }}>
      <Text style={{ fontFamily: 'Avenir', fontSize: 36, fontWeight: 'bold', marginBottom: 20, color: '#00356B' }}>
        Create a New Post
      </Text>
  
      <TextInput
        placeholder="Enter location (full name) + title"
        value={title}
        onChangeText={setTitle}
        style={{ fontFamily: 'Avenir', marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#c5c5c5', borderRadius: 5 }}
      />
  
      <TextInput
        placeholder="Enter your post content"
        value={content}
        onChangeText={setContent}
        multiline={true}
        style={{ fontFamily: 'Avenir', height: 150, fontSize: 16, padding: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#c5c5c5', borderRadius: 5, textAlignVertical: 'top' }}
      />
  
      <TextInput
        placeholder="Enter your rent per month"
        value={rentRange}
        onChangeText={setRentRange}
        style={{ fontFamily: 'Avenir', marginBottom: 20, fontSize: 16, padding: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#c5c5c5', borderRadius: 5 }}
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
            color: '#c5c5c5',
            fontFamily: 'Avenir',
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
            color: '#c5c5c5',
            fontFamily: 'Avenir',
          }
        }}
        onDateChange={(endDate) => setEndDate(endDate)}
      />

      {/* {selectedImage ? (
        <>
          <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200, marginBottom: 20 }} />
          <Text style={{ fontFamily: 'Avenir', fontSize: 16, marginBottom: 20 }}>
            {selectedImage.fileName}
          </Text>
        </>
      ) : (
        <TouchableOpacity onPress={handleChoosePhoto} style={{ marginBottom: 20, backgroundColor: '#f0f0f0', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: '#c5c5c5' }}>
          <Text style={{ fontFamily: 'Avenir', color: '#00356B', fontSize: 18, fontWeight: 'bold' }}>Select Photo</Text>
        </TouchableOpacity>
      )} */}
 
      <TouchableOpacity onPress={handlePost} style={{ backgroundColor: '#00356B', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Avenir', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
  

  
}


