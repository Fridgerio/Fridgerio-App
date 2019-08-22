import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeNavigator from './src/screens/HomeScreen';
import SettingsNavigator from './src/screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const TabHomeIcon = ({ tintColor }) => (
  <Ionicons name="md-home" size={24} color={tintColor} />
);

const TabSettingsIcon = ({ tintColor }) => (
  <Ionicons name="md-settings" size={24} color={tintColor} />
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        // title: 'Home',
        tabBarIcon: TabHomeIcon,
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        // title: 'Settings',
        tabBarIcon: TabSettingsIcon,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'hotpink',
      showLabel: true, // shows the name of the tab (default: true)
      showIcon: true, // shows the tab icon (default: true)
      style: {
        paddingVertical: 20,
        height: 100,
      },
      keyboardHidesTabBar: true, // tab bar always at the bottom, even under the keyboard
    },
  }
  // navigationOptions: {
  // tabBarAccessibilityLabel: set a label for screen readers if tabTitle is not set
  // },
);

export default createAppContainer(TabNavigator);

const { string } = PropTypes;

TabHomeIcon.propTypes = {
  tintColor: string.isRequired,
};

TabSettingsIcon.propTypes = {
  tintColor: string.isRequired,
};
