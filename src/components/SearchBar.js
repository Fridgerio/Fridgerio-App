import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from './styled-components/Inputs';

function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <Input
        placeholder={'Suche nach Produkt...'}
        /* callback fn is executed both when user hits return on device keyboard and when keyboard is dismissed - triggered by the TouchableWithoutFeedback wrapper - by clicking anywhere else on the screen */
        onEndEditing={() => console.warn('submitted/dismissed')}
      />
      <Ionicons name="ios-search" style={styles.searchIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 35,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 28,
    color: '#1b4e55',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginTop: 3,
  },
});
export default SearchBar;
