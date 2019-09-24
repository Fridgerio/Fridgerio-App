import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './src/TabNavigator';
import ContextProvider from './src/context/Context';

/**
----------
implement switchNavigator for authentication flow:

const switchNavigator = createSwitchNavigator({
  AuthScreen,
  TabNavigator,
});

 const AppContainer = createAppContainer(switchNavigator);

https://reactnavigation.org/docs/en/switch-navigator.html
----------
*/

const AppContainer = createAppContainer(TabNavigator);

/**
----------
Import ALL images and fonts here. Until the loadAssetsAsync Promise is resolved only the AppLoading component will be rendered, which tells Expo to keep the loading screen open. The app will be visible - with all assets preloaded - when that component is removed.

TODO: move isReady to global state?
----------
*/

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/img/all.png'),
      require('./assets/img/bread-pastry.png'),
      require('./assets/img/canned.png'),
      require('./assets/img/dairy.png'),
      require('./assets/img/drinks.png'),
      require('./assets/img/frozen.png'),
      require('./assets/img/fruits-vegetables.png'),
      require('./assets/img/meat.png'),
      require('./assets/img/pasta.png'),
      require('./assets/img/sauces-oils-spices.png'),
      require('./assets/img/snacks-sweets.png'),
      require('./assets/img/uncategorized.png'),
    ]);

    const fontAssets = cacheFonts([Ionicons.font, {
      'FridgerioPrimaryFont': require('./assets/fonts/Ebrima.ttf'),
    }]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ContextProvider>
      <AppContainer />
    </ContextProvider>
  );
}
