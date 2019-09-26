import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { data } from './data';
import { Platform, Alert, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const images = [
  'all',
  'bread',
  'canned',
  'dairy',
  'drinks',
  'frozen',
  'fruits',
  'meat',
  'pasta',
  'sauces',
  'snacks',
  'uncategorized',
];

export const Context = React.createContext(null);

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState(data);
  const [productsSortedByDate, setProductsSortedByDate] = useState(null);
  const [productsSortedByName, setProductsSortedByName] = useState(null);
  const [lastDeletedProduct, setLastDeletedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [sortMethod, setSortMethod] = useState('bestBeforeDate');
  const [language, setLanguage] = useState('DE');
  const [pushNotification, setPushNotification] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [categoryImages] = useState(images);

  const getStoredProducts = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    if (allKeys.includes('products')) {
      const storedProductsJSON = await AsyncStorage.getItem('products');
      const storedProducts = await JSON.parse(storedProductsJSON);
      if (storedProducts.length >= 25) {
        return storedProducts;
      }
    }
    return null;
  };

  useEffect(() => {
    const compareName = (a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }
      if (a.productName > b.productName) {
        return 1;
      }
      return 0;
    };

    const compareDate = (a, b) => {
      if (a.bestBeforeDate < b.bestBeforeDate) {
        return -1;
      }
      if (a.bestBeforeDate > b.bestBeforeDate) {
        return 1;
      }
      return 0;
    };

    const name = [...products];
    const date = [...products];
    setProductsSortedByName(name.sort(compareName));
    setProductsSortedByDate(date.sort(compareDate));
    /* useEffect needs to listen to updates to products in order apply add/delete actions to the productsSortedBy states */
  }, [products]);

  useEffect(() => {
    const asyncInit = async () => {
      const storedProducts = await getStoredProducts();
      if (storedProducts === null) {
        const dataJSON = JSON.stringify(data);
        await AsyncStorage.setItem('products', dataJSON);
      } else {
        setProducts(storedProducts);
      }
    };
    asyncInit();
  }, []);

  const saveProducts = async dataArray => {
    await AsyncStorage.setItem('products', JSON.stringify(dataArray));
    const storedJSON = await AsyncStorage.getItem('products');
    const stored = await JSON.parse(storedJSON);
    setProducts(stored);
  };
  /* wrapper functions */
  /* add a product to the state and also to the database */
  const addProduct = (
    productName,
    amount,
    productCategory,
    bestBeforeDate,
    pushNotificationDate,
    customNote,
    barcode
  ) => {
    let data = products;
    if (productName && amount) {
      /* add the product to the data array */
      data = [
        ...products,
        {
          id: uuid(),
          productName,
          amount,
          productCategory,
          bestBeforeDate,
          pushNotificationDate,
          customNote,
          barcode,
        },
      ];
      // console.log(data);
    }

    /* store it in the state and in AsyncStorage */
    saveProducts(data);
  };

  /* delete the product */
  const deleteProduct = productId => {
    /* first delete it from the database */

    /* store the deleted item */
    const deletedProduct = products.find(product => product.id === productId);

    /* store the remaining products */
    const updatedProducts = products.filter(
      product => product.id !== productId
    );
    /* write updated products to the state */
    saveProducts(updatedProducts);
    /* write deleted product to the state */
    setLastDeletedProduct(deletedProduct);
    /* snack bar message */
    handleSnackBar();
  };

  // /* update the product (not productName, not category) */
  // const updateProduct = (
  //   index,
  //   productName,
  //   amount,
  //   productCategory,
  //   bestBeforeDate,
  //   pushNotificationDate,
  //   customNote
  // ) => {
  //   const data = products;
  //   // Update data in DB
  //   data[index] = {
  //     productName,
  //     amount,
  //     productCategory,
  //     bestBeforeDate,
  //     pushNotificationDate,
  //     customNote,
  //   };
  //   setProducts(data);
  // };

  // toggle snackbar
  const handleSnackBar = () => {
    setIsSnackBarVisible(true);
    setTimeout(() => setIsSnackBarVisible(false), 3000);
  };

  const addLastDeletedProduct = () => {
    if (lastDeletedProduct) {
      const upDatedProducts = products.concat(lastDeletedProduct);
      // undoDeleteInDB();
      setLastDeletedProduct(null);
      saveProducts(upDatedProducts);
    }
  };
  /* format the date */
  const formatDate = date => {
    const [year, month, day] = date.split('-');
    return [day, month, year].join('.');
  };
  /* ask for permission for IOS */
  const getiOSNotificationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  };
  /* Notification Settings for Android */
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('androidNotifications', {
      name: 'Android Notifications',
      sound: true,
    });
  }
  /* function to handle if the button on HomeScreen is pressed */
  const sendNotification = () => {
    /* notification to be sent */
    const localNotification = {
      title: 'Product expires soon',
      body: `Your product ${
        products[0].productName
      } is about to expire on ${formatDate(products[0].bestBeforeDate)}`,
      /* settings for android */
      android: {
        channelId: 'androidNotifications',
      },
      /* settings for ios */
      ios: {
        sound: true /* play sound when received */,
        _displayInForeground: true /* display notification when app is opened */,
      },
    };
    setPushNotification(localNotification);
    /* options when to send notifiction */
    let sendAfterFiveSeconds = Date.now(); // current time
    sendAfterFiveSeconds += 5000; // add 5 seconds
    const schedulingOptions = { time: sendAfterFiveSeconds };
    /* send the notification */
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };
  /* Listener to show an alert if a notification arrived */
  const listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && pushNotification !== null) {
        const { title, body } = pushNotification;
        /* show an alert containing the same text as the notification */
        Alert.alert(title, body);
        /* reset the state to null */
        setPushNotification(null);
      }
    });
  };
  /* ask for permission and start listener after first rendering */
  useEffect(() => {
    getiOSNotificationPermission();
    listenForNotifications();
  });
  return (
    <Context.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        // updateProduct,
        isSnackBarVisible,
        handleSnackBar,
        addLastDeletedProduct,
        language,
        setLanguage,
        productsSortedByDate,
        productsSortedByName,
        setSortMethod,
        sortMethod,
        activeCategoryFilter,
        setActiveCategoryFilter,
        categoryImages,
        sendNotification,
      }}
    >
      {children}
    </Context.Provider>
  );
}
