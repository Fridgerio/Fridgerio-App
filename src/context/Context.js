import React, { useState, useEffect } from 'react';
import { SQLite } from 'expo-sqlite';
import { data } from './data';

export const Context = React.createContext(null);
const db = SQLite.openDatabase('products.db');

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    db.transaction(tr =>
      tr.executeSql(
        'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, name TEXT(40), amount TINYINT, category TEXT(100), label TEXT(75), bbdate DATE, notification TINYINT, note TEXT)'
      )
    );
    getDataFromDB();
  }, []);

  const getDataFromDB = () => {
    setError(false);
    setIsLoading(true);
    db.transaction(tr =>
      tr.executeSql('SELECT * FROM products', [], (tx, res) =>
        setProducts(res.rows._array)
      )
    );
  };
  const saveDataToDB = (
    name,
    amount,
    category,
    label,
    bbdate,
    notification,
    note
  ) => {
    db.transaction(tr =>
      tr.executeSql(
        'INSERT INTO products (name, amount, category, label, bbdate, notification, note) VALUES (?,?)',
        [name, amount, category, label, bbdate, notification, note],
        (tx, res) => (data[data.length - 1].id = res.insertId)
      )
    );
  };
  const updateDataInDB = (
    id,
    name,
    amount,
    category,
    label,
    bbdate,
    notification,
    note
  ) => {
    db.transaction(tr =>
      tr.executeSql(
        'UPDATE products SET name = name, amount = amount, category = category, label = label, bbdate = bbdate, notification = notification, note = note WHERE id = id',
        [id, name, amount, category, label, bbdate, notification, note]
      )
    );
  };
  const deleteDataFromDB = id => {
    db.transaction(tr =>
      tr.executeSql('DELETE FROM products WHERE id = ?', [id])
    );
  };
  const addProduct = (
    name,
    amount,
    category,
    label,
    bbdate,
    notification,
    note
  ) => {
    let data = products;
    if (name && amount && category && label && bbdate && notification && note) {
      data = [
        ...products,
        { name, amount, category, label, bbdate, notification, note },
      ];
      saveDataToDB(name, amount, category, label, bbdate, notification, note);
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
    name,
    amount,
    category,
    label,
    bbdate,
    notification,
    note
  ) => {
    const data = products;
    updateDataInDB(
      data[index].id,
      name,
      amount,
      category,
      label,
      bbdate,
      notification,
      note
    );
    data[index] = { name, amount, category, label, bbdate, notification, note };
    setProducts(data);
  };
  return <Context.Provider value={{ products }}>{children}</Context.Provider>;
}
