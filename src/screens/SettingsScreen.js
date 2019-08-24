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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

SettingsScreen.navigationOptions = {
  header: null,
};

export default SettingsScreen;
