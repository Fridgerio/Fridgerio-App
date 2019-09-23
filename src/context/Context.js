import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { data } from './data';
import { Platform, Alert } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const images = {
  all: require('../../assets/img/all.png'),
  bread: require('../../assets/img/bread-pastry.png'),
  canned: require('../../assets/img/canned.png'),
  dairy: require('../../assets/img/dairy.png'),
  drinks: require('../../assets/img/drinks.png'),
  frozen: require('../../assets/img/frozen.png'),
  fruits: require('../../assets/img/fruits-vegetables.png'),
  meat: require('../../assets/img/meat.png'),
  pasta: require('../../assets/img/pasta.png'),
  sauces: require('../../assets/img/sauces-oils-spices.png'),
  snacks: require('../../assets/img/snacks-sweets.png'),
  uncategorized: require('../../assets/img/uncategorized.png'),
};

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

  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [categoryImages] = useState(images);

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
    setProducts(data);
    // console.warn('also in state');
  };

  /* delete the product */
  const deleteProduct = productId => {
    /* first delete it from the database */

    /* store the deleted item */
    const deletedProduct = products.find(product => product.id === productId);

    /* store the remaining products */
    const updatedProducts = products.filter(product => product.id !== productId);
    /* write updated products to the state */
    setProducts(updatedProducts);
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
      setProducts(upDatedProducts);
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
