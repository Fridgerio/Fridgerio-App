import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {
  HomeStack,
  AddStack,
  ListStack,
  SettingsStack,
} from './StackNavigators';
import { Ionicons } from '@expo/vector-icons';

export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Add: AddStack,
    List: ListStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Add',
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({ tintColor }) => {
        let icon;
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            icon = 'md-home';
            break;
          case 'Add':
            icon = 'ios-add-circle';
            break;
          case 'List':
            icon = 'md-list-box';
            break;
          case 'Settings':
            icon = 'md-settings';
            break;
          default:
            break;
        }
        return <Ionicons name={icon} size={24} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1C4E55',
      showLabel: false, // defaults to true
      showIcon: true, // defaults to true
      /* override the forceInset prop for <SafeAreaView> to set custom padding between icons (or label) and bottom screen border
      TODO: test on different devices to determine sensible value */
      safeAreaInset: { bottom: 'never' },
      style: {
        paddingTop: 10,
        paddingBottom: 25,
        height: 80,
        backgroundColor: '#fff',
      },
      keyboardHidesTabBar: true, // hide the tab bar when keyboard opens
    },
  }
);

/*
----------
navigationOptions for screens inside of the navigator

tabBarAccessibilityLabel
Accessibility label for the tab button. This is read by the screen reader when the user taps the tab. It's recommended to set this if you don't have a label for the tab.

https://reactnavigation.org/docs/en/bottom-tab-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
----------
*/
