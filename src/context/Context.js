import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { data } from './data';

export let Context;
// eslint-disable-next-line no-multi-assign
const { Provider } = (Context = React.createContext(null));

export default function ContextProvider() {
  return <Provider value={{}}>{props.children}</Provider>;
}
