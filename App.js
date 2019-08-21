import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const AppNavigator = createStackNavigator(
  /* order of screens matters, first one will be loaded as initial screen */
  {
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
  },
  {
    defaultNavigationOptions: {
      /* handles configuration options for all screens */
      headerStyle: {
        backgroundColor: 'hotpink',
      },
    },
  }
);

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
      /* TODO: tintColor only working on Home, even when not active */
      activeTintColor: 'hotpink',
    },
  }
);

export default createAppContainer(TabNavigator);
