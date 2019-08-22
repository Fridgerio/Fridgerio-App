import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  /* accessing params in child screen */
  // console.warn(props.navigation.state.params.defaultText);
  return (
    <View>
      <Text>Hello from Settings</Text>
    </View>
  );
}
