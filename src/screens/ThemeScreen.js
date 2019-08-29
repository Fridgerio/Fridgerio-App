import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function ThemeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from ThemeScreen</Text>
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

ThemeScreen.navigationOptions = {
  title: 'HelpScreen',
};

export default ThemeScreen;
