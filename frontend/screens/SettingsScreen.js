import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../UserProvider.js';
import axios from 'axios';

export default function SettingsScreen({ navigation }) {
  const { user } = useContext(UserContext);
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
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{firstName} {lastName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Affiliation:</Text>
        <Text style={styles.value}>{affiliation}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email Address:</Text>
        <Text style={styles.value}>{emailAddress}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
  },
  button: {
    backgroundColor: 'steelblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});