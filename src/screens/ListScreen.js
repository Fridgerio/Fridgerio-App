import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

function CategoryFilter() {
  return (
    <FlatList
      style={styles.categoryList}
      horizontal
      data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
      keyExtractor={category => category}
      renderItem={() => (
        <MaterialCommunityIcons
          name="food"
          style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
        />
      )}
    />
  );
}

function ListScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <CategoryFilter />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const width = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    height: 35,
    width: width,
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
    color: 'gray',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginTop: 3,
  },
  categoryList: {
    marginTop: 10,
    marginHorizontal: 30,
  },
});

ListScreen.navigationOptions = {
  headerTitle: <SearchBar />,
  headerStyle: {
    backgroundColor: '#51c1c9',
    height: 50,
  },
};

export default ListScreen;
