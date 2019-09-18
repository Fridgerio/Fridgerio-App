import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { data } from './data';
import { Platform, Alert } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const Context = React.createContext(null);

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState(data);
  const [productsSorted, setProductsSorted] = useState([]);
  const [lastDeletedProduct, setLastDeletedProduct] = useState(null);
  const [lastDeletedIndex, setLastDeletedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [sortMethod, setSortMethod] = useState('bestBeforeDate');
  const [notification, setNotification] = useState(null);
  const [pushToken, setPushToken] = useState(null);

  const formatDate = date => {
    const [year, month, day] = date.split('-');
    return [day, month, year].join('.');
  };
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
    setProducts(data);
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
      const upDatedProducts = products.splice(
        lastDeletedIndex,
        0,
        lastDeletedProduct
      );
      // undoDeleteInDB();
      setLastDeletedProduct(null);
      setLastDeletedIndex(null);
      setProducts(upDatedProducts);
    }
  };

  /* subscribe to notifications */
  const handleButtonPress = () => {
    const localNotification = {
      title: 'Produkt läuft ab',
      body: `Das Produkt ${products[0].productName} läuft am ${formatDate(products[0].bestBeforeDate)} ab.`,
      android: {
        sound: false,
      },
      ios: {
        sound: false,
        _displayInForeground: true,
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 5000;
    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };
  const listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(notification.title, notification.body);
      }
    });
  };
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
        handleButtonPress,
      }}
    >
      {children}
    </Context.Provider>
  );
}
