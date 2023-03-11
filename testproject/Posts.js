import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Posts = () => {
    return (
        <View style={styles.input}>
            <Text>Welcome to the posts page!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        justifyContent: "center"
    }
});

export default Posts;