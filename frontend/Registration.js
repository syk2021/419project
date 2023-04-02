import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const Registration = ({navigation}) => {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [affiliation, setAffiliation] = useState("");
    let [registerErrorMessage, setRegisterErrorMessage] = useState("");

    navigateToLogin = () => {
        navigation.navigate("RegistrationLogin");
    }

    doUserRegistration = async function (username, password) {
        params = {
          username: username,
          password: password,
        };
        console.log("request is sent!")
        console.log(username)
        console.log(password)
        
        axios.post('http://localhost:4000/api/register', params)
        .then((response) => {
          console.log("success");
          // results of register post stored here
          console.log(response.data);
          navigation.navigate("RegistrationLogin");
        
        })
        .catch((error) => {
          // Username already exists
          if (error.response.status == 500){
            setRegisterErrorMessage("Username already exists.");
          }
        })
    }

    return (<View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Text>Register</Text>
        <TextInput style={styles.input} value={firstName} placeholder="First Name" autoCapitalize="none" onChangeText={(text)=>setFirstName(text)}/>
        <TextInput style={styles.input} value={lastName} placeholder="Last Name" autoCapitalize="none" onChangeText={(text)=>setLastName(text)}/>
        <TextInput style={styles.input} value={username} placeholder="username" autoCapitalize="none" onChangeText={(text)=>setUsername(text)}/>
        <TextInput style={styles.input} value={password} placeholder="password" secureTextEntry autoCapitalize="none" onChangeText={(text)=>setPassword(text)}/>
        <TextInput style={styles.input} value={phoneNumber} placeholder="Phone Number" onChangeText={(text)=>setPhoneNumber(text)}/>
        <Button title="Undergraduate" onPress={()=>setAffiliation("Undergraduate")}/>
        <Button title="Graduate" onPress={() => setAffiliation("Graduate")}/>
        <Button title={"Sign Up"} onPress={() => doUserRegistration(username, password)}/>
        <Button title={"Back to Login"} onPress={() => navigateToLogin()}/>
        {registerErrorMessage && <Text style={styles.error}>{registerErrorMessage}</Text>}
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

export default Registration;