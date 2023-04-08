import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0c2340' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 40 }}>{post.title}</Text>
      <Text style={{ marginTop: 10, color: '#0c2340' }}>{post.description}</Text>
    </View>
  );
};

export default DetailsScreen;

