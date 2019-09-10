import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
      tr.executeSql('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, name TEXT(40), amount TINYINT, category TEXT(100), label TEXT(75), bbdate DATE, notification TINYINT, note TEXT)'));
    getData();
  }, []);

  const getData = () => {
    setError(false);
    setIsLoading(true);
    db.transaction(tr =>
      tr.executeSql('SELECT * FROM QUOTES', [], (tx, res) =>
        setProducts(res.rows._array)));
  };
  return <Context.Provider value={{ products }}>{children}</Context.Provider>;
}
