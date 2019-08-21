import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        title: 'Home',
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'hotpink',
    },
  }
);

export default createAppContainer(TabNavigator);
