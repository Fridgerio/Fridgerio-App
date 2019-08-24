import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function AddScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from Add</Text>
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

AddScreen.navigationOptions = {
  title: 'Add Product',
};

export default AddScreen;
