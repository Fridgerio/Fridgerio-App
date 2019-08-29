import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProductFormScreen from './screens/ProductFormScreen';
import ListScreen from './screens/ListScreen';
import SettingsScreen from './screens/SettingsScreen';
import DummyScreen from './screens/DummyScreen';
import CameraScreen from './screens/CameraScreen';

/*
----------
default values can be overwritten by adding the same property to the navigation options of each individual screen

https://reactnavigation.org/docs/en/stack-navigator.html
----------
*/

const defaultOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'hotpink',
    },
    headerTintColor: 'yellow',
    headerTitleStyle: {
      fontWeight: 'normal',
      color: 'white', // overwrites headerTintColor
    },
    headerBackTitleStyle: {
      color: 'greenyellow',
    },
    /* gesturesEnabled enables swiping between screens, defaults to true for iOS and to false on Android */
    gesturesEnabled: true,
  },
};

const HomeStack = createStackNavigator(
  { HomeScreen, CameraScreen },
  defaultOptions
);
const AddStack = createStackNavigator({ ProductFormScreen }, defaultOptions);
const ListStack = createStackNavigator({ ListScreen }, defaultOptions);
const SettingsStack = createStackNavigator({ SettingsScreen }, defaultOptions);

export { HomeStack, AddStack, ListStack, SettingsStack };

/*
----------
navigationOptions for screens inside of the navigator

header
React Element or a function that given HeaderProps returns a React Element, to display as a header. Setting to null hides header.

headerTitle
String, React Element or React Component used by the header. Defaults to scene title.

headerBackImage
React Element or Component to display custom image in header's back button.

headerBackTitle
Title string used by the back button on iOS, or null to disable label. Defaults to the previous scene's headerTitle. headerBackTitle has to be defined in the origin screen, not in the destination screen.

headerRight / headerLeft
React Element to display on the right side of the header, styled by headerRightContainerStyle and headerLeftContainerStyle. When a component is used for headerLeft, it receives a number of props when rendered (onPress, title, titleStyle and more)

headerTitleContainerStyle
Customize the style for the container of the headerTitle component, for example to add padding.

https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
----------
*/
