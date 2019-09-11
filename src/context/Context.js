import React, { useState, useEffect } from 'react';
import { SQLite } from 'expo-sqlite';
// import { data } from './data';

export const Context = React.createContext(null);
const db = SQLite.openDatabase('products.db');

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState(data);
  const [lastDeletedProduct, setLastDeletedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

  useEffect(() => {
    db.transaction(tr =>
      tr.executeSql('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, productName TEXT(40), amount TINYINT, productCategory TEXT(100), labels TEXT(75), bestBeforeDate DATE, pushNotificationDate DATE, customNote TEXT), barcode TEXT(13), dateAdded DATE'));
    getDataFromDB();
  }, []);

  const getDataFromDB = () => {
    setError(false);
    setIsLoading(true);
    db.transaction(tr =>
      tr.executeSql('SELECT * FROM products', [], (tx, res) =>
        setProducts(res.rows._array)));
  };

  const saveDataToDB = (
    productName,
    amount,
    productCategory,
    labels,
    bestBeforeDate,
    pushNotificationDate,
    customNote
  ) => {
    db.transaction(tr =>
      tr.executeSql(
        'INSERT INTO products (productName, amount, productCategory, labels, bestBeforeDate, pushNotificationDate, customNote) VALUES (?,?)',
        [
          productName,
          amount,
          productCategory,
          labels,
          bestBeforeDate,
          pushNotificationDate,
          customNote,
        ],
        (tx, res) => (products[products.length - 1].id = res.insertId)
      ));
  };
  const updateDataInDB = (
    id,
    productName,
    amount,
    productCategory,
    labels,
    bestBeforeDate,
    pushNotificationDate,
    customNote
  ) => {
    db.transaction(tr =>
      tr.executeSql(
        'UPDATE products SET productName = ?, amount = ?, productCategory = ?, labels = ?, bestBeforeDate = ?, pushNotificationDate = ?, customNote = ? WHERE id = ?',
        [
          productName,
          amount,
          productCategory,
          labels,
          bestBeforeDate,
          pushNotificationDate,
          customNote,
          id,
        ]
      ));
  };
  const updateProductNameInDB = (oldproductName, newproductName) => {
    db.transaction(tr =>
      tr.executeSql('UPDATE SET productName = ? WHERE productName = ?', [
        newproductName,
        oldproductName,
      ]));
  };
  const updateProductCategoryInDB = (productName, newcat) => {
    db.transaction(tr =>
      tr.executeSql('UPDATE SET productCategory = ? WHERE productName = ?', [
        newcat,
        productName,
      ]));
  };
  const deleteDataFromDB = id => {
    db.transaction(tr =>
      tr.executeSql('DELETE FROM products WHERE id = ?', [id]));
  };
  const addProduct = (
    productName,
    amount,
    productCategory,
    labels,
    bestBeforeDate,
    pushNotificationDate,
    customNote
  ) => {
    let data = products;
    if (
      // TODO: refactor condition to allow falsy values
      productName &&
      amount &&
      productCategory &&
      labels &&
      bestBeforeDate &&
      pushNotificationDate &&
      customNote
    ) {
      data = [
        ...products,
        {
          productName,
          amount,
          productCategory,
          labels,
          bestBeforeDate,
          pushNotificationDate,
          customNote,
        },
      ];

      saveDataToDB(
        productName,
        amount,
        productCategory,
        labels,
        bestBeforeDate,
        pushNotificationDate,
        customNote
      );
    }

    setProducts(data);
  };

  const deleteProduct = productId => {
    deleteDataFromDB(productId);

    const deletedProduct = products.find(product => product.id === productId);
    const updatedProducts = products.filter(product => product.id !== productId);

    setProducts(updatedProducts);
    setLastDeletedProduct(deletedProduct);
    handleSnackBar();
  };

  const updateProduct = (
    index,
    productName,
    amount,
    productCategory,
    labels,
    bestBeforeDate,
    pushNotificationDate,
    customNote
  ) => {
    const data = products;
    updateDataInDB(
      data[index].id,
      productName,
      amount,
      productCategory,
      labels,
      bestBeforeDate,
      pushNotificationDate,
      customNote
    );
    data[index] = {
      productName,
      amount,
      productCategory,
      labels,
      bestBeforeDate,
      pushNotificationDate,
      customNote,
    };
    setProducts(data);
  };

  const updateProductName = (oldproductName, newproductName) => {
    const data = products;
    updateProductNameInDB(oldproductName, newproductName);
    data.forEach(product => {
      if (product.productName === oldproductName) {
        product.productName = newproductName;
      }
    });
    setProducts(data);
  };

  const updateProductCategory = (productName, productCategory) => {
    const data = products;
    updateProductCategoryInDB(productName, productCategory);
    data.forEach(product => {
      if (product.productName === productName) {
        product.productCategory = productCategory;
      }
    });
    setProducts(data);
  };

  // toggle snackbar
  const handleSnackBar = () => {
    setIsSnackBarVisible(true);
    setTimeout(() => setIsSnackBarVisible(false), 3000);
  };

  const addLastDeletedProduct = () => {
    /* TODO: last deleted product is currently added to the end of the array;
    inside this function we need to first sort the array before using the setProducts method */
    if (lastDeletedProduct) {
      const upDatedProducts = products.concat(lastDeletedProduct);
      /*  set value of 'lastDeletedProduct' to null to prevent the same item being added again multiple times to the list by clicking 'undo' multiple times on the snackbar */
      setLastDeletedProduct(null);
      // TODO: update database
      setProducts(upDatedProducts);
    }
  };

  return (
    <Context.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        updateProductName,
        updateProductCategory,
        isSnackBarVisible,
        handleSnackBar,
        addLastDeletedProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}
