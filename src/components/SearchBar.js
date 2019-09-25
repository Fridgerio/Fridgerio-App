import React from 'react';
import { Search } from './styled-components/Inputs';

function SearchBar() {
  return (
    <Search
      placeholder={' Suche nach Produkt ...'}
      borderWidth='0px'
      /* callback fn is executed both when user hits return on device keyboard and when keyboard is dismissed - triggered by the TouchableWithoutFeedback wrapper - by clicking anywhere else on the screen */
      /* onEndEditing={() => console.warn('submitted/dismissed')} */
     />
  );
}

export default SearchBar;
