import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from HelpScreen</Text>
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

HelpScreen.navigationOptions = {
  title: 'HelpScreen',
};

export default HelpScreen;
