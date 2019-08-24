import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

SettingsScreen.navigationOptions = {
  header: null,
};

export default SettingsScreen;
