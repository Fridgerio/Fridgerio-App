import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;
