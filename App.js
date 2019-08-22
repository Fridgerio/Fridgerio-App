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
        headerBackTitle: 'Start', // back button text (must be on origin screen); works only on iOS; 'null' value will show no text string
      },
    },
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
  {
    defaultNavigationOptions: {
      /* handles configuration options for all screens; values can be overwritten by adding the same property to the navigation options of each screen */
      headerStyle: {
        backgroundColor: 'hotpink', // background color
      },
      headerTintColor: 'yellow', // font color default for the whole header
      headerTitleStyle: {
        fontWeight: 'normal',
        /* color changes only the color of the title */
        color: 'white',
      },
      headerBackTitleStyle: {
        /* styles the back button title */
        color: 'greenyellow',
      },
      /* gesturesEnabled enables swiping between screens, defaults to true for iOS and to false on Android */
      gesturesEnabled: true,
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
