import React, { useState, useEffect } from 'react';
import { SQLite } from 'expo-sqlite';
import { data as dummyData } from './data';

export const Context = React.createContext(null);
const db = SQLite.openDatabase('products.db');

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [lastDeletedProduct, setLastDeletedProduct] = useState(null);
  const [lastDeletedIndex, setLastDeletedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists products (id integer primary key not null, name text, amount tinyint, category text, label text, bbdate date, notification date, note text);',
        [],
        () =>
          dummyData.forEach(item => {
            const {
              name,
              amount,
              category,
              labels,
              expiryDate,
              notificationDate,
              notes,
            } = item;
            saveDataToDB(
              name,
              amount,
              category,
              labels,
              expiryDate,
              notificationDate,
              notes
            );
          }),
        err => console.warn(err)
      );
    });
  }, []);
  /* Database methods */
  /* load entries from database to the state */
  const getDataFromDB = () => {
    setError(false);
    setIsLoading(true);
    db.transaction(tr =>
      tr.executeSql('SELECT * FROM products', [], (tx, res) =>
        setProducts(res.rows._array)));
    // console.warn(res.rows._array)));
  };

  /* evaluate the date of today */
  const todayDate = () => {
    const myDate = new Date();
    let month = (myDate.getMonth() + 1).toFixed(0);
    let day = myDate.getDate().toFixed(0);
    const year = myDate.getFullYear().toFixed(0);
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [year, month, day].join('-');
  };
  /* save a new item to the database */

  const saveDataToDB = (
    name,
    amount,
    category,
    label,
    expire,
    notification,
    notes
  ) => {
    const labelString = typeof label === 'string' ? label : label.join(',');
    db.transaction(
      tx => {
        tx.executeSql(
          'insert into products (name, amount, category, label, bbdate, notification, note) values (?,?,?,?,?,?,?)',
          [name, amount, category, labelString, expire, notification, notes],
          () => console.warn('insert'),
          err => console.warn(err)
        );
        tx.executeSql('select * from products', [], (_, { rows }) =>
          console.warn(rows));
      },
      null,
      getDataFromDB
    );
  };
  /* re-adding an item to the database (undo delete) */
  const undoDeleteInDB = () => {
    const {
      productName,
      amount,
      productCategory,
      labels,
      bestBeforeDate,
      pushNotificationDate,
      customNote,
    } = lastDeletedProduct;
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
          barcode,
          dateAdded,
        ]
      ));
  };
  /* update an item in the database */
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

  /* update the product name for all products with the same name */
  const updateProductNameInDB = (oldproductName, newproductName) => {
    db.transaction(tr =>
      tr.executeSql('UPDATE SET productName = ? WHERE productName = ?', [
        newproductName,
        oldproductName,
      ]));
  };

  /* update the category for all products with the same name */
  const updateProductCategoryInDB = (productName, newcat) => {
    db.transaction(tr =>
      tr.executeSql('UPDATE SET productCategory = ? WHERE productName = ?', [
        newcat,
        productName,
      ]));
  };
  /* delete an item from the database */
  const deleteDataFromDB = id => {
    db.transaction(tr =>
      tr.executeSql('DELETE FROM products WHERE id = ?', [id]));
  };
  /* delete the whole table */
  const deleteAll = () => {
    db.transaction(tr =>
      tr.executeSql(
        'drop table products',
        [],
        () => console.warn('DB deleted'),
        err => console.warn(err)
      ));
  };

  /* wrapper functions */
  /* add a product to the state and also to the database */
  const addProduct = (
    productName,
    amount,
    productCategory,
    labels,
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
          name: productName,
          amount,
          category: productCategory,
          label: labels,
          bbdate: bestBeforeDate,
          notification: pushNotificationDate,
          note: customNote,
          barcode,
        },
      ];
      console.warn(data);

      /* save the new item to the database */
      saveDataToDB(
        productName,
        amount,
        productCategory,
        labels,
        bestBeforeDate,
        pushNotificationDate,
        customNote
      );
      console.warn('stored');
    }

    /* store it in the state */
    setProducts(data);
    console.warn('also in state');
  };

  /* delete the product */
  const deleteProduct = productId => {
    /* first delete it from the database */
    deleteDataFromDB(productId);
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

  /* update the product (not productName, not category) */
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

  /* update the product name (for all products of the same kind) */
  const updateProductName = (oldproductName, newproductName) => {
    const data = products;
    /* update the product name in the database */
    updateProductNameInDB(oldproductName, newproductName);
    /* update the product name in the state */
    data.forEach(product => {
      if (product.productName === oldproductName) {
        product.productName = newproductName;
      }
    });
    setProducts(data);
  };

  /* update the category for all products of the same kind */
  const updateProductCategory = (productName, productCategory) => {
    const data = products;
    /* update category in the database */
    updateProductCategoryInDB(productName, productCategory);
    /* update category in the state */
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
    if (lastDeletedProduct) {
      const upDatedProducts = products.splice(
        lastDeletedIndex,
        0,
        lastDeletedProduct
      );
      undoDeleteInDB();
      setLastDeletedProduct(null);
      setProducts(upDatedProducts);
    }
  };

  return (
    <Context.Provider
      value={{
        products,
        saveDataToDB,
        addProduct,
        deleteProduct,
        updateProduct,
        updateProductName,
        updateProductCategory,
        isSnackBarVisible,
        handleSnackBar,
        addLastDeletedProduct,
        deleteAll,
      }}
    >
      {children}
    </Context.Provider>
  );
}
