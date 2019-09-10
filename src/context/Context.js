import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { data } from './data';

export const Context = React.createContext(null);

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState(data);
  const [lastDeletedProduct, setLastDeletedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

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

  // delete product from list
  const handleDelete = productId => {
    const deletedProduct = products.find(product => product.id === productId);
    const updatedProducts = products.filter(product => product.id !== productId);

    setProducts(updatedProducts);
    setLastDeletedProduct(deletedProduct);
    handleSnackBar();
  };

  // toggle snackbar
  const handleSnackBar = () => {
    setIsSnackBarVisible(true);
    setTimeout(() => setIsSnackBarVisible(false), 3000);
  };

  const addLastDeletedProduct = () => {
    /* last deleted product is currently added to the end of the array; inside this function we need to first sort the array by the date property of the elements before using the setProducts method */
    const upDatedProducts = products.concat(lastDeletedProduct);
    setProducts(upDatedProducts);
  };

  return (
    <Context.Provider
      value={{
        products,
        handleDelete,
        isSnackBarVisible,
        handleSnackBar,
        addLastDeletedProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}
