import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function LanguageScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from LanguageScreen</Text>
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

LanguageScreen.navigationOptions = {
  title: 'LanguageScreen',
};

export default LanguageScreen;
