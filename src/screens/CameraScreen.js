import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from CameraScreen</Text>
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

CameraScreen.navigationOptions = {
  title: 'CameraScreen',
};

export default CameraScreen;
