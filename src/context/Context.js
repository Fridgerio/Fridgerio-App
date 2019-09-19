import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { data } from './data';
import { Platform, Alert, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const Context = React.createContext(null);

export default function ContextProvider({ children }) {
  /* method to get the products from asyncStorage */
  const getStoredProducts = async () => {
    /* check if 'products' key is existing */
    const allKeys = await AsyncStorage.getAllKeys();
    if (allKeys.includes('products')) {
      /* get stored products from asyncStorage and transform them */
      const storedProductsJSON = await AsyncStorage.getItem('products');
      const storedProducts = await JSON.parse(storedProductsJSON);
      return storedProducts;
    }
    /* return null if 'products' key does not exist */
    return null;
  };
  const [products, setProducts] = useState(data);
  useEffect(() => {
    /* get stored products */
    const storedProducts = getStoredProducts();
    if (storedProducts !== null && storedProducts.length > 0) {
      /* set it to the local state if it is existing and not empty */
      setProducts(storedProducts);
    } else {
      /* write the dummy data to asyncStorage if necessary */
      const dataJSON = JSON.stringify(data);
      AsyncStorage.setItem('products', dataJSON);
    }
  }, []);
  /* method to save to local state and asyncStorage */
  const saveProducts = async dataArray => {
    /* save to asyncStorage */
    await AsyncStorage.setItem('products', JSON.stringify(dataArray));
    /* save to local state */
    setProducts(dataArray);
  };
  /* further state hooks */
  const [productsSorted, setProductsSorted] = useState([]);
  const [lastDeletedProduct, setLastDeletedProduct] = useState(null);
  const [lastDeletedIndex, setLastDeletedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [sortMethod, setSortMethod] = useState('bestBeforeDate');
  const [pushNotification, setPushNotification] = useState(null);

  /* consistent formatting of date in the format YYYY-MM-DD */
  const formatDate = date => {
    const [year, month, day] = date.split('-');
    return [day, month, year].join('.');
  };
  /* get permission for local notifications on iOS (maybe also Android) */
  const getiOSNotificationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
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
    // console.warn(productName);
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
      console.warn(data);
    }

    /* store it in the state */
    // setProducts(data);
    saveProducts(data);
    // console.warn('also in state');
  };

  /* delete the product */
  const deleteProduct = productId => {
    /* first delete it from the database */

    /* store the deleted item */
    const deletedProduct = products.find(product => product.id === productId);
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        setLastDeletedIndex(i);
        break;
      }
    }
    /* store the remaining products */
    const updatedProducts = products.filter(product => product.id !== productId);
    /* write updated products to the state */
    // setProducts(updatedProducts);
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
      const upDatedProducts = products.splice(
        lastDeletedIndex,
        0,
        lastDeletedProduct
      );
      // undoDeleteInDB();
      setLastDeletedProduct(null);
      setLastDeletedIndex(null);
      // setProducts(upDatedProducts);
      saveProducts(upDatedProducts);
    }
  };
  /* Notification Settings for Android */
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('androidNotifications', {
      /* channel name (will be used when notification is sent) */
      name: 'Android Notifications',
      /* play sound */
      sound: true,
    });
  }
  /* function to handle if the button on HomeScreen is pressed */
  const sendNotification = () => {
    /* notification to be sent */
    const localNotification = {
      title: 'Produkt läuft ab',
      body: `Das Produkt ${products[0].productName} läuft am ${formatDate(products[0].bestBeforeDate)} ab.`,
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
        sendNotification,
      }}
    >
      {children}
    </Context.Provider>
  );
}
