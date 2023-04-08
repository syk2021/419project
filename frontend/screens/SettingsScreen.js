import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const user = {
    username: 'full stack',
    firstName: 'Lindsay',
    lastName: 'Chen',
    affiliation: 'Undergrad',
    phoneNumber: '12345',
  };

  const handleLogout = () => {
    console.log(`Logging out...`);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.firstName} {user.lastName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Affiliation:</Text>
        <Text style={styles.value}>{user.affiliation}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{user.phoneNumber}</Text>
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