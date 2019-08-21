import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const AppNavigator = createStackNavigator({ HomeScreen, SettingsScreen });

export default createAppContainer(AppNavigator);
