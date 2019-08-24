import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello from Home</Text>
      <Button
        title="Navigate"
        onPress={() =>
          navigation.navigate('DummyScreen', {
            greeting: 'Hello, world!',
          })}
      />
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
