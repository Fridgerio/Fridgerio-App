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
      /* TODO: tintColor only working on Home, even when not active */
      activeTintColor: 'hotpink',
    },
  }
);

export default createAppContainer(TabNavigator);

const { string } = PropTypes;

TabHomeIcon.propTypes = {
  tintColor: string.isRequired,
};

TabSettingsIcon.propTypes = {
  tintColor: string.isRequired,
};
