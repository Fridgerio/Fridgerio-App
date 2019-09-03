import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.textInput}
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
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
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
