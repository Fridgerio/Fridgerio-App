import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello from Home</Text>
      <Button
        title="Navigate"
        onPress={() => navigation.navigate('CameraScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;
