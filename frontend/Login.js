import React, {useState, useContext} from 'react';
import 'react-native-gesture-handler';
import {Button, StyleSheet, TouchableOpacity, Text, TextInput, View, Image} from 'react-native';
import axios from 'axios';
import { UserContext } from './UserProvider.js';


const LoginRegistration = ({navigation}) => {
  // functions that we will use from UserContext class.
  const { user, setUser } = useContext(UserContext);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loginErrorMessage, setLoginErrorMessage] = useState("");

  navigateToRegistration = () => {
    navigation.navigate("Registration");
  }
  
  doUserLogin = async function (username, password) {
    params = {
      username: username,
      password: password
    };

    console.log("user login!");
    
    axios.post('http://localhost:4000/api/login', params)
    .then((response) => {
      console.log("login success");
      console.log(response.data);
      console.log("username:");
      console.log(response.data.username);
      // setUser uses the UserProvider
      setUser(response.data.username);
      console.log("check user updated correctly:");
      console.log(user);

      // on login, want to navigate to main page
      navigation.navigate("MainPage");
      
    })
    .catch((error) => {
      // username or password does not match
      if (error.response.status == 500) {
        setLoginErrorMessage("Username or password does not match.");
      }
      if (error.response.status == 501) {
        setLoginErrorMessage("Unable to find user.");
      }
    })
    
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/yale-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Register or Login</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="username"
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => doUserLogin(username, password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigateToRegistration()}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {loginErrorMessage && <Text style={styles.error}>{loginErrorMessage}</Text>}
    </View>
  );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      color: '#00356b',
    },
    input: {
      height: 40,
      width: '100%',
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#f2f2f2',
    },
    button: {
      backgroundColor: '#00356b',
      borderRadius: 5,
      height: 40,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  });
  
  

export default LoginRegistration;