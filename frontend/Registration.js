import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Registration = ({navigation}) => {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("");
    let [emailAddress, setEmailAddress] = useState("");
    let [affiliation, setAffiliation] = useState("");
    let [registerErrorMessage, setRegisterErrorMessage] = useState("");

    navigateToLogin = () => {
        navigation.navigate("Login");
    }

    doUserRegistration = async function () {
        params = {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          affiliation: affiliation,
        };
        console.log("request is sent!")
        console.log(username)
        console.log(password)
        
        axios.post('http://localhost:4000/api/register', params)
        .then((response) => {
          console.log("registration success");
          // results of register post stored here
          console.log(response.data);
          navigation.navigate("Login");
        
        })
        .catch((error) => {
          // Username already exists
          if (error.response.status == 500){
            setRegisterErrorMessage("Username already exists.");
          }
        })
    }

    return (
      <View style={styles.container}>
        <Image source={require('./assets/yale-logo.png')} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          placeholder="First Name"
          autoCapitalize="none"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          value={lastName}
          placeholder="Last Name"
          autoCapitalize="none"
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          value={emailAddress}
          placeholder="Email Address: first.last@yale.edu"
          autoCapitalize="none"
          onChangeText={(text) => setEmailAddress(text)}
        />
        {/* <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <Button title="Undergraduate" onPress={() => setAffiliation('Undergraduate')} />
          <Button title="Graduate" onPress={() => setAffiliation('Graduate')} />
        </View> */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity 
            style={[
              styles.optionButton, 
              affiliation === 'Undergraduate' ? styles.selectedOptionButton : null
            ]}
            onPress={() => setAffiliation('Undergraduate')}
          >
            <Text 
              style={[
                styles.optionButtonText, 
                affiliation === 'Undergraduate' ? styles.selectedOptionButtonText : null
              ]}
            >
              Undergraduate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.optionButton, 
              affiliation === 'Graduate' ? styles.selectedOptionButton : null
            ]}
            onPress={() => setAffiliation('Graduate')}
          >
            <Text 
              style={[
                styles.optionButtonText, 
                affiliation === 'Graduate' ? styles.selectedOptionButtonText : null
              ]}
            >
              Graduate
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => doUserRegistration()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToLogin()}>
            <Text style={styles.buttonText}>Login Page</Text>
          </TouchableOpacity>
        </View>
        {registerErrorMessage && <Text style={styles.error}>{registerErrorMessage}</Text>}
      </View>
    );
    
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00356b',
  },
  input: {
    height: 40,
    width: 250,
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#00356B',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#00356B',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#0c2340',
  },
  optionButtonText: {
    color: '#fff',
  },
  selectedOptionButtonText: {
    color: '#fff',
  },
  
});


export default Registration;