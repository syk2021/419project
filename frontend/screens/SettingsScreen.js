import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../UserProvider.js';
import axios from 'axios';


export default function SettingsScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  params = {
    username: user
  }
  console.log("settings page");
  axios.post('http://localhost:4000/api/finduser', params)
  .then((response) => {
    console.log("in settings page, response");
    console.log(response.data);
    setUserName(response.data.username);
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setAffiliation(response.data.affiliation);
    setEmailAddress(response.data.emailAddress);
  })

  const handleLogout = () => {
    console.log(`Logging out...`);
    // forget user in the context provider
    setUser('');
    navigation.navigate('Login');
  };

  const handleDelete = (user) => {
    // delete user's account
    params = {
      username: user,
    }
    console.log(user);
    axios.post('http://localhost:4000/api/deleteaccount', params)
    .then((response) => {
        console.log("succeeded");
        setUser('');
        navigation.navigate('Login');
    })
    .catch((error) => {
        console.log("error: " + error);
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
  
      <View style={styles.row}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
  
      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{firstName} {lastName}</Text>
      </View>
  
      <View style={styles.row}>
        <Text style={styles.label}>Affiliation</Text>
        <Text style={styles.value}>{affiliation}</Text>
      </View>
  
      <View style={styles.row}>
        <Text style={styles.label}>Email Address</Text>
        <Text style={styles.value}>{emailAddress}</Text>
      </View>
  
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(user)}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 30,
      // paddingTop: 50,
      paddingVertical: 130,
    },
    header: {
      marginBottom: 50,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#00356B',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 15,
      marginBottom: 15,
    },
    label: {
      fontSize: 18,
      color: '#999',
    },
    value: {
      fontSize: 16,
      color: '#000',

    },
    logoutButton: {
      backgroundColor: '#00356B',
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 30,
    },
    logoutButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    deleteButton: {
      backgroundColor: '#993d36',
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 10,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  