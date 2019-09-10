import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SQLite } from 'expo-sqlite';
import { data } from './data';

export const Context = React.createContext(null);

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState(data);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // getData();
  }, []);

  const getData = async () => {
    setError(false);
    setIsLoading(true);

    const url = '';

    try {
      const response = await axios.get(url);
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(true);
    }
  };
  return <Context.Provider value={{ products }}>{children}</Context.Provider>;
}
