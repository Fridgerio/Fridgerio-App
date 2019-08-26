import { createAppContainer } from 'react-navigation';
import TabNavigator from './src/TabNavigator';

export default createAppContainer(TabNavigator);

/**
----------
implement switchNavigator for authentication flow or loading screen:

const switchNavigator = createSwitchNavigator({
  LoadingScreen,
  AuthScreen,
  TabNavigator,
});

createAppContainer(switchNavigator);

https://reactnavigation.org/docs/en/switch-navigator.html
----------
*/
