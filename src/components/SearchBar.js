import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function SearchBar() {
  return (
    <View>
      <TextInput
        placeholder={'Suche nach Produkt...'}
        /* callback fn is executed both when user hits return on device keyboard and when keyboard is dismissed - triggered by the TouchableWithoutFeedback wrapper - by clicking anywhere else on the screen */
        onEndEditing={() => console.warn('submitted/dismissed')}
      />
      <Ionicons name="ios-search" />
    </View>
  );
}

export default SearchBar;
