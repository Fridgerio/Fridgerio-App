import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DummyScreen({ navigation }) {
  // second argument is default value when prop not passed
  const greeting = navigation.getParam('greeting', 'N/A');

  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
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

DummyScreen.navigationOptions = {
  title: 'Placeholder',
};
