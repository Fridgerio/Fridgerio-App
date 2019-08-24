import React from 'react';
import { Text } from 'react-native';

export default function DummyScreen({ navigation }) {
  // second argument is default value when prop not passed
  const greeting = navigation.getParam('greeting', 'N/A');

  return <Text>{greeting}</Text>;
}
