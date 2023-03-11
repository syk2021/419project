import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginRegistration = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

  const doUserRegistration = async function (username, password) {
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
    
    // reload the page
    navigate("/");
  }

  const doUserLogin = async function (username, password) {
    params = {
      username: username,
      password: password
    };

    console.log("user login!");
    let res = await axios.post('http://localhost:4000/api/login', params);
    // console.log(res);
    
    // set logged in to true
    setisLoggedIn(true);
    // on login, want to navigate to posts
    navigate("/posts");
  }

  return <View
  style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  }}>
  <Text><b>Register or Login</b></Text>
  <TextInput style={styles.input} value={username} placeholder="username" autoCapitalize="none" onChangeText={(text)=>setUsername(text)}/>
  <TextInput style={styles.input} value={password} placeholder="password" secureTextEntry autoCapitalize="none" onChangeText={(text)=>setPassword(text)}/>
  <Button title={"Sign Up"} onPress={() => doUserRegistration(username, password)}/>
  <Button title={"Login"} onPress={() => doUserLogin(username, password)}/>
  </View>;
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