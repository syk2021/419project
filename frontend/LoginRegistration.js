import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';

const LoginRegistration = ({navigation}) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [isLoggedIn, setisLoggedIn] = useState(false);

  doUserRegistration = async function (username, password) {
    params = {
      username: username,
      password: password,
    };
    console.log("request is sent!")
    console.log(username)
    console.log(password)
    
    // send the backend api request to register the user in database
    let res = await axios.post('http://localhost:4000/api/register', params);
    console.log(res.data);
    
  }

  doUserLogin = async function (username, password) {
    params = {
      username: username,
      password: password
    };

    console.log("user login!");
    // let res = await axios.post('http://localhost:4000/api/login', params);
    // console.log(res);
    
    // // set logged in to true
    // setisLoggedIn(true);
    // on login, want to navigate to main page
    navigation.navigate("Home");
  }

  return (<View
  style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  }}>
  <Text>Register or Login</Text>
  <TextInput style={styles.input} value={username} placeholder="username" autoCapitalize="none" onChangeText={(text)=>setUsername(text)}/>
  <TextInput style={styles.input} value={password} placeholder="password" secureTextEntry autoCapitalize="none" onChangeText={(text)=>setPassword(text)}/>
  <Button title={"Sign Up"} onPress={() => doUserRegistration(username, password)}/>
  <Button title={"Login"} onPress={() => doUserLogin(username, password)}/>
  </View>);
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 150,
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: "#b0e0e6",
  },
});

export default LoginRegistration;