import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import defaultNavigatorOptions from '../utils/StackNavigator';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const HomeNavigator = createStackNavigator(
  /* order of screens matters, first one will be loaded as initial screen */
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        headerBackTitle: 'Start', // back button text (must be on origin screen); works only on iOS; 'null' value will show no text string
      },
    },
  },
  defaultNavigatorOptions
);

export default HomeNavigator;
