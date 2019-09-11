import React, { useState, useEffect } from 'react';
import { SQLite } from 'expo-sqlite';
// import { data } from './data';

export const Context = React.createContext(null);
const db = SQLite.openDatabase('products.db');

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

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
  const updateproductNameInDB = (oldproductName, newproductName) => {
    db.transaction(tr =>
      tr.executeSql('UPDATE SET productName = ? WHERE productName = ?', [
        newproductName,
        oldproductName,
      ]));
  };
  const updateCatInDB = (productName, newcat) => {
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
  const deleteProduct = index => {
    const data = products;
    deleteDataFromDB(data[index].id);
    data.splice(index, 1);
    setProducts(data);
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
  const updateproductName = (oldproductName, newproductName) => {
    const data = products;
    updateproductNameInDB(oldproductName, newproductName);
    data.forEach(product => {
      if (product.productName === oldproductName) {
        product.productName = newproductName;
      }
    });
    setProducts(data);
  };
  const updateCat = (productName, productCategory) => {
    const data = products;
    updateCatInDB(productName, productCategory);
    data.forEach(product => {
      if (product.productName === productName) {
        product.productCategory = productCategory;
      }
    });
    setProducts(data);
  };
  return (
    <Context.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        updateproductName,
        updateCat,
      }}
    >
      {children}
    </Context.Provider>
  );
}
