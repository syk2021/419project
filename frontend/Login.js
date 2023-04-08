import React, {useState, useContext} from 'react';
import 'react-native-gesture-handler';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
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
    })
    
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
  <Button title={"Login"} onPress={() => doUserLogin(username, password)}/>
  <Button title={"Register"} onPress={() => navigateToRegistration()}/>
  {loginErrorMessage && <Text style={styles.error}>{loginErrorMessage}</Text>}
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
  error: {
    color: "red",
  }
});

export default LoginRegistration;