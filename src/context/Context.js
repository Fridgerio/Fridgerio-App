import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { data } from './data';

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
  const [lastDeletedIndex, setLastDeletedIndex] = useState(null);
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
  }, []);

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
      }}
    >
      {children}
    </Context.Provider>
  );
}
