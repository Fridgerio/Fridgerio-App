import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import defaultNavigatorOptions from '../utils/StackNavigator';

function SettingsScreen() {
  /* accessing params in child screen */
  // console.warn(props.navigation.state.params.defaultText);
  return (
    <View style={styles.container}>
      <Text>Hello from Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const SettingsNavigator = createStackNavigator(
  /* order of screens matters, first one will be loaded as initial screen */
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        headerTintColor: 'white', // font color,
        // headerTitle: can be used to render a react component as title, e.g. icon. The header prop can receive a react element but not a component,
        // headerBackImage: display custom image in header back button,
        // headerRight or headerLeft: to display react element on the right or left side of the title; can replace the back button, styled by headerRightContainerStyle or headerLeftContainerStyle, e.g. to change the padding
        /* headerTitleContainerStyle: further style settings for the title container, e.g. positioning or padding */
      },
      /* passing parameters as props to single screens */
      params: { defaultText: 'Fridgerio' },
    },
  },
  defaultNavigatorOptions
);

export default SettingsNavigator;
